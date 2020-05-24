import {
	curry,
	assoc,
	prop,
	dissoc,
	pipe,
	toPairs,
	map,
	ifElse,
	head,
	of,
	fromPairs,
	mergeAll,
	equals
} from 'ramda';
import { attemptP } from 'fluture/index';
import axios from 'axios';

export const renameKey = curry(
	(oldKey, newKey, obj) => assoc(newKey, prop(oldKey, obj), dissoc(oldKey, obj))
);

export const splitData = pipe(
	toPairs,
	map(
		ifElse(
			pipe(head, equals('data')),
			pipe(of, fromPairs, prop('data')),
			pipe(of, fromPairs)
		)
	),
	mergeAll,
	renameKey('names', 'files'),
	renameKey('data', 'mappings'),
	renameKey('size', 'sizes')
);

export const futureFromP = f => attemptP(f);
export const axiosPut = url => futureFromP(() => axios.put(url));
export const axiosGet = url => futureFromP(() => axios.get(url));
