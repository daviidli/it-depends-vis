import {
	getState, getStateThunk, dispatch, dispatchThunk, splitData, renameKey
} from '../../utils/reduxUtils';

describe('getState and getStateThunk', () => {
	it('should call getState from passed in store', () => {
		const mockGetState = jest.fn();
		const store = { getState: mockGetState };
		getState(store);
		expect(mockGetState).toHaveBeenCalledTimes(1);
	});

	it('should return function for getState', () => {
		const mockGetState = jest.fn();
		const store = { getState: mockGetState };
		const thunk = getStateThunk(store);
		expect(mockGetState).toHaveBeenCalledTimes(0);
		thunk();
		expect(mockGetState).toHaveBeenCalledTimes(1);
	});
});

describe('dispatch and dispatchThunk', () => {
	it('should call dispatch from passed in store', () => {
		const mockDispatch = jest.fn();
		const store = { dispatch: mockDispatch };
		const dispatchValue = { type: 'event', data: 'data' };
		dispatch(store)(dispatchValue);
		expect(mockDispatch).toHaveBeenCalledTimes(1);
		expect(mockDispatch).toHaveBeenCalledWith(dispatchValue);
	});

	it('should return function for dispatch', () => {
		const mockDispatch = jest.fn();
		const store = { dispatch: mockDispatch };
		const dispatchValue = { type: 'event', data: 'data' };
		const thunk = dispatchThunk(store)(dispatchValue);
		expect(mockDispatch).toHaveBeenCalledTimes(0);
		thunk();
		expect(mockDispatch).toHaveBeenCalledTimes(1);
		expect(mockDispatch).toHaveBeenCalledWith(dispatchValue);
	});
});

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
