import React, { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import Dropdown from '../Dropdown/Dropdown';
import clsx from 'clsx';
import { ISettings, IData } from '../../App';
import { SettingsContext, DataContext } from '../../AppContext';
import { Granularity } from '../../data/types/GranularityType';
import { Graph } from '../../data/types/GraphType';

import './Footer.scss';

const Footer = () => {
	const [settings, setSettings] = useContext(SettingsContext);
	const [data, setData] = useContext(DataContext);

	const setGranularity = (type: string) => {
		setSettings((prev: ISettings) => ({...prev, granularity: type}));
	}

	const setGraph = (type: string) => {
		setSettings((prev: ISettings) => ({...prev, graph: type}));
	}

	const setSlider = (e: any, val: number | number[]) => {
		const range = val as number[];
		setData((prev: IData) => ({...prev, percentageLow: range[0], percentageHigh: range[1]}));
	}

	let granularityTypes: string[] = Object.values(Granularity);

	if (settings.graph === Graph.CROSSCUT) {
		granularityTypes = ['Files', 'Functions'];
	}

	const graphTypes: string[] = Object.values(Graph);
	const isWide: boolean = window.innerWidth > 550;

	return (
		<Grid
			className='footer'
			container
			spacing={0}
			justify='space-between'
			direction='row-reverse'
		>
			<Grid item xs={12} sm={3} className='sliderContainer'>
				<div className='sliderLabel'>Percentage Range</div>
				<Slider
					className={clsx('slider', { wide: isWide })}
					value={[data.percentageLow, data.percentageHigh]}
					onChange={setSlider}
					valueLabelDisplay='auto'
					aria-labelledby='range-slider'
					getAriaValueText={() => data.percentageLow + '-' + data.percentageHigh}
					disabled={settings.graph === Graph.DEPENDENCY}
					color='secondary'
				/>
			</Grid>
			<Grid item xs={6} sm={4}>
				<Dropdown
					className={clsx({ wide: isWide })}
					selectedValue={settings.graph}
					label='Type of Graph'
					disabled={false}
					setSelectedValue={setGraph}
					values={graphTypes}
				/>
			</Grid>
			<Grid item xs={6} sm={4}>
				<Dropdown
					className={clsx({ wide: isWide })}
					selectedValue={settings.granularity}
					label='Granularity'
					disabled={false}
					setSelectedValue={setGranularity}
					values={granularityTypes}
				/>
			</Grid>
		</Grid>
	);
};

export default Footer;