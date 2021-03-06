'use strict';

const busMgr = require('./../../managers/busMgr');

const API_TAIPEI_BUS_ROUTE = `/api/taipei/bus/route/query`;
const API_TAIPEI_BUS_ESTIMATE = `/api/taipei/bus/route/estimate`;



module.exports = function() {
    const router = require('express').Router();

    router.route(API_TAIPEI_BUS_ROUTE)
        .get((request, response) => {
            busMgr.queryRouteAll()
                .then((value) => {
                    response.json({ code: 0, result: { routes: value } });
                })
                .catch((error) => {
                    console.log(error);
                    response.json({ code: -1 });
                });
        })
        .post((request, response) => { response.status(400).send('not implemented'); })
        .put((request, response) => { response.status(400).send('not implemented'); })
        .delete((request, response) => { response.status(400).send('not implemented'); });

    router.route(API_TAIPEI_BUS_ESTIMATE)
        .get((request, response) => {
            let name = request.query.name;
            let id = request.query.id;
            let goBack = request.query.goBack;
            busMgr.getEstimateTime({ name: name, id: id, goBack: goBack })
                .then((value) => {
                    response.json({ code: 0, result: value });
                })
                .catch((error) => {
                    console.log(error);
                    response.json({ code: -1 });
                });
        })
        .post((request, response) => { response.status(400).send('not implemented'); })
        .put((request, response) => { response.status(400).send('not implemented'); })
        .delete((request, response) => { response.status(400).send('not implemented'); });
    return router;
};
