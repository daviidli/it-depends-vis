import types from '../actions/types.json';

const endCommit = (state = 0, action) => (
	action.type === types.SET_END_COMMIT ? action.endCommit : state
);

export default endCommit;
