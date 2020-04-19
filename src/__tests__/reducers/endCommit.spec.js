import endCommit from '../../reducers/endCommit';
import actions from '../../actions/types.json';

describe('endCommit', () => {
	it('should return initial state', () => expect(endCommit(undefined, {})).toEqual(''));

	it('should return same state', () => expect(
		endCommit('commit1', { type: 'foo', endCommit: 'commit2' })
	).toEqual('commit1'));

	it('should return new state', () => expect(
		endCommit('commit1', { type: actions.SET_END_COMMIT, endCommit: 'commit2' })
	).toEqual('commit2'));
});
