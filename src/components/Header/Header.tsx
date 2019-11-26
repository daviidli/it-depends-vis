import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CommitDropdown from './CommitDropdown';
import { HelpModalContext } from '../Modal/HelpModalContext';
import { ISettings } from '../../App';
import { SettingsContext, DataContext } from '../../AppContext';

import './Header.scss';

const Header = () => {
	const [repo, setRepo] = useState('');
	const setOpen: Function = useContext(HelpModalContext)[1];
	const [settings, setSettings] = useContext(SettingsContext);
	const [data, setData] = useContext(DataContext);

	const saveRepo = () => {
		setSettings((prev: ISettings) => ({...prev, repository: repo, startCommit: '', endCommit: ''}));
		setData((prev: ISettings) => ({...prev, commits: []}));
	};

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			saveRepo();
		}
	};

	const setStartCommit = (commit: string) => {
		setSettings((prev: ISettings) => ({...prev, startCommit: commit}));
	};

	const setEndCommit = (commit: string) => {
		setSettings((prev: ISettings) => ({...prev, endCommit: commit}));
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
						color='secondary'
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
						onClick={() => saveRepo()}
					>
						>
					</Button>
				</Grid>
				<Grid item xs={12} sm={12} md={3}></Grid>
				<Grid item xs={6} sm={6} md={2}>
					<CommitDropdown
						label='Start Commit'
						selectedCommit={settings.startCommit}
						showCommitsAfter={''}
						setSelectedCommit={setStartCommit}
						commits={data.commits}
					/>
				</Grid>
				<Grid item xs={6} sm={6} md={2}>
					<CommitDropdown
						label='End Commit'
						selectedCommit={settings.endCommit}
						showCommitsAfter={settings.startCommit}
						setSelectedCommit={setEndCommit}
						commits={data.commits}
					/>
				</Grid>
			</Grid>
		</div>
	);
}

export default Header;