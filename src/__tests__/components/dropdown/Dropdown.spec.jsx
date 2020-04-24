import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dropdown from '../../../components/dropdown/Dropdown';

const defaultProps = {
	icon: <div />,
	startCommit: 0,
	endCommit: 6,
	setStartCommit: jest.fn(),
	setEndCommit: jest.fn(),
	commits: ['a', 'b', 'c', 'd', 'e', 'f']
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<Dropdown {...props} />);
	return { wrapper };
};

describe('Dropdown component', () => {
	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
