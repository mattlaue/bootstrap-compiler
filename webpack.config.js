const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src/lib/index.js'),
    devtool: 'source-map',
    resolve: {
        fallback: {
            fs: false,
            path: false
        }
    },
    output: {
        filename: 'bootstrap-compiler.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'BootstrapCompiler',
        libraryTarget: 'umd',
        globalObject: 'this'
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: 'raw-loader',
            },
        ],
    },
    plugins: [
        // fix "process is not defined" error:
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
        // fix "Buffer not defined" error
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        })
    ]
};
