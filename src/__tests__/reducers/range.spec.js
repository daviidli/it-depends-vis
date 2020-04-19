import range from '../../reducers/range';
import actions from '../../actions/types.json';

describe('range', () => {
	it('should return initial state', () => expect(range(undefined, {})).toEqual([0, 100]));

	it('should return same state', () => expect(
		range([25, 75], { type: 'foo', range: [0, 100] })
	).toEqual([25, 75]));

	it('should return new state', () => expect(
		range([25, 75], { type: actions.SET_RANGE, range: [10, 20] })
	).toEqual([10, 20]));
});
