const fs = require('fs');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const srcDir = 'src';

function getEntries() {
    const entries = {};
    fs.readdirSync(srcDir).forEach(file => {
        if (path.extname(file) === '.ts') {
            const nameWoExt = file.split('.').slice(0, -1).join('.');
            entries[nameWoExt] = `./${path.join(srcDir, file)}`;
        }
    });

    return entries;
}

module.exports = {
    entry: getEntries(),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|jp2|webp)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'WebXR',
            'meta': {
                'charset': 'utf-8',
                'description': 'WebXR Page',
                'viewport': 'width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no,user-scalable=no,minimal-ui,viewport-fit=cover'
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: path.resolve(__dirname, './node_modules/aframe/dist/aframe.js'), to: "static" }
            ]
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
};