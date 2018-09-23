const ADD = 'clients/ADD_CLIENT';
const EDIT = 'clients/EDIT_CLIENT';
const DELETE = 'clients/DELETE_CLIENT';
const LOAD = 'clients/LOAD_CLIENTS';

function loadHandler( state, payload ) {
    const clients = state.clients;
    const list = [];
    clients.forEach( client => {
        let newClient = client;
        const clientFromPayload = payload.find( x => x.id === client.id );
        if ( clientFromPayload ) {
            newClient = { ...client, ...clientFromPayload };
        }
        list.push( newClient );
    } );
    return {
        ...state,
        clients: list
    };
}

function addHandler( state, data ) {}
function editHandler( state, data ) {}
function deleteHandler( state, data ) {}

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

export const loadClients = ( limit, offset ) => {
    return dispatch => {
        const query = `limit=${limit}&offset=${offset}`;
        return fetch(
            `localhost:8998/api/clients?${query}`
        ).then( res => res.json() ).then( jsonData => {
            const data = JSON.parse( jsonData );
            dispatch( {
                type: LOAD,
                payload: data
            } );
        } );
    };
};