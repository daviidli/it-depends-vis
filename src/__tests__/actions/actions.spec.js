import {
	setRepo, setData, setCommits, setStartCommit, setEndCommit, setTopCount, setOrdering
} from '../../actions/actions';

describe('actions', () => {
	it('should create setRepo action', () => expect(setRepo('github.com/somerepo')).toMatchSnapshot());

	it('should create setData action', () => expect(setData({ data: 'someData' })).toMatchSnapshot());

	it('should create setCommits action', () => expect(setCommits(['commit1', 'commit2'])).toMatchSnapshot());

	it('should create setStartCommit action', () => expect(setStartCommit('firstCommit')).toMatchSnapshot());

	it('should create setEndCommit action', () => expect(setEndCommit('lastCommit')).toMatchSnapshot());

	it('should create setTopCount action', () => expect(setTopCount(10)).toMatchSnapshot());

	it('should create setOrdering action', () => expect(setOrdering('ascending')).toMatchSnapshot());
});
