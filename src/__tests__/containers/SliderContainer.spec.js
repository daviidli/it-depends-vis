import { mapStateToProps } from '../../containers/SliderContainer';

describe('mapStateToProps', () => {
	it('should return range object', () => {
		const input = {
			range: [1, 2],
			foo: 2,
			bar: 3
		};
		expect(mapStateToProps(input)).toEqual({ range: [1, 2] });
	});
});
