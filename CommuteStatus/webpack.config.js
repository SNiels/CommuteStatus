const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = function(env){
    let production;
    if(env && env.env){
        production = env.env === "production";
    }else{
        production = false;
    }
    return {
        entry: "./src/app.ts",
        target: 'node',
        externals: [nodeExternals()],
        output: {
            filename: "app.js",
            path: __dirname + "/dist"
        },
        watch: production ? false : true,

        // Currently we need to add '.ts' to the resolve.extensions array.
        resolve: {
            extensions: ['.ts', '.js', 'json'],
            plugins: [new TsConfigPathsPlugin()],
            modules: ['src', 'node_modules']
        },

        // Source maps support ('inline-source-map' also works)
        devtool: 'source-map',

        // Add the loader for .ts files.
        module: {
            loaders: [
                {
                    test: /\.ts?$/,
                    loader: 'awesome-typescript-loader'
                }
            ]
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(env.env || 'development')
            })
        ]
    };
}