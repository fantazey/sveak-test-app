import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';

export const history = createHistory();

const middlwares = [
  routerMiddleware(history),
];

const composedEnhancers = compose(applyMiddleware(...middlwares));

const store = createStore(
  reducer,
  {},
  composedEnhancers,
);

export default store;
