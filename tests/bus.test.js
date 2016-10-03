import test from 'ava';
import fetch from 'node-fetch';

test.cb.before(t => {
    console.log('initialize');
    t.end();  
});

test.after(t => {
    console.log('cleanup')
});


test.cb('foo', t => {
    fetch('http://localhost:3000/api/taipei/bus/route/query', { method: 'GET' })
        .then((res) => {
            if (res.status == 200)
                return res.json();
            else
                return { code: -1 };
        })
        .then((json) => {
            console.log(json);
            t.end();
        });
});

test('true', t => {
    let result = true;
    t.true(result, 'result is true')
});



test.cb('generate', t => {

    function generatorFn() {
        setTimeout(() => { worker.next(); }, 0)

    }

    function* work() {
        yield generatorFn();
        let result = true;
        t.true(result);
        t.end();
    }

    let worker = work();
    worker.next();
});
