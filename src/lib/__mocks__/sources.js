const path = require('path');
const fs = require('fs');

function readScss() {
    let sources = [];
    let base = path.resolve(__dirname, '../../../node_modules/bootstrap/scss');

    function readSubDir(dirPath, dirName) {
        fs.readdirSync(dirPath).forEach((entry) => {
            if (!entry.endsWith('.scss')) return;

            let fullPath = path.join(dirPath, entry);

            sources.push({
                key: './' + dirName + '/' + entry,
                contents: fs.readFileSync(fullPath, 'utf8')
            });
        });
    }

    fs.readdirSync(base).forEach((entry) => {
        let fullPath = path.join(base, entry);
        if (fs.statSync(fullPath).isDirectory()) {
            readSubDir(fullPath, entry);
            return;
        }

        sources.push({
            key: './' + entry,
            contents: fs.readFileSync(fullPath, 'utf8')
        });
    });

    return sources;
}

module.exports = readScss();
