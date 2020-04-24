/* eslint-disable no-unexpected-multiline */
/* eslint-disable indent */
import { fork, map, mapRej } from 'fluture/index';
import {
	pipe, path, hasPath, ifElse, prop, curry
} from 'ramda';
import { axiosPut } from '../../utils/utils';

// getCommitsFromResponse :: { data: { commits: [*] } } -> [*]
export const getCommitsFromResponse = pipe(ifElse(hasPath(['data', 'commits']), path(['data', 'commits']), () => []));

// commits :: String -> [*]
export const commits = pipe(axiosPut, map(getCommitsFromResponse), mapRej(prop('message')));

const fetchCommits = curry((onError, onComplete, repo) => {
	fork
		(onError)
		(onComplete)
		(commits(`http://localhost:8080/init?url=${repo}`));
});

export default fetchCommits;
