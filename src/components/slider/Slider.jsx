import React from 'react';
import PropTypes from 'prop-types';
import { Slider as AntSlider } from 'antd';
import './Slider.scss';

const Slider = ({ topCount, setTopCount }) => (
	<AntSlider
		className="slider"
		min={1}
		max={200}
		marks={{
			1: '1',
			20: '20',
			50: '50',
			100: '100',
			200: '200'
		}}
		defaultValue={topCount}
		onAfterChange={setTopCount}
	/>
);

Slider.propTypes = {
	topCount: PropTypes.number.isRequired,
	setTopCount: PropTypes.func.isRequired
};

export default Slider;
