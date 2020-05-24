import axios from 'axios';
import { isFuture } from 'fluture/index';
import {
	splitData,
	renameKey,
	futureFromP,
	axiosPut,
	axiosGet
} from '../../utils/utils';
import { expectResolve, expectReject } from '../testUtils';

jest.mock('axios');

describe('renameKey', () => {
	it('renameKey should rename specified key', () => expect(renameKey('foo', 'bar', { foo: 'bar' })).toEqual({ bar: 'bar' }));

	it("renameKey should do nothing if key doesn't exist", () => expect(renameKey('bar', 'bar', { foo: 'bar' })).toEqual({ foo: 'bar' }));

	it('renameKey should do nothing on empty object', () => expect(renameKey('foo', 'bar', {})).toEqual({}));
});

describe('splitData', () => {
	it('splitData should split object into files, mappings and sizes', () => {
		const input = {
			data: {
				names: ['file1', 'file2'],
				data: [[1, 2], [1, 2]],
				size: [1, 2]
			}
		};
		const expected = {
			files: ['file1', 'file2'],
			mappings: [[1, 2], [1, 2]],
			sizes: [1, 2]
		};
		expect(splitData(input)).toEqual(expected);
	});

	it('splitData should do nothing on object with no data field', () => {
		const input = { foo: 'bar' };
		expect(splitData(input)).toEqual({ foo: 'bar' });
	});
});

describe('flutureFromP', () => {
	it('should produce Future and resolve', done => {
		const f = () => Promise.resolve(1);
		const future = futureFromP(f);
		expect(isFuture(future)).toEqual(true);
		expectResolve(future, x => {
			expect(x).toEqual(1);
			done();
		});
	});

	it('should produce Future and reject', done => {
		const f = () => Promise.reject(new Error('oh no'));
		const future = futureFromP(f);
		expect(isFuture(future)).toEqual(true);
		expectReject(future, x => {
			expect(x.message).toEqual('oh no');
			done();
		});
	});
});

describe('axiosPut', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should encase axios.put in a Future and resolve', () => {
		axios.put.mockImplementation(jest.fn(() => Promise.resolve(1)));
		const future = axiosPut('url');
		expect(isFuture(future)).toEqual(true);
		expect(axios.put).toHaveBeenCalledTimes(0);
		expectResolve(future, x => {
			expect(x).toEqual(1);
			expect(axios.put).toHaveBeenCalledTimes(1);
			expect(axios.put).toHaveBeenCalledWith('url');
		});
	});

	it('should encase axios.put in a Future and reject', () => {
		axios.put.mockImplementation(jest.fn(() => Promise.reject(new Error('oh no'))));
		const future = axiosPut('url');
		expect(isFuture(future)).toEqual(true);
		expect(axios.put).toHaveBeenCalledTimes(0);
		expectReject(future, x => {
			expect(x.message).toEqual('oh no');
			expect(axios.put).toHaveBeenCalledTimes(1);
			expect(axios.put).toHaveBeenCalledWith('url');
		});
	});
});

describe('axiosGet', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should encase axios.get in a Future and resolve', () => {
		axios.get.mockImplementation(jest.fn(() => Promise.resolve(1)));
		const future = axiosGet('url');
		expect(isFuture(future)).toEqual(true);
		expect(axios.get).toHaveBeenCalledTimes(0);
		expectResolve(future, x => {
			expect(x).toEqual(1);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith('url');
		});
	});

	it('should encase axios.get in a Future and reject', () => {
		axios.get.mockImplementation(jest.fn(() => Promise.reject(new Error('oh no'))));
		const future = axiosGet('url');
		expect(isFuture(future)).toEqual(true);
		expect(axios.get).toHaveBeenCalledTimes(0);
		expectReject(future, x => {
			expect(x.message).toEqual('oh no');
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(axios.get).toHaveBeenCalledWith('url');
		});
	});
});
