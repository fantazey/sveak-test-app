import { LOAD, LOAD_CLIENT, ADD, DELETE, EDIT } from '../reducers/clients';
import { API_PATH } from '../confg';


export const loadClients = ( limit, offset ) => {
    return dispatch => {
        const url = `${API_PATH}/clients?limit=${limit}&offset=${offset}`;
        return makeRequest( url, {} ).then( data => {
            dispatch( {
                type: LOAD,
                payload: data
            } );
        } );
    };
};

export const loadClient = ( id ) => {
    return dispatch => {
        const url = `${API_PATH}/clients/${id}`;
        return makeRequest( url, {} ).then( data => {
            dispatch( {
                type: LOAD_CLIENT,
                payload: data
            } );
        } );
    };
};

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
    ).catch( error => {
        // eslint-disable-next-line
        debugger;
        return error;
    } );
}
