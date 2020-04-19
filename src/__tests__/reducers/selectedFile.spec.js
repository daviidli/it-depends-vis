import selectedFile from '../../reducers/selectedFile';
import actions from '../../actions/types.json';

describe('selectedFile', () => {
	it('should return initial state', () => expect(selectedFile(undefined, {})).toEqual(''));

	it('should return same state', () => expect(
		selectedFile('file1', { type: 'foo', filename: 'file2' })
	).toEqual('file1'));

	it('should return new state', () => expect(
		selectedFile('file1', { type: actions.SET_SELECTED_FILE, filename: 'file2' })
	).toEqual('file2'));
});
