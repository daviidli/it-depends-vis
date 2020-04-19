/* eslint-disable no-underscore-dangle */
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from '../reducers';

export const history = createBrowserHistory();

const configureStore = preloadedState => createStore(
	createRootReducer(history),
	preloadedState,
	compose(
		applyMiddleware(routerMiddleware(history)),
		window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
	)
);

export default configureStore;
