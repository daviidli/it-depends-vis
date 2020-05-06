import generateTree from '../../utils/dataUtils';

describe('generateTree', () => {
	it('should generate a tree with no children', () => {
		const files = ['file1'];
		const mappings = [[1]];
		const tree = generateTree(files, mappings)('file1');
		const expectedTree = {
			name: 'file1',
			children: []
		};
		expect(tree).toEqual(expectedTree);
	});

	it('should generate a tree', () => {
		const files = ['file1', 'file2', 'file3', 'file4'];
		const mappings = [
			[1.00, 0.01, 0.02, 0.03],
			[0.04, 1.00, 0.05, 0.06],
			[0.07, 0.08, 1.00, 0.09],
			[0.10, 0.11, 0.12, 1.00]
		];
		const tree = generateTree(files, mappings)('file1');
		const expectedTree = {
			name: 'file1',
			children: [
				{
					name: 'file2',
					weight: 0.04
				},
				{
					name: 'file3',

				}
			]
		};
		expect(tree).toEqual(expectedTree);
	});
});
