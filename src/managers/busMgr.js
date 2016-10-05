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

            const { name, id, goBack } = params;
            if (!_.isString(name) && !_.isString(id)) {
                reject({ code: -1 });
            }

            if (!_.isString(goBack)) {
                reject({ code: -1 });
            }

            function getEstimate() {
                BusService.getEstimateTime({ name: name, id: id, goBack: goBack })
                    .then((value) => {
                        readyWorker.next({ result: true, data: value });
                    }).catch((error) => {
                        console.log(error);
                        readyWorker.next({ result: false });
                    });
            }

            function* workFlow() {
                let readyGetEstimate = yield getEstimate();
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
