import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dropdown from '../Dropdown/Dropdown';

import './Header.scss';

const Header = () => {
	const [repo, setRepo] = useState('');
	const [commits, setCommits] = useState([] as string[]);
	const [selectedCommits, setSelectedCommits] = useState({ start: '', end: '' });

	const doSomething = () => {
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
			doSomething();
		}
	};

	const setStartCommit = (commit: string) => {
		setSelectedCommits(prev => ({ ...prev, start: commit }));
	};

	const setEndCommit = (commit: string) => {
		setSelectedCommits(prev => ({ ...prev, end: commit }));
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
					<span className='heading'>IT-DEPENDS</span>
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
						onClick={() => doSomething()}
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