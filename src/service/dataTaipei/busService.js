const zlib = require('zlib');
const request = require('request');
const moment = require('moment');
const Config = require('../../../config');
const _ = require('lodash');
// const RedisHandler = require('./../../persistence/redis');

function requestData(url) {
    return new Promise((resolve, reject) => {
        request({
                url: url,
                method: 'GET',
                encoding: null
            },
            (err, res, data) => {
                if (err) {
                    reject(err);
                } else {
                    zlib.gunzip(data, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(JSON.parse(result.toString()));
                        }
                    });
                }
            });
    });
}

const TAIPEI_BUS_ROUTE = 'http://data.taipei/bus/ROUTE';
const TAIPEI_BUS_STOP = 'http://data.taipei/bus/Stop';
const TAIPEI_BUS_ESTIMATE = 'http://data.taipei/bus/EstimateTime';

class BusService {
    constructor() {
        this.TPERouteEstimateData = null;

        this.TPERouteInfoList = {
            srcUpdate: null,
            update: null,
            idMap: new Map(),
            nameMap: new Map(),
            data: []
        };

        this.TPERouteStopInfoList = {
            srcUpdate: null,
            update: null,
            idMap: new Map()
        };

        this.collectRoute = function(rawData) {
            let updateData = {
                update: moment().format(),
                idMap: new Map(),
                nameMap: new Map(),
                data: []
            };

            for (let i = 0; i < rawData.BusInfo.length; i++) {
                let name = rawData.BusInfo[i].nameZh;
                let id = rawData.BusInfo[i].Id;
                let path = `${rawData.BusInfo[i].departureZh} - ${rawData.BusInfo[i].destinationZh}`;
                let busInfo = {
                    id: id,
                    name: name,
                    path: path
                };
                updateData.data.push(busInfo);
                updateData.nameMap.set(name, busInfo);
                updateData.idMap.set(id, busInfo);
            }
            this.TPERouteInfoList = _.cloneDeep(updateData);
        };

        this.collectStop = function(rawData) {
            let updateData = {
                update: moment().format(),
                idMap: new Map()
            }
            for (let i = 0; i < rawData.BusInfo.length; i++) {
                let id = rawData.BusInfo[i].Id;
                let name = rawData.BusInfo[i].nameZh;
                updateData.idMap.set(id, name);
            }
            this.TPERouteStopInfoList = _.cloneDeep(updateData);
        };


        this.checkRoute = function(cb) {
            let busRoute = requestData(TAIPEI_BUS_ROUTE);
            let busStop = requestData(TAIPEI_BUS_STOP);
            Promise.all([busRoute, busStop])
                .then((values) => {
                    let routeData = values[0];
                    this.collectRoute(routeData);
                    let stopData = values[1];
                    this.collectStop(stopData);
                    cb(null, 'extract bus information was successed');
                })
                .catch((error) => {
                    cb(error);
                });
        };
    }

    initialize(cb) {
        let self = this;
        self.checkRoute(cb);

        setInterval(() => {
            requestData(TAIPEI_BUS_ESTIMATE)
                .then((value) => {
                    self.TPERouteEstimateData = value;
                })
                .catch((error) => { console.log(error); });
        }, Config.SERVER.UPDATE);
    }

    queryRoute() {
        let self = this;
        return new Promise((resolve) => {
            let routes = self.TPERouteInfoList.data;
            resolve(routes);
        });
    }

    getEstimateTime(params) {
        let self = this;
        const { name, id, goBack } = params;

        return new Promise((resolve, reject) => {
            const estData = self.TPERouteEstimateData;
            let data = null;
            if (name !== undefined)
                data = self.TPERouteInfoList.nameMap.get(name);
            else
                data = self.TPERouteInfoList.idMap.get(id);
            const busInfo = data;

            if (estData != null) {
                let busResult = {
                    updateTime: moment().format(),
                    goBack: goBack,
                    path: busInfo.path,
                    stops: []
                };
                for (let i = 0; i < estData.BusInfo.length; i++) {
                    let routeId = estData.BusInfo[i].RouteID;
                    if (routeId == busInfo.id) {
                        let stopId = estData.BusInfo[i].StopID;
                        let estimateTime = estData.BusInfo[i].EstimateTime;
                        let stopName = self.TPERouteStopInfoList.idMap.get(stopId);
                        let busGoBack = estData.BusInfo[i].GoBack;
                        if (busGoBack == goBack) {
                            let stopInfo = {
                                name: stopName,
                                id: stopId,
                                estimate: {
                                    state: (estimateTime < 0) ? estimateTime : 0,
                                    minute: Math.floor(estimateTime / 60),
                                    second: estimateTime % 60
                                }
                            };
                            busResult.stops.push(stopInfo);
                        }
                    }
                }
                resolve(busResult);
            } else {
                reject('error data null');
            }
        });
    }
}

module.exports = new BusService();
