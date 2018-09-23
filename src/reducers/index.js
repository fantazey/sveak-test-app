import { combineReducers } from 'redux';
import CommentsReducer from './comments';
import ClientsReducer from './clients';
import { routerReducer as routing } from 'react-router-redux';

export default combineReducers( {
    CommentsReducer,
    ClientsReducer,
    routing
} );
