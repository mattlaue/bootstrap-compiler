const path = require('path');
const childProcess = require('child_process');

test('cli version', () => {
    childProcess.execSync(path.resolve(__dirname, '../../src/cli/index.js') + ' --version');
});
