import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from '../../containers/App';

const setup = props => {
	const wrapper = shallow(<App {...props} />);
	return { wrapper };
};

describe('App component', () => {
	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should match snapshot with children', () => {
		const { wrapper } = setup({ children: <div /> });
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
