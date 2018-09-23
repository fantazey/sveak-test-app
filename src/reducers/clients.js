export const ADD = 'clients/ADD_CLIENT';
export const EDIT = 'clients/EDIT_CLIENT';
export const DELETE = 'clients/DELETE_CLIENT';
export const LOAD = 'clients/LOAD_CLIENTS';
export const LOAD_CLIENT = 'clients/LOAD_CLIENTS';

function loadHandler( state, payload ) {
    const clients = state.clients || [];
    let list = [];
    if ( clients.length === 0 ) {
        list = payload.clients;
    } else {
        clients.forEach( client => {
            let newClient = client;
            const clientFromPayload = payload.find( x => x.id === client.id );
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
