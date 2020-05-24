import types from '../actions/types.json';

const initialState = {
	names: [],
	data: []
};

const data = (state = initialState, action) => (
	action.type === types.SET_DATA ? action.data : state
);

export default data;
