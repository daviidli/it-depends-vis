import { mapStateToProps } from '../../containers/SliderContainer';

describe('mapStateToProps', () => {
	it('should return range object', () => {
		const input = {
			topCount: 20,
			foo: 2,
			bar: 3
		};
		expect(mapStateToProps(input)).toEqual({ topCount: 20 });
	});
});
