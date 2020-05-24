import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { useHistory } from 'react-router';
import Header from '../../../components/header/Header';

jest.mock('react-router');

const defaultProps = {
	ordering: 'descending',
	setOrdering: jest.fn()
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<Header {...props} />);
	return {
		wrapper,
		button: wrapper.find('.button-container')
	};
};

describe('Header component', () => {
	it('should match snapshot', () => {
		useHistory.mockImplementation(jest.fn());
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should go home on button click', () => {
		const mockPush = jest.fn();
		useHistory.mockImplementation(() => ({ push: mockPush }));
		const { button } = setup();
		expect(mockPush).toHaveBeenCalledTimes(0);
		button.simulate('click');
		expect(mockPush).toHaveBeenCalledTimes(1);
		expect(mockPush).toHaveBeenCalledWith('/');
	});
});
