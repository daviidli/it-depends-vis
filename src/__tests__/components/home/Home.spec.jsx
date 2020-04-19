import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { useHistory } from 'react-router';
import { Input } from 'antd';
import Home from '../../../components/home/Home';
import onRepoChange from '../../../components/home/onRepoChange';

// jest error: https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation(query => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn()
	}))
});

jest.mock('react-router');
jest.mock('../../../components/home/onRepoChange');

const defaultProps = {
	repo: '',
	setRepo: jest.fn()
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<Home {...props} />);
	return {
		wrapper,
		input: wrapper.find(Input.Search)
	};
};

const setupMount = (props = defaultProps) => {
	const wrapper = mount(<Home {...props} />);
	return { wrapper };
};

describe('Home component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should match snapshot', () => {
		useHistory.mockImplementation(jest.fn());
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should not trigger effect as repo is empty string', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		onRepoChange.mockImplementation(jest.fn());
		setupMount();
		expect(mockPush).toHaveBeenCalledTimes(0);
		setImmediate(() => {
			expect(mockPush).toHaveBeenCalledTimes(0);
			expect(onRepoChange).toHaveBeenCalledTimes(0);
			done();
		});
	});

	it('should trigger effect', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		onRepoChange.mockImplementation(jest.fn());
		setupMount({ repo: 'repo1', setRepo: jest.fn() });
		setImmediate(() => {
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith('/loading');
			expect(onRepoChange).toHaveBeenCalledTimes(1);
			done();
		});
	});

	it('should call setRepo on search', () => {
		useHistory.mockImplementation(jest.fn());
		const mockSetRepo = jest.fn();
		const { input } = setup({ repo: '', setRepo: mockSetRepo });
		input.simulate('search', 'repo1');
		expect(mockSetRepo).toHaveBeenCalledTimes(1);
		expect(mockSetRepo).toHaveBeenCalledWith('repo1');
	});
});
