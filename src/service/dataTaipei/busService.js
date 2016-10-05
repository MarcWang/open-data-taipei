const zlib = require('zlib');
const request = require('request');
const moment = require('moment');
const Config = require('../../../config');
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
        this.TPERouteList = new Map();
        this.TPERouteNameMap = new Map();
        this.TPERouteIdMap = new Map();
        this.TPERouteStopList = new Map();
        this.TPERouteStopNameMap = new Map();
        this.TPERouteEstimateData = null;
    }

    initialize(cb) {
        let self = this;
        let busRoute = requestData(TAIPEI_BUS_ROUTE);
        let busStop = requestData(TAIPEI_BUS_STOP);

        function collectRoute(rawData) {
            for (let i = 0; i < rawData.BusInfo.length; i++) {
                let name = rawData.BusInfo[i].nameZh;
                let id = rawData.BusInfo[i].Id;
                let data = rawData.BusInfo[i];
                let path = `${rawData.BusInfo[i].departureZh} - ${rawData.BusInfo[i].destinationZh}`;
                let value = [];
                if (self.TPERouteList.has(id)) {
                    value = self.TPERouteList.get(id);
                }
                value.push(data);
                self.TPERouteList.set(id, value);
                let busInfo = {
                    id: id,
                    name: name,
                    path: path
                };
                self.TPERouteNameMap.set(name, busInfo);
                self.TPERouteIdMap.set(id, busInfo);
            }
        }

        function collectStop(rawData) {
            for (let i = 0; i < rawData.BusInfo.length; i++) {
                let id = rawData.BusInfo[i].Id;
                let name = rawData.BusInfo[i].nameZh;
                let data = rawData.BusInfo[i];
                self.TPERouteStopNameMap.set(id, name);
                self.TPERouteStopList.set(id, data);
            }
        }

        Promise.all([busRoute, busStop])
            .then((values) => {
                let routeData = values[0];
                collectRoute(routeData);
                let stopData = values[1];
                collectStop(stopData);
                cb(null, 'extract bus information was successed');
            })
            .catch((error) => {
                cb(error);
            });

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
            let routes = [];
            self.TPERouteNameMap.forEach((value, key) => {
                // console.log(`name = ${key}, id = ${value}`);
                routes.push({ name: key, id: value.id, path: value.path });
            });
            resolve(routes);
        });
    }

    getEstimateTime(params) {
        let self = this;
        const { name, id, goBack } = params;

        return new Promise((resolve, reject) => {
            const estData = self.TPERouteEstimateData;
            let data = null;
            if( name !== undefined )
                data = self.TPERouteNameMap.get(name);
            else
                data = self.TPERouteIdMap.get(id);
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
                        let stopName = self.TPERouteStopNameMap.get(stopId);
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





// function getRoute() {
//     return new Promise((resolve, reject) => {
//         request({
//             url: TAIPEI_BUS_ROUTE,
//             method: 'GET',
//             encoding: null
//         }, (err, response, body) => {
//             if (err) {
//                 return reject(err);
//             } else {
//                 zlib.gunzip(body, function(err, result) {
//                     if (err) return console.error(err);
//                     const jsonData = JSON.parse(result.toString());
//                     for (let i = 0; i < jsonData.BusInfo.length; i++) {
//                         let name = jsonData.BusInfo[i].nameZh;
//                         let id = jsonData.BusInfo[i].Id;
//                         let data = jsonData.BusInfo[i];
//                         let value = [];
//                         if (TPERouteList.has(id)) {
//                             value = TPERouteList.get(id);
//                         }
//                         value.push(data);
//                         TPERouteList.set(id, value);
//                         TPERouteNameMap.set(name, id);

//                     }
//                     resolve();
//                 });
//             }
//         });
//     });
// };

// function getStop() {
//     return new Promise((resolve, reject) => {
//         request({
//             url: 'http://data.taipei/bus/Stop',
//             method: 'GET',
//             encoding: null
//         }, (err, response, body) => {
//             if (err) {
//                 return reject(err);
//             } else {
//                 zlib.gunzip(body, function(err, result) {
//                     if (err) return console.error(err);
//                     const jsonData = JSON.parse(result.toString());
//                     for (let i = 0; i < jsonData.BusInfo.length; i++) {
//                         let id = jsonData.BusInfo[i].Id;
//                         let name = jsonData.BusInfo[i].nameZh;
//                         let data = jsonData.BusInfo[i];
//                         TPERouteStopNameMap.set(id, name);
//                         TPERouteStopList.set(id, data)
//                     }
//                     resolve();
//                 });
//             }
//         });
//     });
// };

// function translateTime(sec) {
//     if (sec > 60) {
//         let m = Math.floor(sec / 60);
//         let s = sec % 60;
//         return `${m} 分 ${s} 秒`
//     } else {
//         let s = sec;
//         return `${s} 秒`;
//     }
// }

// function getEstimateTime(name) {
//     return new Promise((resolve, reject) => {

//         let id = TPERouteNameMap.get(name);
//         console.log(`id = ${id} , name: ${name}`);

//         request({
//             url: 'http://data.taipei/bus/EstimateTime',
//             method: 'GET',
//             encoding: null
//         }, (err, response, body) => {
//             if (err) {
//                 return reject(err);
//             } else {
//                 zlib.gunzip(body, function(err, result) {
//                     if (err) return console.error(err);
//                     const jsonData = JSON.parse(result.toString());
//                     console.log(jsonData.BusInfo[0]);
//                     for (let i = 0; i < jsonData.BusInfo.length; i++) {
//                         let routeId = jsonData.BusInfo[i].RouteID;
//                         if (routeId == id) {
//                             let stopId = jsonData.BusInfo[i].StopID;
//                             let estimateTime = jsonData.BusInfo[i].EstimateTime;
//                             let stopName = TPERouteStopNameMap.get(stopId);
//                             let goBack = jsonData.BusInfo[i].GoBack;
//                             if (goBack == 0) {
//                                 console.log(`Name: ${stopName}, Time: ${translateTime(estimateTime)}`);
//                             } else {

//                             }
//                         }
//                     }
//                 });
//             }
//         });
//     });
// };



// getRoute()
//     .then(() => {
//         // TPERouteList.forEach((value, key, map) => {
//         //     for (let i = 0; i < value.length; i++) {
//         //      console.log(`id = ${key} , ${value[i].pathAttributeName}`);
//         //     }
//         // });
//         // TPERouteNameMap.forEach((value, key, map) => {
//         //     console.log(`name = ${key}, id = ${value}`);
//         // });
//         getStop()
//             .then(() => {
//                 // TPERouteStopList.forEach((value, key, map) => {
//                 //     console.log(`id = ${key} , ${value.nameZh}`);
//                 // })
//                 setInterval(() => {
//                     let busName = '518';
//                     getEstimateTime(busName)
//                         .then(() => {})
//                 }, 10 * 1000)
//             })
//     })
