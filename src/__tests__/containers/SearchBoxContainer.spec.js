import { mapStateToProps } from '../../containers/SearchBoxContainer';

it('mapStateToProps should return files, mappings and sizes', () => {
	const input = {
		data: {
			names: ['file1', 'file2'],
			data: [[1, 2], [1, 2]],
			size: [1, 2]
		},
		foo: 1,
		bar: 2
	};
	expect(mapStateToProps(input)).toEqual({ files: ['file1', 'file2'] });
});
