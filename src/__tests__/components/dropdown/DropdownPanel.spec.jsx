import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Select } from 'antd';
import { clone } from 'ramda';
import DropdownPanel from '../../../components/dropdown/DropdownPanel';

const defaultProps = {
	startCommit: 0,
	endCommit: 5,
	setStartCommit: jest.fn(),
	setEndCommit: jest.fn(),
	commits: ['a', 'b', 'c', 'd', 'e', 'f']
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<DropdownPanel {...props} />);
	return {
		wrapper,
		select: wrapper.find(Select)
	};
};

describe('DropdownPanel component', () => {
	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should match snapshot with correct options', () => {
		const props = clone(defaultProps);
		props.startCommit = 1;
		props.endCommit = 3;
		const { wrapper } = setup(props);
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should call setStartCommit on select', () => {
		const mockSetStartCommit = jest.fn();
		const props = clone(defaultProps);
		props.setStartCommit = mockSetStartCommit;
		const { select } = setup(props);
		select.at(0).simulate('select', 'b');
		expect(mockSetStartCommit).toHaveBeenCalledTimes(1);
		expect(mockSetStartCommit).toHaveBeenCalledWith(1);
	});

	it('should call setEndCommit on select', () => {
		const mockSetEndCommit = jest.fn();
		const props = clone(defaultProps);
		props.setEndCommit = mockSetEndCommit;
		const { select } = setup(props);
		select.at(1).simulate('select', 'd');
		expect(mockSetEndCommit).toHaveBeenCalledTimes(1);
		expect(mockSetEndCommit).toHaveBeenCalledWith(3);
	});
});
