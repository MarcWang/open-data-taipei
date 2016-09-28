const fs = require('fs');
const zlib = require('zlib')
const request = require('request');

let TPERouteList = new Map();
let TPERouteNameMap = new Map();
let TPERouteStopList = new Map();
let TPERouteStopNameMap = new Map();

function getBike() {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://data.taipei/youbike',
            method: 'GET',
            encoding: null
        }, (err, response, body) => {
            if (err) {
                return reject(err);
            } else {
                // console.log(body)
                zlib.gunzip(body, function(err, result) {
                    if (err) return console.error(err);
                    const jsonData = JSON.parse(result.toString());
                    console.log(jsonData)
                    resolve();
                });
            }
        });
    });
};

getBike()
    .then(() => {
        
    })
