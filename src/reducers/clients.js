import {
    FETCH_CLIENT_LIST_FAIL,
    FETCH_CLIENT_LIST_PENDING,
    FETCH_CLIENT_LIST_SUCCESS,
    FETCH_CLIENT_FAIL,
    FETCH_CLIENT_PENDING,
    FETCH_CLIENT_SUCCESS,
    UPDATE_CLIENT_FAIL,
    UPDATE_CLIENT_PENDING,
    UPDATE_CLIENT_SUCCESS,
    CREATE_CLIENT_PENDING,
    CREATE_CLIENT_FAIL,
    CREATE_CLIENT_SUCCESS,
    DELETE_CLIENT_PENDING,
    DELETE_CLIENT_SUCCESS,
    DELETE_CLIENT_FAIL, RESET_PENDING
} from '../actions/clients';

const initialState = {
    pending: true,
    clients: [],
    currentId: null,
    currentClient: null,
    operationSuccess: null,
    error: null
};

function fetchClientsListHandler( state, payloadClientsList ) {
    return {
        ...state,
        clients: payloadClientsList,
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
function createClientHandler( state, clientFromPayload ) {
    const clients = [ ...state.clients ];
    clients.push( clientFromPayload );
    return {
        ...state,
        clients
    };
}

// eslint-disable-next-line complexity
export default ( state = initialState, action ) => {
    switch ( action.type ) {
    case RESET_PENDING:
        return {
            ...state,
            pending: false
        };
    case FETCH_CLIENT_LIST_PENDING:
        return {
            ...state,
            pending: true,
            currentId: null,
            currentClient: null
        };
    case FETCH_CLIENT_LIST_SUCCESS:
        return fetchClientsListHandler( state, action.clients );
    case FETCH_CLIENT_FAIL:
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
    case CREATE_CLIENT_FAIL:
    case UPDATE_CLIENT_FAIL:
    case DELETE_CLIENT_FAIL:
        return {
            ...state,
            pending: false,
            error: action.error,
            operationSuccess: false
        };
    case CREATE_CLIENT_PENDING:
    case UPDATE_CLIENT_PENDING:
    case DELETE_CLIENT_PENDING:
        return {
            ...state,
            pending: true,
            operationSuccess: null,
            error: null
        };
    case CREATE_CLIENT_SUCCESS:
        return {
            ...createClientHandler( state, action.client ),
            operationSuccess: true,
            pending: false
        };
    case UPDATE_CLIENT_SUCCESS:
        return {
            ...updateClientHandler( state, action.client ),
            pending: false,
            operationSuccess: true
        };
    case DELETE_CLIENT_SUCCESS:
        return {
            ...state,
            pending: false,
            operationSuccess: true
        };
    default:
        return state;
    }
};