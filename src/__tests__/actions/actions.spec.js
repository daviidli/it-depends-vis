import {
	setError, setRepo, setData, setSelectedFile, setRange, setCommits, setStartCommit, setEndCommit
} from '../../actions/actions';

describe('actions', () => {
	it('should create setRepo action', () => expect(setRepo('github.com/somerepo')).toMatchSnapshot());

	it('should create setData action', () => expect(setData({ data: 'someData' })).toMatchSnapshot());

	it('should create setSelectedFile action', () => expect(setSelectedFile('file1')).toMatchSnapshot());

	it('should create setRange action', () => expect(setRange([0, 100])).toMatchSnapshot());

	it('should create setCommits action', () => expect(setCommits(['commit1', 'commit2'])).toMatchSnapshot());

	it('should create setStartCommit action', () => expect(setStartCommit('firstCommit')).toMatchSnapshot());

	it('should create setEndCommit action', () => expect(setEndCommit('lastCommit')).toMatchSnapshot());
});
