import types from '../actions/types.json';

const repo = (state = '', action) => (action.type === types.SET_REPO ? action.repo : state);

export default repo;
