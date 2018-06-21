import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers';
import { loadFromStorage, saveToStorage } from './utils/localStorage';

export const history = createHistory();

const middlwares = [
  routerMiddleware(history),
];

const composedEnhancers = compose(applyMiddleware(...middlwares));

const initialState = loadFromStorage() || {};

const store = createStore(
  reducer,
  initialState,
  composedEnhancers,
);

store.subscribe(() => {
  saveToStorage(store.getState());
});

export default store;
