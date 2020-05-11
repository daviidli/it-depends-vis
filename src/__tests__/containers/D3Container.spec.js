import { mapStateToProps } from '../../containers/D3Container';

it('mapStateToProps should return files, mappings and sizes', () => {
	const input = {
		data: {
			names: ['file1', 'file2'],
			data: [[1, 2], [1, 2]],
			size: [1, 2]
		},
		ordering: 'descending',
		topCount: 5,
		foo: 1,
		bar: 2
	};
	const expected = {
		files: ['file1', 'file2'],
		mappings: [[1, 2], [1, 2]],
		ordering: 'descending',
		topCount: 5
	};
	expect(mapStateToProps(input)).toEqual(expected);
});
