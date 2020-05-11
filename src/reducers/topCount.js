import types from '../actions/types.json';

const topCount = (state = 20, action) => (
	action.type === types.SET_TOP_COUNT ? action.topCount : state
);

export default topCount;
