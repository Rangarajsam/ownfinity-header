const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');
const {ModuleFederationPlugin} = require('webpack').container;
const packageJson = require('../package.json');

const prodConfig = {
  mode: 'production',
  output: {
    filename: '[name].[contenthash].js',
    publicPath: '/header/latest/',
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'header',
            filename: 'remoteEntry.js',
            exposes: {
                './HeaderApp': './src/bootstrap',
            },
            remotes:{
                container:`container@/container/latest/remoteEntry.js`
            },
            shared: {
                ...packageJson.dependencies,
                mitt: { singleton: true, strictVersion: false, requiredVersion: false }
            }
        }),
    ],
};

module.exports = merge(commonConfig, prodConfig);
