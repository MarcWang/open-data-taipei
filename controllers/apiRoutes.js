const moment = require('moment');
const taipeiBusRouter = require('./routers/apiTaipeiBusRouter');
const router = require('express').Router();

module.exports = function(app, logHandler) {

    router.use((request, response, next) => {
        console.log(`${request.method}: ${request.originalUrl} From '${request.hostname}', Time: ${moment().format()} `);
        next();
    });

    app.use('', router);
    // app.use(`${TCIT_API.SIGNAGE}/*`, authRouter(logHandler));
    app.use('', taipeiBusRouter());

};
