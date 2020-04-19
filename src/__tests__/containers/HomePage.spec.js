import { mapStateToProps } from '../../containers/HomePage';

describe('mapStateToProps', () => {
	it('should return repo object', () => {
		const input = {
			repo: 1,
			foo: 2,
			bar: 3
		};
		expect(mapStateToProps(input)).toEqual({ repo: 1 });
	});
});
