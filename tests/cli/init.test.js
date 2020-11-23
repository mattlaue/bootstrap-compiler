const fs = require('fs');
const os = require('os');
const path = require('path');
const rimraf = require('rimraf');

const init = require('../../src/cli/commands/init');

test('init', () => {
    let tmp = fs.mkdtempSync(os.tmpdir());

    try {
        let filePath = path.resolve(tmp, 'style.scss');
        init.handler({filePath: filePath});
        expect(fs.existsSync(filePath)).toBeTruthy();
    } finally {
        rimraf.sync(tmp);
    }
});

test('init - file exists', () => {
    let tmp = fs.mkdtempSync(os.tmpdir());

    try {
        let filePath = path.resolve(tmp, 'style.scss');
        fs.writeFileSync(filePath, 'xxx');
        expect(() => {
            init.handler({filePath: filePath});
        }).toThrowError();
    } finally {
        rimraf.sync(tmp);
    }
});
