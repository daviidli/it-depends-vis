import axios from 'axios';
import fetchCommits, { getCommitsFromResponse, commits } from '../../../components/home/fetchCommits';
import { expectResolve, expectReject } from '../../testUtils';

jest.mock('axios');
jest.mock('react-toastify');

describe('getCommitsFromResponse', () => {
	it('should get commits from response object', () => {
		const input = {
			data: {
				commits: [1, 2],
				a: 0
			},
			b: 0
		};
		expect(getCommitsFromResponse(input)).toEqual([1, 2]);
	});

	it('should get [] from empty response object', () => {
		expect(getCommitsFromResponse({})).toEqual([]);
	});

	it('should get [] from partial response object', () => {
		const input = {
			data: {
				a: 0,
				b: 1
			}
		};
		expect(getCommitsFromResponse(input)).toEqual([]);
	});
});

describe('commits', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should get commits from request', done => {
		axios.put.mockImplementation(jest.fn(() => Promise.resolve({ data: { commits: [1, 2, 3] } })));
		expectResolve(commits('url'), x => {
			expect(x).toEqual([1, 2, 3]);
			expect(axios.put).toHaveBeenCalledTimes(1);
			expect(axios.put).toHaveBeenCalledWith('url');
			done();
		});
	});

	it('should fail to get commits from request', done => {
		axios.put.mockImplementation(jest.fn(() => Promise.reject(new Error('oh no'))));
		expectReject(commits('url'), x => {
			expect(x).toEqual('oh no');
			expect(axios.put).toHaveBeenCalledTimes(1);
			expect(axios.put).toHaveBeenCalledWith('url');
			done();
		});
	});
});

describe('fetchCommits', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should call onComplete with commits', done => {
		axios.put.mockImplementation(jest.fn(() => Promise.resolve({ data: { commits: [1, 2, 3] } })));
		const onComplete = jest.fn();
		const onError = jest.fn();
		fetchCommits(onError, onComplete, 'repo1');
		setImmediate(() => {
			expect(axios.put).toHaveBeenCalledTimes(1);
			expect(axios.put).toHaveBeenCalledWith('https://itdepends.herokuapp.com/init?url=repo1');
			expect(onComplete).toHaveBeenCalledTimes(1);
			expect(onComplete).toHaveBeenCalledWith([1, 2, 3]);
			expect(onError).toHaveBeenCalledTimes(0);
			done();
		});
	});

	it('should call onError with error message', done => {
		axios.put.mockImplementation(jest.fn(() => Promise.reject(new Error('some error message'))));
		const onComplete = jest.fn();
		const onError = jest.fn();
		fetchCommits(onError, onComplete, 'repo1');
		setImmediate(() => {
			expect(axios.put).toHaveBeenCalledTimes(1);
			expect(axios.put).toHaveBeenCalledWith('https://itdepends.herokuapp.com/init?url=repo1');
			expect(onError).toHaveBeenCalledTimes(1);
			expect(onError).toHaveBeenCalledWith('some error message');
			expect(onComplete).toHaveBeenCalledTimes(0);
			done();
		});
	});
});
