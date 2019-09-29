import {
    FETCH_CLIENT_LIST_FAIL, FETCH_CLIENT_LIST_PENDING, FETCH_CLIENT_LIST_SUCCESS,
    FETCH_CLIENT_FAIL, FETCH_CLIENT_PENDING, FETCH_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL, UPDATE_CLIENT_PENDING, UPDATE_CLIENT_SUCCESS
} from '../actions/clients';

export const ADD = 'clients/ADD_CLIENT';
export const EDIT = 'clients/EDIT_CLIENT';
export const DELETE = 'clients/DELETE_CLIENT';

const initialState = {
    pending: true,
    clients: [],
    currentId: null,
    currentClient: null,
    error: null
};

function fetchClientsListHandler( state, payloadClientsList ) {
    const clients = state.clients || [];
    let list = [];
    if ( clients.length === 0 ) {
        list = payloadClientsList;
    } else {
        clients.forEach( client => {
            let newClient = client;
            const clientFromPayload = payloadClientsList.find( x => x.id === client.id );
            if ( clientFromPayload ) {
                newClient = { ...client, ...clientFromPayload };
            }
            list.push( newClient );
        } );
    }
    return {
        ...state,
        clients: list,
        pending: false
    };
}
function fetchClientByIdHandler( state, clientFromPayload ) {
    const list = state.clients;
    let client = list.find( x => x.id === clientFromPayload.id );
    if ( !client ) {
        client = {};
    }
    client = { ...client, ...clientFromPayload };
    return {
        ...state,
        clients: list,
        currentClient: client,
        pending: false
    };
}
function updateClientHandler( state, clientFromPayload ) {
    let client = state.clients.find( x => x.id === state.currentId );
    client = { ...client, ...clientFromPayload };
    return {
        ...state,
        currentClient: client,
        pending: false
    };
}

function addHandler( state ) {
    return {
        ...state
    };
}

function deleteHandler( state ) {
    return {
        ...state
    };
}

export default ( state = initialState, action ) => {
    switch ( action.type ) {
    case FETCH_CLIENT_LIST_PENDING:
        return {
            ...state,
            pending: true,
            currentId: null,
            currentClient: null
        };
    case FETCH_CLIENT_LIST_SUCCESS:
        return fetchClientsListHandler( state, action.clients );
    case FETCH_CLIENT_LIST_FAIL:
        return {
            ...state,
            pending: false,
            error: action.error
        };
    case FETCH_CLIENT_PENDING:
        return {
            ...state,
            pending: true,
            currentId: action.id
        };
    case FETCH_CLIENT_SUCCESS:
        return fetchClientByIdHandler( state, action.client );
    case FETCH_CLIENT_FAIL:
        return {
            ...state,
            pending: false,
            error: action.error
        };
    case UPDATE_CLIENT_PENDING:
        return {
            ...state,
            pending: true
        };
    case UPDATE_CLIENT_SUCCESS:
        return updateClientHandler( state, action.client );
    case UPDATE_CLIENT_FAIL:
        return {
            ...state,
            pending: false,
            error: action.error
        };
    case ADD:
        return addHandler( state, action.data );
    case DELETE:
        return deleteHandler( state, action.id );
    default:
        return state;
    }
};