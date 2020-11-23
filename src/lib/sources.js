/* istanbul ignore file */

function importAll(requireContext) {
    let sources = [];
    requireContext.keys().forEach(function (key) {
        sources.push({
            key: key,
            contents: requireContext(key).default
        });
    });
    return sources;
}

module.exports = importAll(require.context('../../node_modules/bootstrap/scss', true, /.scss$/));
