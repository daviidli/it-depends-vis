import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './Header.scss';

const Header: React.FC = () => {
	const [repo, setRepo] = useState('');

	const handleKeyDown = (e: any) => {
		if (e.key === 'Enter') {
			console.log(repo);
			return;
		}
	};

	return (
		<div className='headerContainer'>
			<Grid
				container
				className='repoContainer'
				spacing={0}
				justify='flex-start'
			>
				<Grid item xs={10} sm={11} md={4}>
					<TextField
						label='Repository'
						type='search'
						variant='outlined'
						fullWidth={true}
						value={repo}
						onChange={(e) => setRepo(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</Grid>
				<Grid item xs={2} sm={1} md={1}>
					<Button
						id='repoSend'
						variant="contained"
						color="secondary"
					>
						>
					</Button>
				</Grid>
			</Grid>
		</div>
		
	);
}

export default Header;