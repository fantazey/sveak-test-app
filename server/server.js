const express = require( 'express' );
const logger = require( 'morgan' );
const bodyParser = require( 'body-parser' );
const apiRouter = require( './api' );
const app = express();

const jsonParser = bodyParser.json();

app.use( logger( 'default' ) );
app.use( jsonParser );
app.use( '/api', apiRouter );

const PORT = 8998;

app.listen( PORT, function() {
    console.log( 'express server listening on 8998' );
} );