import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Dropdown from '../Dropdown/Dropdown';
import clsx from 'clsx';
import { ISettings, IData } from '../../App';
import { SettingsContext, DataContext } from '../../AppContext';
import { Granularity } from '../../data/GranularityEnum';

import './Footer.scss';

const Footer = () => {
	const [settings, setSettings] = useContext(SettingsContext);
	const [data, setData] = useContext(DataContext);

	const setType = (type: string) => {
		setSettings((prev: ISettings) => ({...prev, granularity: type}));
	}

	const setSlider = (e: any, val: number | number[]) => {
		const range = val as number[];
		setData((prev: IData) => ({...prev, percentageLow: range[0], percentageHigh: range[1]}));
	}

	const types: string[] = Object.values(Granularity);
	const isWide: boolean = window.innerWidth > 550;

	return (
		<Grid 
			className='footer'
			container
			spacing={0}
			justify='space-between'
		>
			<Grid item xs={12} sm={5}>
				<Dropdown
					className={clsx({ wide: isWide })}
					selectedValue={settings.granularity}
					label='Granularity'
					disabled={false}
					setSelectedValue={setType}
					values={types}
				/>
			</Grid>
			<Grid item xs={12} sm={1}></Grid>
			<Grid item xs={12} sm={3} className='sliderContainer'>
				<div className='sliderLabel'>Percentage Range</div>
				<Slider
					className={clsx('slider', { wide: isWide })}
					value={[data.percentageLow, data.percentageHigh]}
					onChange={setSlider}
					valueLabelDisplay='auto'
					aria-labelledby='range-slider'
					getAriaValueText={() => data.percentageLow + '-' + data.percentageHigh}
				/>
			</Grid>
		</Grid>
	);
};

export default Footer;