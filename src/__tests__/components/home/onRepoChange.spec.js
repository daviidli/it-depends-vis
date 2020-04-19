import axios from 'axios';
import store from '../../../store/store';
import onRepoChange from '../../../components/home/onRepoChange';

jest.mock('../../../store/store');
jest.mock('axios');

describe('onRepoChange', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should call setData with correct payload', done => {
		store.dispatch.mockImplementation(jest.fn());
		store.getState.mockImplementation(() => ({ repo: 'repo1' }));
		axios.put.mockImplementation(jest.fn().mockImplementation(() => Promise.resolve({ data: 'foo', notData: 'bar' })));

		onRepoChange();
		setImmediate(() => {
			expect(store.dispatch).toHaveBeenCalledTimes(2);
			expect(store.dispatch.mock.calls).toMatchSnapshot();
			done();
		});
	});

	it('should fail and call goHome', done => {
		store.dispatch.mockImplementation(jest.fn());
		store.getState.mockImplementation(() => ({ repo: 'repo1' }));
		axios.put.mockImplementation(jest.fn().mockImplementation(() => Promise.reject(new Error('error'))));

		onRepoChange();
		setImmediate(() => {
			expect(store.dispatch).toHaveBeenCalledTimes(3);
			expect(store.dispatch.mock.calls).toMatchSnapshot();
			done();
		});
	});
});
