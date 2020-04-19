import types from '../actions/types.json';

const range = (state = [0, 100], action) => (
	action.type === types.SET_RANGE ? action.range : state
);

export default range;
