/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
import { fork, map, mapRej } from 'fluture/index';
import { pipe, prop } from 'ramda';
import { axiosGet } from '../../utils/utils';
import url from '../../constants/url';

export const fileMappings = pipe(axiosGet, map(prop('data')), mapRej(prop('message')));

const fetchData = (onError, onComplete, startCommit, endCommit, repo) => {
	fork
		(onError)
		(onComplete)
		(fileMappings(`${url}/crosscut/file?start=${startCommit}&end=${endCommit}&url=${repo}`));
};

export default fetchData;
