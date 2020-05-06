import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
	Row, Typography, Input, Space, Drawer
} from 'antd';
import { GoRepo } from 'react-icons/go';
import { GiThink } from 'react-icons/gi';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { length } from 'ramda';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import fetchCommits from './fetchCommits';
import routes from '../../constants/routes.json';
import ContentContainer from '../contentContainer/ContentContainer';
import description from '../../constants/description.json';

import './Home.scss';

const Home = ({
	setRepo, setCommits, setStartCommit, setEndCommit
}) => {
	const history = useHistory();
	const [drawer, toggleDrawer] = useState(false);

	const onError = err => {
		toast.error(err);
		setRepo('');
	};

	const onComplete = c => {
		setCommits(c);
		setStartCommit(0);
		setEndCommit(length(c) - 1);
		history.push(routes.VIS);
	};

	const onSearch = repo => {
		fetchCommits(onError, onComplete, repo);
		setRepo(repo);
	};

	return (
		<>
			<ContentContainer className="home" align="middle">
				<Space direction="vertical" size="large" className="space">
					<Row justify="center">
						<div className="iconContainer">
							<GiThink size={128} color="#fff" />
						</div>
					</Row>
					<Row justify="center">
						<Typography.Title className="title">
							It Depends
						</Typography.Title>
					</Row>
					<Row justify="center">
						<Input.Search
							className="repoInput"
							size="large"
							placeholder="Repository"
							prefix={
								<GoRepo color="grey" className="repoIcon" />
							}
							onSearch={onSearch}
							enterButton="Search"
						/>
					</Row>
					<Row justify="center" className="question-container">
						<div
							className="question"
							onClick={() => toggleDrawer(!drawer)}
						>
							<AiOutlineQuestionCircle size="1.5em" />
						</div>
					</Row>
				</Space>
			</ContentContainer>
			<Drawer
				className="drawer"
				placement="bottom"
				closable
				height="85%"
				onClose={() => toggleDrawer(false)}
				visible={drawer}
			>
				<ContentContainer className="drawer-content">
					<h1>About</h1>
					<p>{ description.about }</p>
				</ContentContainer>
			</Drawer>
		</>
	);
};

Home.propTypes = {
	setRepo: PropTypes.func.isRequired,
	setCommits: PropTypes.func.isRequired,
	setStartCommit: PropTypes.func.isRequired,
	setEndCommit: PropTypes.func.isRequired
};

export default Home;
