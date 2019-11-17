import React, { useState, useRef, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import './CommitDropdown.scss';

export interface DropdownProps {
	label: string,
	selectedCommit: string,
	showCommitsAfter: string,
	setSelectedCommit: Function,
	commits: Array<string>,
};

const Dropdown = (props: DropdownProps) => {
	const { label, selectedCommit, showCommitsAfter, setSelectedCommit, commits } = props;

	const [labelWidth, setLabelWidth] = useState(0);
	const inputLabel = useRef<HTMLLabelElement>(null);

	useEffect(() => {
		setLabelWidth(inputLabel.current!.offsetWidth);
	}, []);

	let commitsShown: Array<string>;
	const indexOfStart: number = commits.indexOf(showCommitsAfter);
	if (indexOfStart < 0) {
		commitsShown = commits;
	} else {
		commitsShown = commits.slice(indexOfStart + 1, commits.length);
	}

	return (
		<FormControl variant='outlined' className='dropdown' disabled={!commitsShown.length}>
			<InputLabel ref={inputLabel} id={label} className='label' margin='dense'>
				{ label }
			</InputLabel>
			<Select
				className='select'
				value={selectedCommit}
				onChange={(e) => setSelectedCommit(e.target.value)}
				margin='dense'
				labelId={label}
				labelWidth={labelWidth}
			>
				{ commitsShown.map((commit, i) => (<MenuItem key={commit + i} value={commit}>{ commit }</MenuItem>)) }
			</Select>
		</FormControl>
	);
}

export default Dropdown;
