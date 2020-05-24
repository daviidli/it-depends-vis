import types from '../actions/types.json';

const startCommit = (state = 0, action) => (
	action.type === types.SET_START_COMMIT ? action.startCommit : state
);

export default startCommit;
