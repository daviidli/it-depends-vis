import commits from '../../reducers/commits';
import actions from '../../actions/types.json';

describe('commits', () => {
	it('should return initial state', () => expect(commits(undefined, {})).toEqual([]));

	it('should return same state', () => expect(
		commits(['commit1', 'commit2'], { type: 'foo', commits: [] })
	).toEqual(['commit1', 'commit2']));

	it('should return new state', () => expect(
		commits(['commit1', 'commit2'], { type: actions.SET_COMMITS, commits: ['commit3'] })
	).toEqual(['commit3']));
});
