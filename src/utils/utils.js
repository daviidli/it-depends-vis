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

// renameKey :: String a -> String b -> {a: c} -> {b: c}
export const renameKey = curry(
	(oldKey, newKey, obj) => assoc(newKey, prop(oldKey, obj), dissoc(oldKey, obj))
);

// splitData :: {data: a} -> {a}
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

// futureFromP :: f -> Future a b
export const futureFromP = f => attemptP(f);

// axiosPut :: String -> Future a b
export const axiosPut = url => futureFromP(() => axios.put(url));

// axiosGet :: String -> Future a b
export const axiosGet = url => futureFromP(() => axios.get(url));
