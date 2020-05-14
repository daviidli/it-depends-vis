import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { useHistory } from 'react-router';
import { Input } from 'antd';
import axios from 'axios';
import { toast } from 'react-toastify';
import Home, { checkURL } from '../../../components/home/Home';

jest.mock('react-router');
jest.mock('axios');
jest.mock('react-toastify');

const defaultProps = {
	setRepo: jest.fn(),
	setCommits: jest.fn(),
	setStartCommit: jest.fn(),
	setEndCommit: jest.fn()
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<Home {...props} />);
	return {
		wrapper,
		input: wrapper.find(Input.Search)
	};
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

	it('should update store on search complete', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		axios.put.mockImplementation(jest.fn(() => Promise.resolve({ data: { commits: [1, 2, 3] } })));
		toast.error.mockImplementation(jest.fn());
		const { input } = setup();
		input.simulate('search', 'https://github.com/user/repo1');
		setImmediate(() => {
			expect(mockPush).toHaveBeenCalledTimes(1);
			expect(mockPush).toHaveBeenCalledWith('/vis');
			expect(defaultProps.setCommits).toHaveBeenCalledTimes(1);
			expect(defaultProps.setCommits).toHaveBeenCalledWith([1, 2, 3]);
			expect(defaultProps.setStartCommit).toHaveBeenCalledTimes(1);
			expect(defaultProps.setStartCommit).toHaveBeenCalledWith(0);
			expect(defaultProps.setEndCommit).toHaveBeenCalledTimes(1);
			expect(defaultProps.setEndCommit).toHaveBeenCalledWith(2);
			done();
		});
	});

	it('should toast error message on search error', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		axios.put.mockImplementation(jest.fn(() => Promise.reject(new Error('oh no'))));
		toast.error.mockImplementation(jest.fn());
		const { input } = setup();
		input.simulate('search', 'https://github.com/user/repo1');
		setImmediate(() => {
			expect(mockPush).toHaveBeenCalledTimes(0);
			expect(defaultProps.setCommits).toHaveBeenCalledTimes(0);
			expect(defaultProps.setStartCommit).toHaveBeenCalledTimes(0);
			expect(defaultProps.setEndCommit).toHaveBeenCalledTimes(0);
			expect(defaultProps.setRepo).toHaveBeenCalledTimes(2);
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith('oh no');
			done();
		});
	});

	it('should toast error message on invalid url', done => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		axios.put.mockImplementation(jest.fn());
		toast.error.mockImplementation(jest.fn());
		const { input } = setup();
		input.simulate('search', 'https://notGithub.com/user/repo1');
		setImmediate(() => {
			expect(mockPush).toHaveBeenCalledTimes(0);
			expect(defaultProps.setCommits).toHaveBeenCalledTimes(0);
			expect(defaultProps.setStartCommit).toHaveBeenCalledTimes(0);
			expect(defaultProps.setEndCommit).toHaveBeenCalledTimes(0);
			expect(defaultProps.setRepo).toHaveBeenCalledTimes(0);
			expect(toast.error).toHaveBeenCalledTimes(1);
			expect(toast.error).toHaveBeenCalledWith('Invalid Github URL');
			done();
		});
	});
});

describe('checkURL', () => {
	it('should return true for valid URL', () => {
		const urls = [
			'github.com/u/r',
			'github.com/u_a/r_a',
			'github.com/u-a/r-a',
			'www.github.com/u/r',
			'http://github.com/u/r',
			'https://github.com/u/r',
			'http://www.github.com/u/r',
			'https://www.github.com/u/r',
			'github.com/u/r/as'
		];

		urls.forEach(url => expect(checkURL(url)).toBeTruthy());
	});

	it('should return false for invalid URL', () => {
		const urls = [
			'githu.com/u/r',
			'ww.github.com/u/r',
			'http:/github.com/u/r',
			'https:/github.com/u/r',
			'https://www.github.com/u/'
		];

		urls.forEach(url => expect(checkURL(url)).toBeFalsy());
	});
});
