const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = function(env){
    return {
        entry: "./src/test/wmataApi.test.ts",
        target: 'node',
        externals: [nodeExternals()],
        output: {
            filename: "test.js",
            path: __dirname + "/dist"
        },
        watch: true,
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
            new CheckerPlugin()
            //new WebpackShellPlugin({onBuildStart:['ava dist/test.js'], onBuildEnd:['echo "Webpack End"']})
        ]
    };
}