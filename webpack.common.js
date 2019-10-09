const path = require( 'path' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = {
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components|server)/,
                loader: 'babel-loader',
                options: {
                    presets: [ 'env' ]
                }
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.ttf$/,
                use: [ 'file-loader' ]
            }
        ]
    },
    resolve: {
        extensions: [ '*', '.js', '.jsx' ]
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    plugins: [
        new CleanWebpackPlugin()
    ]
};
