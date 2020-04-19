import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Slider as AntSlider } from 'antd';
import { clone } from 'ramda';
import Slider from '../../../components/slider/Slider';

const defaultProps = {
	range: [0, 100],
	setRange: jest.fn()
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

	it('should call setRange on after change', () => {
		const mockSetRange = jest.fn();
		const props = clone(defaultProps);
		props.setRange = mockSetRange;
		const { slider } = setup(props);
		expect(mockSetRange).toHaveBeenCalledTimes(0);
		slider.simulate('afterChange', [25, 50]);
		expect(mockSetRange).toHaveBeenCalledTimes(1);
		expect(mockSetRange).toHaveBeenCalledWith([25, 50]);
	});
});
