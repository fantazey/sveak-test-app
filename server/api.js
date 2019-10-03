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
 * @property {Number} deletedAt
 * @property {Boolean} deleted
 */

/**
 * @typedef {Object} apiComment
 * @property {Number} id
 * @property {Number} user
 * @property {Boolean} [isDeleted]
 * @property {String} comment
 * @property {Number} createdAt
 * @property {Boolean} system
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
    const resp = clients
        .filter( x => !x.deleted )
        .slice( offset, limit + offset )
        .map( x => ( {
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

/**
 *
 * @param {apiClient} data
 * @private
 */
function validateClient( data ) {
    const onlyChars = new RegExp( /\w+/ );
    const onlyNumbers = new RegExp( /\d+/ );
    const email = new RegExp( /^[\d\w]+@[\d\w]+\.\w{2}$/ );
    const charKeys = [ 'firstName', 'lastName', 'address' ];
    const numberKeys = [ 'regCode', 'phone' ];
    let dataValid = true;
    const empty = ( k, data ) => data.hasOwnProperty( k ) && data[k].trim().length === 0;
    const errors = {};
    charKeys.forEach( k => {
        if ( empty( k, data ) || !onlyChars.test( data[ k ] ) ) {
            errors[ k ] = true;
            dataValid = false;
        }
    } );
    numberKeys.forEach( k => {
        if ( empty( k, data ) || !onlyNumbers.test( data[ k ] ) ) {
            errors[ k ] = true;
            dataValid = false;
        }
    } );
    if ( empty( 'email', data ) || !email.test( data.email ) ) {
        dataValid = false;
        errors.email = true;
    }
    return { dataValid, errors };
}

function createUpdateComment( client, oldClient, id ) {
    let commentMessage = [
        'Fields was changed:'
    ];
    Object.keys( client ).forEach( field => {
        if ( client[ field ] !== oldClient[ field ] ) {
            commentMessage = commentMessage.concat( [
                'Field:', field,
                'changed from:', oldClient[ field ] || '',
                'to', client[ field ] || '',
                ';'
            ] );
        }
    } );
    return {
        id: id + 1,
        user: client.id,
        comment: commentMessage.join( ' ' ),
        createdAt: ( new Date() ).getTime(),
        system: true
    };
}

router.put( '/clients/:id', function( req, res ) {
    const clients = req.db.clients;
    let client = clients.find( x => x.id === +req.params.id );
    const oldClient = { ...client };
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    if ( req.body.hasOwnProperty( 'id' ) ) {
        return res.status( 400 ).json( { 'error': 'ID could not be changed' } );
    }
    const { dataValid, errors } = validateClient( req.body );
    if ( !dataValid ) {
        return res.status( 400 ).json( { 'error': 'Form invalid', 'fields': errors } );
    }
    client = { ...client, ...req.body };
    const newId = req.db.commentsLastId + 1;
    const comment = createUpdateComment( client, oldClient, newId );
    req.db.commentsLastId = newId;
    req.db.comments.push( comment );
    writeFile( req.db );
    res.json( { clients: client } );
} );

router.post( '/clients', function( req, res ) {
    const { dataValid, errors } = validateClient( req.body );
    if ( !dataValid ) {
        return res.status( 400 ).json( { 'error': 'Form invalid', 'fields': errors } );
    }
    const client = {
        id: req.db.clientsLastId + 1,
        ...req.body
    };
    req.db.clients.push( client );
    req.db.clientsLastId = client.id;
    const comment = {
        id: req.db.commentsLastId + 1,
        user: client.id,
        comment: 'User registered',
        createdAt: ( new Date() ).getTime(),
        system: true
    };
    req.db.comments.push( comment );
    req.db.commentsLastId = comment.id;
    writeFile( req.db );
    return res.json( { clients: client } );
} );

router.delete( '/clients/:id', function( req, res ) {
    const clients = req.db.clients;
    const client = clients.find( x => x.id === +req.params.id );
    if ( !client ) {
        return res.status( 404 ).json( { 'error': 'not found' } );
    }
    client.deleted = true;
    client.deletedAt = ( new Date() ).getTime();
    clients.splice( clients.indexOf( client ), 1 );
    req.db.clients = clients;
    writeFile( req.db );
    return res.json( { 'status': 'success' } );
} );

router.get( '/clients/:id/comments', function( req, res ) {
    const comments = req.db.comments;
    const limit = +req.query.limit || DEF_LIMIT;
    const offset = +req.query.offset || DEF_OFFSET;
    const commentsLimit = comments
        .filter( x => x.user === +req.params.id && !x.isDeleted )
        .slice( offset, limit + offset );
    return res.json( {
        comments: commentsLimit
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