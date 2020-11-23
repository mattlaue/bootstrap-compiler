jest.mock('../../src/lib/sources');

const utils = require('../../src/lib/utils');
const bootstrapCompiler = require('../../src/lib');


test('compile', () => {
    let result = bootstrapCompiler.compile(utils.SOURCE_CACHE['bootstrap']);
    expect(result).toBeTruthy();
});

test('compile with sourcemap', () => {
    let result = bootstrapCompiler.compile('', {sourceMap: true});
    expect(result).toBeTruthy();
});

test('compile - import error', () => {
    expect(() => {
        bootstrapCompiler.compile('@import "foo"');
    }).toThrowError();
});
