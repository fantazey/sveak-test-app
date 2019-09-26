export const ADD = 'clients/ADD_CLIENT';
export const EDIT = 'clients/EDIT_CLIENT';
export const DELETE = 'clients/DELETE_CLIENT';
export const LOAD = 'clients/LOAD_CLIENTS';
export const LOAD_CLIENT = 'clients/LOAD_CLIENT';

function loadHandler( state, payload ) {
    const clients = state.clients || [];
    let list = [];
    if ( clients.length === 0 ) {
        list = payload.clients;
    } else {
        clients.forEach( client => {
            let newClient = client;
            const clientFromPayload = payload.clients.find( x => x.id === client.id );
            if ( clientFromPayload ) {
                newClient = { ...client, ...clientFromPayload };
            }
            list.push( newClient );
        } );
    }
    return {
        ...state,
        clients: list
    };
}


function loadClientHandler( state, payload ) {
    if ( !payload.hasOwnProperty( 'clients' ) ) {
        console.error( 'Client not found' );
    }
    const list = state.clients;
    const clientFromPayload = payload.clients;
    let client = list.find( x => x.id === clientFromPayload.id );
    if ( !client ) {
        client = {};
    }
    client = { ...client, ...clientFromPayload };
    return {
        ...state,
        clients: list,
        currentClient: client
    };
}

function addHandler( state ) {
    return {
        ...state
    };
}
function editHandler( state ) {
    return {
        ...state
    };
}
function deleteHandler( state ) {
    return {
        ...state
    };
}

export default ( state = {}, action ) => {
    switch ( action.type ) {
    case LOAD:
        return loadHandler( state, action.payload );
    case LOAD_CLIENT:
        return loadClientHandler( state, action.payload );
    case ADD:
        return addHandler( state, action.data );
    case EDIT:
        return editHandler( state, action.id, action.data );
    case DELETE:
        return deleteHandler( state, action.id );
    default:
        return state;
    }
};
