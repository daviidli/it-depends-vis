import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Visualization from '../../../components/visualization/Visualization';

const setup = () => {
	const wrapper = shallow(<Visualization />);
	return { wrapper };
};

describe('Visualization component', () => {
	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
