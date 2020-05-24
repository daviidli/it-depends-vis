import endCommit from '../../reducers/endCommit';
import actions from '../../actions/types.json';

describe('endCommit', () => {
	it('should return initial state', () => expect(endCommit(undefined, {})).toEqual(0));

	it('should return same state', () => expect(
		endCommit(0, { type: 'foo', endCommit: 1 })
	).toEqual(0));

	it('should return new state', () => expect(
		endCommit(0, { type: actions.SET_END_COMMIT, endCommit: 1 })
	).toEqual(1));
});
