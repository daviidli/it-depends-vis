import startCommit from '../../reducers/startCommit';
import actions from '../../actions/types.json';

describe('startCommit', () => {
	it('should return initial state', () => expect(startCommit(undefined, {})).toEqual(''));

	it('should return same state', () => expect(
		startCommit('commit1', { type: 'foo', startCommit: 'commit2' })
	).toEqual('commit1'));

	it('should return new state', () => expect(
		startCommit('commit1', { type: actions.SET_START_COMMIT, startCommit: 'commit2' })
	).toEqual('commit2'));
});
