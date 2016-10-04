'use strict';

const _ = require('lodash');
// const moment = require('moment');
const BusService = require('./../service/dataTaipei/busService');
// const RedisHandler = require(global.BASE_DIR + '/src/v1/persistence/redis')

class BusHandler {
    constructor() {}

    queryRouteAll() {
        return new Promise((resolve, reject) => {

            function query() {
                BusService.queryRoute()
                    .then((value) => {
                        readyWorker.next({ result: true, data: value });
                    }).catch((error) => {
                        console.log(error);
                        readyWorker.next({ result: false });
                    });
            }

            function* workFlow() {
                let readyQuery = yield query();
                if (readyQuery.result) {
                    resolve(readyQuery.data);
                } else {
                    reject();
                }
            }
            let readyWorker = workFlow();
            readyWorker.next();
        });
    }

    getEstimateTime(params) {
        return new Promise((resolve, reject) => {

            if (!_.isObject(params)) {
                reject({ code: -1 });
            }
            const { name } = params;

            if( !_.isString(name)){
                reject({ code: -1 });
            }

            function getEstimate(busName) {
                BusService.getEstimateTime({ name: busName })
                    .then((value) => {
                        readyWorker.next({ result: true, data: value });
                    }).catch((error) => {
                        console.log(error);
                        readyWorker.next({ result: false });
                    });
            }

            function* workFlow() {
                let readyGetEstimate = yield getEstimate(name);
                if (readyGetEstimate.result) {
                    resolve(readyGetEstimate.data);
                } else {
                    reject();
                }
            }
            let readyWorker = workFlow();
            readyWorker.next();
        });
    }
}

module.exports = new BusHandler;
