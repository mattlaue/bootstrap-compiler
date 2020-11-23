const os = require('os');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const compile = require('../../src/cli/commands/compile');

test('cli compile', () => {
    let tmp = fs.mkdtempSync(os.tmpdir());

    let pwd = process.cwd();
    process.chdir(tmp);

    try {
        let filePath = path.join(tmp, 'style.scss');
        fs.writeFileSync(filePath, '$red: #ff0000');
        compile.handler({filePath: filePath});
        expect(fs.existsSync(path.join(tmp, 'style.css'))).toBeTruthy();
        expect(fs.existsSync(path.join(tmp, 'style.css.map'))).toBeTruthy();
    } finally {
        rimraf.sync(tmp);
        process.chdir(pwd);
    }
});

test('cli compile - file not found', () => {
    let tmp = fs.mkdtempSync(os.tmpdir());

    try {
        let filePath = path.join(tmp, 'style.scss');
        expect(() => {
            compile.handler({filePath: filePath});
        }).toThrowError();
    } finally {
        rimraf.sync(tmp);
    }
});
