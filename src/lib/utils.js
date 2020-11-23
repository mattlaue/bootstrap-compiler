const SOURCES = require('./sources');

const SOURCE_CACHE = (() => {
    let cache = {};

    for (let source of SOURCES) {
        let key = source.key;
        key = key.substring(2, key.length - 5);  // remove ./ and .scss

        // files are cached under directory and key

        let tokens = key.split('/');
        if (tokens.length === 2) {
            let contents = cache[tokens[0]];

            if (contents) {
                cache[tokens[0]] = contents + '\n' + source.contents;
            } else {
                cache[tokens[0]] = source.contents;
            }
        }
        if (key.startsWith('_')) {
            key = key.substring(1);
        }
        cache[key.replace('/_', '/')] = source.contents;
    }
    return cache;
})();

module.exports = {
    SOURCE_CACHE
};
