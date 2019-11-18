import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Dropdown from '../Dropdown/Dropdown';
import clsx from 'clsx';

import './Footer.scss';

const Footer = () => {
	const [selectedType, setType] = useState<string>('');
	const [value, setValue] = useState<number[]>([0, 100]);

	const types: Array<string> = ['Files', 'Classes', 'Functions'];

	return (
		<Grid 
			className='footer'
			container
			spacing={0}
			justify='space-between'
		>
			<Grid item xs={12} sm={5}>
				<Dropdown
					className={clsx({ wide: window.innerWidth > 550})}
					selectedValue={selectedType}
					label='Granularity'
					disabled={false}
					setSelectedValue={setType}
					values={types}
				/>
			</Grid>
			<Grid item xs={12} sm={1}></Grid>
			<Grid item xs={12} sm={3}>
				<div className='sliderLabel'>Percentage Range</div>
				<Slider
					className='slider'
					value={value}
					onChange={(e: any, newVal: number | number[]) => setValue(newVal as number[])}
					valueLabelDisplay='auto'
					aria-labelledby='range-slider'
					getAriaValueText={() => value[0] + '-' + value[1]}
				/>
			</Grid>
		</Grid>
	);
};

export default Footer;