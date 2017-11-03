var path = require('path');
var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var CompressionPlugin = require("compression-webpack-plugin");

var isProd = (process.env.NODE_ENV === 'production');

function getPlugins() {
    var plugins = []
    plugins.push(new webpack.DefinePlugin({
        'process.env': {'NODE_ENV': JSON.stringify('production')}
    }))
    plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',
        filename: 'vendors.js',
        minChunks: 2,
    }))
    plugins.push(new webpack.optimize.AggressiveMergingPlugin())
    plugins.push(new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }))

    if(isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false },
            comments: false,
            minimize: true,
        }))
    }
    else {
        plugins.push(new BundleAnalyzerPlugin())
    }

    return plugins
}

var BUILD_DIR = path.resolve(__dirname, '../api_server/static/build/');
var alias;
var publicPath;

if(isProd){
    publicPath = 'static/build/'
}
else {
    publicPath = 'http://localhost:8090/assets/'
}


module.exports = {
    entry: {
        index: './src/index.js',
        vendors: ['react',
          'react-dom',
          'styled-components',
                  'react-redux',
          'axios',
          'redux-first-router',
          'history']
    },
    output: {
        filename: '[name].bundle.js',
        publicPath: publicPath,
        path: `${BUILD_DIR}/`,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['es2015', 'react', 'stage-2'],
                    plugins: ['transform-object-rest-spread']
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'file-loader',
                }],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        modules: ['src', 'node_modules'],
    },
    plugins: getPlugins()
};
