import React from 'react';
import PropTypes from 'prop-types';
import { Row, Typography, Input } from 'antd';
import { GoRepo } from 'react-icons/go';
import { GiThink } from 'react-icons/gi';
import { length } from 'ramda';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import description from '../../constants/description.json';
import fetchCommits from './fetchCommits';
import routes from '../../constants/routes.json';

import './Home.scss';

const Home = ({
	setRepo, setCommits, setStartCommit, setEndCommit
}) => {
	const history = useHistory();

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
			<Row justify="center">
				<div className="iconContainer">
					<GiThink size={128} color="#fff" />
				</div>
			</Row>
			<Row justify="center">
				<Typography.Title>it depends</Typography.Title>
			</Row>
			<Row justify="center">
				<Input.Search
					className="repoInput"
					size="large"
					placeholder="Repository"
					prefix={
						<GoRepo size={24} color="grey" className="repoIcon" />
					}
					onSearch={onSearch}
				/>
			</Row>
			<Row justify="center">
				<Typography.Title level={2}>About</Typography.Title>
			</Row>
			<Row justify="center">
				<div className="about">
					<Typography.Text>{ description.about }</Typography.Text>
				</div>
			</Row>
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
