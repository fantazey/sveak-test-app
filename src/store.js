import { createStore, applyMiddleware, compose } from 'redux';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import reducer from './reducers';

export const history = createHistory();

const middlwares = [
    routerMiddleware( history ),
    thunk
];

const composedEnhancers = compose( applyMiddleware( ...middlwares ) );

const initialState = {};

const store = createStore(
    reducer( history ),
    initialState,
    composedEnhancers
);


export default store;
