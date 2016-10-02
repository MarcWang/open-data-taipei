'use strict';

const busMgr = require('./../../managers/busMgr');

const API_TAIPEI_BUS_ROUTE = `/api/taipei/bus/route/query`;
const API_TAIPEI_BUS_ESTIMATE = `/api/taipei/bus/estimate`;

module.exports = function() {
    const router = require('express').Router();

    router.route(API_TAIPEI_BUS_ROUTE)
        .get((request, response, next) => {
            busMgr.queryRouteAll()
                .then((value) => {
                    response.json({ code: 0, data: value });
                })
                .catch((error) => {
                    response.json({ code: -1 });
                })
        })
        .post((request, response, next) => { response.status(400).send('not implemented'); })
        .put((request, response, next) => { response.status(400).send('not implemented'); })
        .delete((request, response, next) => { response.status(400).send('not implemented'); });

    router.route(API_TAIPEI_BUS_ESTIMATE)
        .get((request, response, next) => {

            let name = request.query.name;
            busMgr.getEstimateTime({name: name})
                .then((value) => {
                    response.json({ code: 0, data: value });
                })
                .catch((error) => {
                    response.json({ code: -1 });
                })
        })
        .post((request, response, next) => { response.status(400).send('not implemented'); })
        .put((request, response, next) => { response.status(400).send('not implemented'); })
        .delete((request, response, next) => { response.status(400).send('not implemented'); });



    return router;
}
