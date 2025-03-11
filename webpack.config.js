const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    mode: 'production',
    optimization: {
        minimize: false,
    },
    entry: {
        popup: './src/popup.ts',
        background: './src/background.ts',
        content: './src/content.ts'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {from: "public/manifest.json", to: "manifest.json"},
                {from: "public/icons", to: "icons"},
                {from: "public/popup.html", to: "popup.html"},
            ],
        }),
    ],
};