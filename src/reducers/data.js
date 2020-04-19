import types from '../actions/types.json';

const data = (state = null, action) => (action.type === types.SET_DATA ? action.data : state);

export default data;
