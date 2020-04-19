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
	equals,
	thunkify
} from 'ramda';

// getState :: a -> {*}
export const getState = s => s.getState();
// geStateThunk :: a -> (() -> {*})
export const getStateThunk = thunkify(getState);

// dispatch :: a -> b -> undefined
export const dispatch = curry((s, x) => s.dispatch(x));
// dispatchThunk :: a -> b -> (() -> undefined)
export const dispatchThunk = thunkify(dispatch);

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
