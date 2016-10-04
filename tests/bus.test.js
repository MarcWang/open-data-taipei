import test from 'ava';
import fetch from 'node-fetch';

test.cb.before(t => {
    console.log('initialize');
    t.end();
});

test.after(t => {
    console.log('cleanup')
});


test.cb('query taipei route', t => {
    function query() {
        fetch('http://localhost:8521/api/taipei/bus/route/query', { method: 'GET' })
            .then((res) => {
                t.is(res.status, 200, 'status code error');
                return res.json();
            })
            .then((json) => {
                worker.next(json);
            });
    }

    function* work() {
        let queryData = yield query();
        t.is(queryData.code, 0, 'res code error');
        t.true(typeof queryData.result === 'object', 'result is object');
        t.true(typeof queryData.result.routes === 'object', 'result is array');
        t.end();
    }

    let worker = work();
    worker.next();
});
