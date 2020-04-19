import React from 'react';
import PropTypes from 'prop-types';
import { Slider as AntSlider } from 'antd';

import './Slider.scss';

const Slider = ({ range, setRange }) => (
	<AntSlider
		className="slider"
		marks={{ 0: '0%', 100: '100%' }}
		range
		defaultValue={range}
		onAfterChange={setRange}
	/>
);

Slider.propTypes = {
	range: PropTypes.arrayOf(PropTypes.number).isRequired,
	setRange: PropTypes.func.isRequired
};

export default Slider;
