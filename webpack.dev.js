const path = require( 'path' );

const common = require( './webpack.common' );
const merge = require( 'webpack-merge' );

module.exports = merge( common, {
    mode: 'development',
    devServer: {
        contentBase: path.join( __dirname, 'public/' ),
        historyApiFallback: true,
        port: 3000,
        publicPath: 'http://localhost:3000/dist/',
        hotOnly: true
    }
} );
