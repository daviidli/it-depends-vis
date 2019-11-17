import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Dropdown from '../Dropdown/Dropdown';
import { HelpModalContext } from '../Modal/HelpModalContext';

import './Header.scss';

const Header = () => {
	const [repo, setRepo] = useState('');
	const [commits, setCommits] = useState([] as string[]);
	const [selectedCommits, setSelectedCommits] = useState({ start: '', end: '' });
	const setOpen: Function = useContext(HelpModalContext)[1];

	const sendRequest = () => {
		// TODO
		console.log(repo);
		setCommits([
			'commit #1',
			'commit #2',
			'commit #3',
			'commit #4',
			'commit #5',
			'commit #6',
			'commit #7',
			'commit #8',
			'commit #9',
			'commit #10'
		]);
	};

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			sendRequest();
		}
	};

	const setStartCommit = (commit: string) => {
		setSelectedCommits(prev => ({ ...prev, start: commit }));
	};

	const setEndCommit = (commit: string) => {
		setSelectedCommits(prev => ({ ...prev, end: commit }));
	};

	const showHelp = () => {
		setOpen(true);
	};

	return (
		<div className='headerContainer'>
			<Grid
				container
				className='repoContainer'
				spacing={1}
				justify='space-evenly'
			>
				<Grid item xs={12}>
					<span className='heading'>IT DEPENDS</span>
					<IconButton className='help' aria-label='help' onClick={showHelp}>
						<HelpOutlineIcon />
					</IconButton>
				</Grid>
				<Grid item xs={10} sm={11} md={4}>
					<TextField
						label='Repository'
						type='search'
						variant='outlined'
						margin='dense'
						fullWidth={true}
						value={repo}
						onChange={(e) => setRepo(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</Grid>
				<Grid item xs={2} sm={1} md={1}>
					<Button
						id='repoSend'
						variant='contained'
						color='secondary'
						onClick={() => sendRequest()}
					>
						>
					</Button>
				</Grid>
				<Grid item xs={12} sm={12} md={3}></Grid>
				<Grid item xs={6} sm={6} md={2}>
					<Dropdown
						label='Start Commit'
						selectedCommit={selectedCommits.start}
						showCommitsAfter={''}
						setSelectedCommit={setStartCommit}
						commits={commits}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<Dropdown
						label='End Commit'
						selectedCommit={selectedCommits.end}
						showCommitsAfter={selectedCommits.start}
						setSelectedCommit={setEndCommit}
						commits={commits}
					/>
				</Grid>
			</Grid>
		</div>
		
	);
}

export default Header;