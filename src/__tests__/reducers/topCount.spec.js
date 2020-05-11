import topCount from '../../reducers/topCount';
import actions from '../../actions/types.json';

describe('topCount', () => {
	it('should return initial state', () => expect(topCount(undefined, {})).toEqual(20));

	it('should return same state', () => expect(
		topCount(20, { type: 'foo', topCount: 30 })
	).toEqual(20));

	it('should return new state', () => expect(
		topCount(20, { type: actions.SET_TOP_COUNT, topCount: 30 })
	).toEqual(30));
});
