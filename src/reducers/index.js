import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import error from './error';
import repo from './repo';
import data from './data';
import selectedFile from './selectedFile';
import range from './range';
import commits from './commits';
import startCommit from './startCommit';
import endCommit from './endCommit';

const createRootReducer = history => combineReducers({
	router: connectRouter(history),
	error,
	repo,
	data,
	selectedFile,
	range,
	commits,
	startCommit,
	endCommit
});

export default createRootReducer;
