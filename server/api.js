const express = require( 'express' );
const router = express.Router();
const fs = require( 'fs' );
const dbFile = 'db.json';

const DEF_LIMIT = 5;
const DEF_OFFSET = 0;

/**
 * @typedef {Object} apiClient
 * @property {Number} id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} regCode
 * @property {String} phone
 * @property {String} address
 */

/**
 * @typedef {Object} apiComment
 * @property {Number} id
 * @property {Number} clientId
 * @property {Boolean} isDeleted
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

router.use( function( req, res, next ) {
    req.db = readFile();
    next();
} );

router.get( '/clients', function( req, res ) {
    const clients = req.db.clients;
    const limit = +req.query.limit || DEF_LIMIT;
    const offset = +req.query.offset || DEF_OFFSET;
    const resp = clients.slice( offset, limit + offset ).map( x => ( {
        id: x.id,
        firstName: x.firstName,
        lastName: x.lastName,
        phone: x.phone,
        address: x.address
    } ) );
    setTimeout( function() {
        return res.json( {
            clients: resp,
            meta: {
                total: clients.length,
                limit,
                offset
            }
        } );
    }, Math.random() * 2000 );
} );

router.get( '/clients/:id', function( req, res ) {
    const clients = req.db.clients;
    const client = clients.find( x => x.id === +req.params.id );
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    setTimeout( function () {
        return res.json( { 'clients': client } );
    }, Math.random() * 2000 );
} );

router.put( '/clients/:id', function( req, res ) {
    const clients = req.db.clients;
    let client = clients.find( x => x.id === +req.params.id );
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    // todo: add validation and create comment handler
    client = { ...client, ...req.body };
    writeFile( req.db );
    res.json( { clients: client } );
} );

router.post( '/clients', function( req, res ) {
    // todo: add validation
    if ( !req.body.firstName || !req.body.lastName ) {
        return res.status( 400 ).json( { 'error': 'invalid form params' } );
    }
    const client = {
        id: req.db.clientsLastId + 1,
        ...req.body
    };
    req.db.clients.push( client );
    req.db.clientsLastId = client.id;
    writeFile( req.db );
    return res.json( { clients: client } );
} );

router.delete( '/clients/:id', function( req, res ) {
    const clients = req.db.clients;
    const client = clients.find( x => x.id === +req.params.id );
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    clients.splice( clients.indexOf( client ), 1 );
    req.db.clients = clients;
    writeFile( req.db );
    return res.json( { 'status': 'success' } );
} );

router.get( '/clients/:id/comments', function( req, res ) {
    const comments = req.db.comments;
    const limit = +req.query.limit || DEF_LIMIT;
    const offset = +req.query.offset || DEF_OFFSET;
    return res.json( {
        comments: comments.filter(
            x => x.clientId === +req.params.id && !x.isDeleted
        ).slice( offset, limit + offset )
    } );
} );

router.post( '/clients/:id/comments', function( req, res ) {
    if ( !req.body.text || req.body.text.trim().length === 0 ) {
        return res.status( 400 ).json( { 'error': 'empty comment' } );
    }
    /**@type {apiComment} */
    const comment = {
        id: req.db.commentsLastId + 1,
        clientId: +req.params.id,
        isDeleted: false,
        text: req.body.text
    };
    req.db.comments.push( comment );
    req.db.commentsLastId = comment.id;
    writeFile( req.db );
    return res.json( { comments: [ comment ] } );
} );

router.delete( 'comments/:id', function( req, res ) {
    const comments = req.db.comments;
    const comment = comments.find( x => x.id === +req.params.id );
    if ( !comment ) {
        res.status( 404 ).json( { 'error': 'not found' } );
    }
    comment.isDeleted = true;
    writeFile( req.db );
    return res.json( { comments: [ comment ] } );
} );


module.exports = router;