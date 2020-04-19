import repo from '../../reducers/repo';
import actions from '../../actions/types.json';

describe('repo', () => {
	it('should return initial state', () => expect(repo(undefined, {})).toEqual(''));

	it('should return same state', () => expect(
		repo('repo1', { type: 'foo', repo: 'repo2' })
	).toEqual('repo1'));

	it('should return new state', () => expect(
		repo('repo1', { type: actions.SET_REPO, repo: 'repo2' })
	).toEqual('repo2'));
});
