/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
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
import ReactMarkdown from 'react-markdown';
import fetchCommits from './fetchCommits';
import routes from '../../constants/routes.json';
import ContentContainer from '../contentContainer/ContentContainer';
import about from '../../constants/about.md';

import './Home.scss';

export const checkURL = url => {
	const pattern = /^(https:\/\/|http:\/\/)?(www.)?github\.com\/.+\/.+/g;
	return !!pattern.test(url);
};

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
		if (!checkURL(repo)) {
			toast.error('Invalid Github URL');
			return;
		}

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
							placeholder="Github Repository"
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
					<ReactMarkdown source={about} transformImageUri={uri => require(`../../constants/img/${uri}`)} />
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
