const express = require( 'express' );
const router = express.Router();
const fs = require( 'fs' );
const dbFile = 'db.json';

const DEF_LIMIT = 5;
const DEF_OFFSET = 0;

/**
 * @typedef {Object} apiClient
 * @property {Number} id
 * @property {Number} firstName
 * @property {Number} lastName
 * @property {Number} email
 */

/**
 * @typedef {Object} apiComment
 * @property {Number} id
 * @property {Number} clientId
 * @property {String} text
 */

/**
 * @typedef {Object} apiDB
 * @property {Number} clientsLastId
 * @property {Number} commentsLastId
 * @property {Array<apiClient>} clients
 * @property {Array<apiComment>} comments
 */

/**
 * @returns {apiDB}
 */
function readFile() {
    return JSON.parse( fs.readFileSync( dbFile, 'utf-8' ) );
}

/**
 * @param {apiDB} json
 */
function writeFile( json ) {
    fs.writeFileSync( dbFile, JSON.stringify( json ) );
}

router.get( '/clients', function( req, res ) {
    const db = readFile();
    const clients = db.clients;
    const limit = +req.query.limit || DEF_LIMIT;
    const offset = +req.query.offset || DEF_OFFSET;
    const resp = clients.slice( offset, limit + offset );
    return res.json( {
        clients: resp,
        meta: {
            total: clients.length,
            limit,
            offset
        }
    } );
} );

router.get( '/clients/:id', function( req, res ) {
    const db = readFile();
    const clients = db.clients;
    const client = clients.find( x => x.id === +req.params.id );
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    return res.json( { 'clients': client } );
} );

router.put( '/clients/:id', function( req, res ) {
    const db = readFile();
    const clients = db.clients;
    let client = clients.find( x => x.id === +req.params.id );
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    clients.splice( clients.indexOf( client ), 1 );
    // todo: add validation and create comment handler
    client = { ...client, ...req.body };
    db.clients = [ ...clients, client ];
    writeFile( db );
    res.json( { clients: [ client ] } );
} );

router.post( '/clients', function( req, res ) {
    const db = readFile();
    // todo: add validation
    if ( !req.body.firstName || !req.body.lastName ) {
        return res.status( 400 ).json( { 'error': 'invalid form params' } );
    }
    const client = {
        id: db.clientsLastId + 1,
        ...req.body
    };
    db.clients.push( client );
    db.clientsLastId = client.id;
    writeFile( db );
    return res.json( { clients: [ client ] } );
} );

router.delete( '/clients/:id', function( req, res ) {
    // todo: find way to push db as arg
    const db = readFile();
    const clients = db.clients;
    const client = clients.find( x => x.id === +req.params.id );
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    clients.splice( clients.indexOf( client ), 1 );
    db.clients = clients;
    writeFile( db );
    return res.json( { 'status': 'success' } );
} );

module.exports = router;