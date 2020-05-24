import startCommit from '../../reducers/startCommit';
import actions from '../../actions/types.json';

describe('startCommit', () => {
	it('should return initial state', () => expect(startCommit(undefined, {})).toEqual(0));

	it('should return same state', () => expect(
		startCommit(0, { type: 'foo', startCommit: 1 })
	).toEqual(0));

	it('should return new state', () => expect(
		startCommit(0, { type: actions.SET_START_COMMIT, startCommit: 1 })
	).toEqual(1));
});
