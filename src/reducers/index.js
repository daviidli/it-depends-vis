import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import repo from './repo';
import data from './data';
import commits from './commits';
import startCommit from './startCommit';
import endCommit from './endCommit';
import topCount from './topCount';
import ordering from './ordering';

const createRootReducer = history => combineReducers({
	router: connectRouter(history),
	repo,
	data,
	commits,
	startCommit,
	endCommit,
	topCount,
	ordering
});

export default createRootReducer;
