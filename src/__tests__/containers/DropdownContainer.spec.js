import { mapStateToProps } from '../../containers/DropdownContainer';

describe('mapStateToProps', () => {
	it('should return startCommit, endCommit and commits', () => {
		const input = {
			startCommit: 1,
			endCommit: 2,
			commits: 3,
			foo: 4,
			bar: 5
		};
		expect(mapStateToProps(input)).toEqual({ startCommit: 1, endCommit: 2, commits: 3 });
	});
});
