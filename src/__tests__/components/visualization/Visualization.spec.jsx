import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { useHistory } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Visualization from '../../../components/visualization/Visualization';

jest.mock('react-router');
jest.mock('axios');
jest.mock('react-toastify');
jest.mock('../../../containers/D3Container', () => () => <div>d3 component</div>);
jest.mock('../../../containers/HeaderContainer', () => () => <div>header</div>);

const defaultProps = {
	startCommit: 0,
	endCommit: 1,
	repo: 'repo1',
	data: null,
	setData: jest.fn()
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<Visualization {...props} />);
	return { wrapper };
};

const setupMount = (props = defaultProps) => {
	const wrapper = mount(<Visualization {...props} />);
	return { wrapper };
};

describe('Visualization component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should run effect and fetch data', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		axios.get.mockImplementation(jest.fn(() => Promise.resolve({ data: 'some data' })));
		toast.error.mockImplementation(jest.fn());
		setupMount();
		setImmediate(() => {
			expect(defaultProps.setData).toHaveBeenCalledTimes(1);
			expect(defaultProps.setData).toHaveBeenCalledWith('some data');
			expect(toast.error).toHaveBeenCalledTimes(0);
			expect(mockPush).toHaveBeenCalledTimes(0);
			done();
		});
	});

	it('should run effect and toast on error', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		axios.get.mockImplementation(jest.fn(() => Promise.reject(new Error('oh no'))));
		toast.error.mockImplementation(jest.fn());
		setupMount();
		setImmediate(() => {
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith('/');
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith('oh no');
			expect(defaultProps.setData).toHaveBeenCalledTimes(0);
			done();
		});
	});

	it('should go back home when repo is not set', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		const props = { ...defaultProps };
		props.repo = '';
		setupMount(props);
		setImmediate(() => {
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith('/');
			expect(toast.error).toHaveBeenCalledTimes(0);
			expect(props.setData).toHaveBeenCalledTimes(0);
			done();
		});
	});
});
