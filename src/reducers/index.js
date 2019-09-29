import { combineReducers } from 'redux';
import CommentsReducer from './comments';
import ClientsReducer from './clients';
import { connectRouter } from 'connected-react-router';

const createRootReducer = history =>combineReducers( {
    router: connectRouter( history ),
    ClientsReducer,
    CommentsReducer
} );

export default createRootReducer;
