var path = require('path');

module.exports = {
    devtool: "cheap-eval-source-map",
    entry: "./src/index.js",
    output: {
        path: "./dist",
        filename: "index.js",
        library: "redux-promise-queue-middleware",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {test: /\.js$/, include: 'src', exclude: /node_modules/, loader: 'babel-loader'}
        ]
    },
    resolve: {
        modules: ["node_modules", path.resolve(__dirname, "src")],
        alias: {
            "src$": "/src"
        }
    }
};