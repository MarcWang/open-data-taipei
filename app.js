const http = require(`http`);
const express = require(`express`);
const bodyParser = require(`body-parser`);
const cors = require(`cors`);
const BusService = require(`./src/service/dataTaipei/busService`);
// const RedisHandler = require('./persistence/redis');
const Config = require(`./config`);

process.env.NODE_ENV = `development`; //development, production

process.on(`beforeExit`, (code) => {
    console.log(code);
});
process.on(`exit`, (code) => {
    console.log(`About to exit with code: ${code}`);
});


// function redisOpen() {
//     RedisHandler.connect();
//     RedisHandler.onOpen(() => {
//         readyWorker.next();
//     });
// }

function initService() {
    BusService.initialize((err, msg) => {
        (err) ? console.log(err): console.log(msg);
        readyWorker.next();
    });
}

function* initialize() {

    // let readyRedis = yield redisOpen();
    yield initService();

    let app = express();
    app.use(cors());
    app.set(`port`, Config.SERVER.PORT || 3000);

    app.use(bodyParser.urlencoded({ extended: true })); //for parsing application/x-www-form-urlencoded
    app.use(bodyParser.json()); // for parsing application/json

    require(`./src/controllers/apiRoutes`)(app);
    http.createServer(app).listen(app.get(`port`), function() {
        console.log(`# Server listening on localhost: ${app.get('port')}`);
        // console.log(`# Redis://${RedisHandler.getUri()}`);
    });
}

let readyWorker = initialize();
readyWorker.next();
