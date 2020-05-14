/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import { Spin } from 'antd';
import Header from '../../containers/HeaderContainer';
import D3 from '../../containers/D3Container';
import fetchData from './fetchData';
import routes from '../../constants/routes.json';

const Visualization = ({
	startCommit, endCommit, repo, data, setData
}) => {
	const history = useHistory();
	const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

	useEffect(() => {
		const onError = err => {
			toast.error(err);
			history.push(routes.HOME);
		};

		if (repo.length === 0) {
			history.push(routes.HOME);
		} else {
			fetchData(onError, setData, startCommit, endCommit, repo);
		}
	}, [startCommit, endCommit, setData, repo, history]);

	useEffect(() => {
		const onResize = () => {
			setWindowSize([window.innerWidth, window.innerHeight]);
		};
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	}, []);

	return (
		<Spin spinning={data === null}>
			<Header />
			<D3 width={windowSize[0]} height={windowSize[1]} />
		</Spin>
	);
};

Visualization.propTypes = {
	startCommit: PropTypes.number.isRequired,
	endCommit: PropTypes.number.isRequired,
	repo: PropTypes.string.isRequired,
	setData: PropTypes.func.isRequired,
	data: PropTypes.object
};

Visualization.defaultProps = {
	data: null
};

export default Visualization;
