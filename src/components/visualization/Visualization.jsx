/* eslint-disable react/require-default-props */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Spin } from 'antd';
import Header from '../header/Header';
import D3 from '../../containers/D3Container';
import fetchData from './fetchData';
import routes from '../../constants/routes.json';

const Visualization = ({
	startCommit, endCommit, repo, data, setData
}) => {
	const history = useHistory();

	useEffect(() => {
		const onError = err => {
			toast.error(err);
			history.push(routes.HOME);
		};

		fetchData(onError, setData, startCommit, endCommit, repo);
	}, [startCommit, endCommit, setData, repo, history]);

	return (
		<Spin spinning={data === null}>
			<Header />
			<D3 />
		</Spin>
	);
};

Visualization.propTypes = {
	startCommit: PropTypes.number.isRequired,
	endCommit: PropTypes.number.isRequired,
	repo: PropTypes.string.isRequired,
	setRepo: PropTypes.func.isRequired,
	setData: PropTypes.func.isRequired,
	data: PropTypes.object
};

export default Visualization;
