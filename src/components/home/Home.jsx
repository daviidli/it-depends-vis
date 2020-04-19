import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Row, Typography, Input } from 'antd';
import { GoRepo } from 'react-icons/go';
import { GiThink } from 'react-icons/gi';
import { ifElse, equals, identity } from 'ramda';
import { useHistory } from 'react-router';
import description from '../../constants/description.json';
import onRepoChange from './onRepoChange';
import routes from '../../constants/routes.json';

import './Home.scss';

const Home = ({ repo, setRepo }) => {
	const history = useHistory();

	useEffect(() => {
		ifElse(
			equals(''),
			identity,
			x => {
				history.push(routes.LOADING);
				onRepoChange(x);
			}
		)(repo);
	}, [repo]);

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
					onSearch={setRepo}
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
	repo: PropTypes.string.isRequired,
	setRepo: PropTypes.func.isRequired
};

export default Home;
