const fs = require('fs');

const bootstrapCompiler = require('bootstrap-compiler/dist/bootstrap-compiler');

exports.command = 'init [style.scss]';
exports.desc = 'Create a default style.scss file';
exports.builder = {
    filePath: {
        default: './style.scss'
    }
};
exports.handler = function (argv) {
    if (fs.existsSync(argv.filePath)) {
        throw new Error('File exists: ' + argv.filePath);
    }
    fs.writeFileSync(argv.filePath, bootstrapCompiler.SOURCE_CACHE['bootstrap']);
};
