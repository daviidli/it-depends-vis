import types from '../actions/types.json';

const error = (state = '', action) => ( // todo: might be an error object instead of string
	action.type === types.SET_ERROR ? action.error : state
);

export default error;
