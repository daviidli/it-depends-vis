/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
import { fork, map, mapRej } from 'fluture/index';
import {
	pipe, path, hasPath, ifElse, prop, curry
} from 'ramda';
import { axiosPut } from '../../utils/utils';
import url from '../../constants/url';

export const getCommitsFromResponse = pipe(ifElse(hasPath(['data', 'commits']), path(['data', 'commits']), () => []));

export const commits = pipe(axiosPut, map(getCommitsFromResponse), mapRej(prop('message')));

const fetchCommits = curry((onError, onComplete, repo) => {
	fork
		(onError)
		(onComplete)
		(commits(`${url}/init?url=${repo}`));
});

export default fetchCommits;
