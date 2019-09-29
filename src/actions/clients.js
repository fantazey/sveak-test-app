import {
    ADD,
    DELETE,
    EDIT
} from '../reducers/clients';
import { API_PATH } from '../confg';

export const FETCH_CLIENT_LIST_PENDING = 'clients/FETCH_CLIENT_LIST_PENDING';
export const FETCH_CLIENT_LIST_SUCCESS = 'clients/FETCH_CLIENT_LIST_SUCCESS';
export const FETCH_CLIENT_LIST_FAIL = 'clients/FETCH_CLIENT_LIST_FAIL';

export const FETCH_CLIENT_PENDING = 'clients/FETCH_CLIENT_PENDING';
export const FETCH_CLIENT_SUCCESS = 'clients/FETCH_CLIENT_SUCCESS';
export const FETCH_CLIENT_FAIL = 'clients/FETCH_CLIENT_FAIL';

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
        makeRequest( url, {} ).then( res => {
            dispatch( fetchClientSuccess( res.clients ) );
        } ).catch( err => {
            dispatch( fetchClientFail( err ) );
        } );
    };
}

export const addClient = ( data ) => {
    return dispatch => {
        const url = `${API_PATH}/clients`;
        return makeRequest( url, {
            method: 'POST',
            body: data
        } ).then( data => {
            dispatch( {
                type: ADD,
                payload: data
            } );
        } );
    };
};

export const editClient = ( id, data ) => {
    return dispatch => {
        const url = `${API_PATH}/clients/${id}`;
        makeRequest( url, {
            method: 'PUT',
            body: data
        } ).then( data => {
            dispatch( {
                type: EDIT,
                payload: data
            } );
        } );
    };
};

export const deleteClient = ( id ) => {
    return dispatch => {
        const url = `${API_PATH}/clients/${id}`;
        makeRequest( url, {
            method: 'DELETE'
        } ).then( data => {
            dispatch( {
                type: DELETE,
                payload: data
            } );
        } );
    };
};

/**
 * Make http request
 * @param url
 * @param params
 * @returns {Promise<any>}
 */
function makeRequest( url, params ) {
    return fetch( url, params ).then(
        res => res.json(),
    );
}
