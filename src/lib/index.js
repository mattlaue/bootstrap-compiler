const sass = require('browser-sass');
const bootstrapPackage = require('bootstrap/package.json');

const utils = require('./utils');

function compile(custom, options) {
    options = options || {};

    options.file = undefined;

    options.data = custom;
    options.outFile = options.outFile || 'style.css';
    options.sourceMap = options.sourceMap === undefined ? true: options.sourceMap;
    
    options.importer = (url) => {
        let data = utils.SOURCE_CACHE[url];
        if (data === undefined) {
            return new Error('Unable to find module: ' + url);
        }
        return {contents: data};
    };

    return sass.renderSync(options);
}

module.exports = {
    compile,
    BOOTSTRAP_VERSION: bootstrapPackage.version,
    SOURCE_CACHE: utils.SOURCE_CACHE,
};