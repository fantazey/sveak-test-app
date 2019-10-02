import { API_PATH } from '../confg';
export const RESET_PENDING = 'clients/RESET_PENDING';

export const FETCH_CLIENT_LIST_PENDING = 'clients/FETCH_CLIENT_LIST_PENDING';
export const FETCH_CLIENT_LIST_SUCCESS = 'clients/FETCH_CLIENT_LIST_SUCCESS';
export const FETCH_CLIENT_LIST_FAIL = 'clients/FETCH_CLIENT_LIST_FAIL';

export const FETCH_CLIENT_PENDING = 'clients/FETCH_CLIENT_PENDING';
export const FETCH_CLIENT_SUCCESS = 'clients/FETCH_CLIENT_SUCCESS';
export const FETCH_CLIENT_FAIL = 'clients/FETCH_CLIENT_FAIL';

export const UPDATE_CLIENT_PENDING = 'clients/UPDATE_CLIENT_PENDING';
export const UPDATE_CLIENT_SUCCESS = 'clients/UPDATE_CLIENT_SUCCESS';
export const UPDATE_CLIENT_FAIL = 'clients/UPDATE_CLIENT_FAIL';

export const CREATE_CLIENT_PENDING = 'clients/CREATE_CLIENT_PENDING';
export const CREATE_CLIENT_SUCCESS = 'clients/CREATE_CLIENT_SUCCESS';
export const CREATE_CLIENT_FAIL = 'clients/CREATE_CLIENT_FAIL';

export const DELETE_CLIENT_PENDING = 'clients/DELETE_CLIENT_PENDING';
export const DELETE_CLIENT_SUCCESS = 'clients/DELETE_CLIENT_SUCCESS';
export const DELETE_CLIENT_FAIL = 'clients/DELETE_CLIENT_FAIL';

export function resetPending() {
    return {
        type: RESET_PENDING
    };
}

function fetchClientsListPending() {
    return {
        type: FETCH_CLIENT_LIST_PENDING
    };
}
function fetchClientsListSuccess( list ) {
    return {
        type: FETCH_CLIENT_LIST_SUCCESS,
        clients: list
    };
}
function fetchClientsListFail( error ) {
    return {
        type: FETCH_CLIENT_LIST_FAIL,
        error
    };
}
export function fetchClientsList( limit = 10, offset = 0 ) {
    return dispatch => {
        dispatch( fetchClientsListPending() );
        const url = `${API_PATH}/clients?limit=${limit}&offset=${offset}`;
        makeRequest( url, {} ).then( res => {
            dispatch( fetchClientsListSuccess( res.clients ) );
        } ).catch( err => {
            dispatch( fetchClientsListFail( err ) );
        } );
    };
}

function fetchClientPending( id ) {
    return {
        type: FETCH_CLIENT_PENDING,
        id
    };
}
function fetchClientSuccess( record ) {
    return {
        type: FETCH_CLIENT_SUCCESS,
        client: record
    };
}
function fetchClientFail( error ) {
    return {
        type: FETCH_CLIENT_FAIL,
        error: error
    };
}
export function fetchClient( id ) {
    return dispatch => {
        dispatch( fetchClientPending( id ) );
        const url = `${API_PATH}/clients/${id}`;
        return makeRequest( url, {} ).then( res => {
            dispatch( fetchClientSuccess( res.clients ) );
        } ).catch( err => {
            dispatch( fetchClientFail( err ) );
        } );
    };
}

function updateClientPending( id ) {
    return {
        type: UPDATE_CLIENT_PENDING,
        id
    };
}
function updateClientSuccess( record ) {
    return {
        type: UPDATE_CLIENT_SUCCESS,
        client: record
    };
}
function updateClientFail( error ) {
    return {
        type: UPDATE_CLIENT_FAIL,
        error: error
    };
}
export function updateClient( id, data ) {
    return dispatch => {
        dispatch( updateClientPending( id ) );
        const url = `${API_PATH}/clients/${id}`;
        makeRequest( url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } ).then( res => {
            dispatch( updateClientSuccess( res.clients ) );
        } ).catch( err => {
            dispatch( updateClientFail( err ) );
        } );
    };
}

function createClientPending() {
    return {
        type: CREATE_CLIENT_PENDING
    };
}
function createClientSuccess( record ) {
    return {
        type: CREATE_CLIENT_SUCCESS,
        client: record
    };
}
function createClientFail( error ) {
    return {
        type: CREATE_CLIENT_FAIL,
        error: error
    };
}
export function createClient( data ) {
    return dispatch => {
        dispatch( createClientPending() );
        const url = `${API_PATH}/clients`;
        makeRequest( url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( data )
        } ).then( res => {
            dispatch( createClientSuccess( res.clients ) );
        } ).catch( err => {
            dispatch( createClientFail( err ) );
        } );
    };
}

function deleteClientPending() {
    return {
        type: DELETE_CLIENT_PENDING
    };
}
function deleteClientSuccess() {
    return {
        type: DELETE_CLIENT_SUCCESS
    };
}
function deleteClientFail( error ) {
    return {
        type: DELETE_CLIENT_FAIL,
        error: error
    };
}
export function deleteClient( id ) {
    return dispatch => {
        dispatch( deleteClientPending() );
        const url = `${API_PATH}/clients/${id}`;
        makeRequest( url, {
            method: 'DELETE'
        } ).then( () => {
            dispatch( deleteClientSuccess() );
            dispatch( fetchClientsList() );
        } ).catch( err => {
            dispatch( deleteClientFail( err.error ) );
        } );
    };
}

/**
 * Make http request
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
export function makeRequest( url, params ) {
    return fetch( url, params ).then(
        res => res.json(),
    );
}
