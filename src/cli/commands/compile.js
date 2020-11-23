const fs = require('fs');
const path = require('path');

const bootstrapCompiler = require('bootstrap-compiler/dist/bootstrap-compiler');

exports.command = 'compile [style.scss]';
exports.desc = 'Compile bootstrap using style.scss';
exports.builder = {
    filePath: {
        default: './style.scss'
    }
};
exports.handler = function (argv) {
    if (!fs.existsSync(argv.filePath)) {
        throw new Error('File \'' + argv.filePath + '\' does not exist.  Try creating it with the \'init\' command');
    }
    let outputFileName = path.basename(argv.filePath, '.scss') + '.css';

    let style = fs.readFileSync(argv.filePath, 'utf8');
    let result = bootstrapCompiler.compile(style, {
        outputStyle: 'compressed'
    });

    fs.writeFileSync(outputFileName, result.css.toString());
    fs.writeFileSync(outputFileName + '.map', result.map.toString());
};
