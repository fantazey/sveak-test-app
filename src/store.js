import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
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
    reducer,
    initialState,
    composedEnhancers
);


export default store;
