import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Dropdown from '../../../components/dropdown/Dropdown';

const defaultProps = {
	icon: <div />,
	startCommit: 'a',
	endCommit: 'f',
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
