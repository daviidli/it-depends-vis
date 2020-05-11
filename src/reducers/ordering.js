import types from '../actions/types.json';

const ordering = (state = 'descending', action) => (
	action.type === types.SET_ORDERING ? action.ordering : state
);

export default ordering;
