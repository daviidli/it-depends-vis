import types from '../actions/types.json';

const selectedFile = (state = '', action) => (action.type === types.SET_SELECTED_FILE ? action.filename : state);

export default selectedFile;
