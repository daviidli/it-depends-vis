import axios from 'axios';
import fetchData, { fileMappings } from '../../../components/visualization/fetchData';
import { expectResolve, expectReject } from '../../testUtils';

jest.mock('axios');

describe('fileMappings', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should get file mappings from request', done => {
		axios.get.mockImplementation(jest.fn(() => Promise.resolve({ data: 123 })));
		expectResolve(fileMappings('url'), x => {
			expect(x).toEqual(123);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith('url');
			done();
		});
	});

	it('should fail to get file mappings from request', done => {
		axios.get.mockImplementation(jest.fn(() => Promise.reject(new Error('oh no'))));
		expectReject(fileMappings('url'), x => {
			expect(x).toEqual('oh no');
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith('url');
			done();
		});
	});
});

describe('fetchCommits', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should call onComplete with commits', done => {
		axios.get.mockImplementation(jest.fn(() => Promise.resolve({ data: { foo: 'bar', bar: 'foo' } })));
		const onComplete = jest.fn();
		const onError = jest.fn();
		fetchData(onError, onComplete, 0, 3, 'repo1');
		setImmediate(() => {
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith('https://itdepends.herokuapp.com/crosscut/file?start=0&end=3&url=repo1');
			expect(onComplete).toHaveBeenCalledTimes(1);
			expect(onComplete).toHaveBeenCalledWith({ foo: 'bar', bar: 'foo' });
			expect(onError).toHaveBeenCalledTimes(0);
			done();
		});
	});

	it('should call onError with error message', done => {
		axios.get.mockImplementation(jest.fn(() => Promise.reject(new Error('some error message'))));
		const onComplete = jest.fn();
		const onError = jest.fn();
		fetchData(onError, onComplete, 0, 3, 'repo1');
		setImmediate(() => {
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith('https://itdepends.herokuapp.com/crosscut/file?start=0&end=3&url=repo1');
			expect(onError).toHaveBeenCalledTimes(1);
			expect(onError).toHaveBeenCalledWith('some error message');
			expect(onComplete).toHaveBeenCalledTimes(0);
			done();
		});
	});
});
