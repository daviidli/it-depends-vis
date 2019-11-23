import React, { useState, useRef, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import clsx from 'clsx';

import './Dropdown.scss';

export interface DropdownProps<T> {
	selectedValue: T,
	label: string,
	disabled: boolean,
	setSelectedValue: Function,
	values: Array<T>,
	className?: string
};

const Dropdown = (props: DropdownProps<string>) => {
	const { selectedValue, label, disabled, setSelectedValue, values, className } = props;

	const [labelWidth, setLabelWidth] = useState(0);
	const inputLabel = useRef<HTMLLabelElement>(null);

	useEffect(() => {
		setLabelWidth(inputLabel.current!.offsetWidth);
	}, []);

	return (
		<FormControl variant='outlined' className={clsx('dropdown', className)} disabled={disabled}>
			<InputLabel ref={inputLabel} id={label} className='label' margin='dense' color='secondary'>
				{ label }
			</InputLabel>
			<Select
				className='select'
				value={selectedValue}
				onChange={(e) => setSelectedValue(e.target.value)}
				margin='dense'
				labelId={label}
				labelWidth={labelWidth}
				color='secondary'
			>
				{ values.map((val, i) => (<MenuItem key={val + i} value={val}>{ val }</MenuItem>)) }
			</Select>
		</FormControl>
	);
}

export default Dropdown;
