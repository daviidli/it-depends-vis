import types from '../actions/types.json';

const commits = (state = [], action) => (
	action.type === types.SET_COMMITS ? action.commits : state
);

export default commits;
