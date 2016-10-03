import test from 'ava';

test('foo', t => {
    t.pass();
});

test('bar', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});



test('generate', t => {

    function generatorFn() {
        setTimeout(() => { worker.next(); }, 0)

    }

    function* work() {
        const value = yield generatorFn();
        t.true(value);
    }

    let worker = work();
    worker.next();
});
