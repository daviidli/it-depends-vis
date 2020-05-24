import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Slider as AntSlider } from 'antd';
import { clone } from 'ramda';
import Slider from '../../../components/slider/Slider';

const defaultProps = {
	topCount: 20,
	setTopCount: jest.fn()
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<Slider {...props} />);
	return {
		wrapper,
		slider: wrapper.find(AntSlider)
	};
};

describe('Slider component', () => {
	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should call setTopCount on after change', () => {
		const mockSetTopCount = jest.fn();
		const props = clone(defaultProps);
		props.setTopCount = mockSetTopCount;
		const { slider } = setup(props);
		expect(mockSetTopCount).toHaveBeenCalledTimes(0);
		slider.simulate('afterChange', 50);
		expect(mockSetTopCount).toHaveBeenCalledTimes(1);
		expect(mockSetTopCount).toHaveBeenCalledWith(50);
	});
});
