const redis = require("redis");
const _ = require('lodash');

const dbOptions = {
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379
};

class RedisHandler {

    constructor() {
        this.handler = undefined;
    }

    getUri() {
        return `${dbOptions.host}:${dbOptions.port}`;
    }

    connect(reConnectTime) {
        let self = this;
        self.handler = redis.createClient(dbOptions);
    }

    onOpen(cb) {
        let self = this;
        self.handler.on("ready", cb);
    }

    onError(cb) {
        let self = this;
        // self.handler.on('error', cb);
        self.handler.on("reconnecting", (value) => {
            cb(`Reconnect Redis ${value.address}:${value.port}, counts = ${value.attempt}`);
        });
    }

    setValue(key, value) {
        let self = this;
        let saveData = {
            type: 'String',
            data: undefined
        }

        if (_.isString(value)){
            saveData.type = 'String';
            saveData.data = value;
        }
        if (_.isObject(value)) {
            saveData.type = 'Object';
            saveData.data = JSON.stringify(value);
        }
        if (_.isNumber(value)) {
            saveData.type = 'Number';
            saveData.data = value.toString();
        }

        let str = JSON.stringify(saveData);
        self.handler.set(key, str);
    }

    getValue(key, cb) {
        let self = this;
        self.handler.get(key, (err, reply) =>{
            let obj = JSON.parse(reply);
            if( obj.type == 'String' ){
                cb(obj.data);
            }
            if( obj.type == 'Object'){
                cb(JSON.parse(obj.data));
            }
            if( obj.type == 'Number'){
                cb(Number(obj.data));
            }
        });
    }
}

module.exports = new RedisHandler;
