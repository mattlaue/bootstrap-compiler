jest.mock('../../src/lib/sources');

const utils = require('../../src/lib/utils');
const bootstrap = require('../../dist/bootstrap-compiler');

test('source cache', () => {
    let expected = bootstrap.SOURCE_CACHE;

    expect(utils.SOURCE_CACHE).toBeTruthy();
    expect(utils.SOURCE_CACHE).toStrictEqual(expected);
});
