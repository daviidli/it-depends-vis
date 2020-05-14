/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
import { fork, map, mapRej } from 'fluture/index';
import { pipe, prop } from 'ramda';
import { axiosGet } from '../../utils/utils';

export const fileMappings = pipe(axiosGet, map(prop('data')), mapRej(prop('message')));

const fetchData = (onError, onComplete, startCommit, endCommit, repo) => {
	fork
		(onError)
		(onComplete)
		(fileMappings(`http://localhost:8080/crosscut/file?start=${startCommit}&end=${endCommit}&url=${repo}`));
};

export default fetchData;
