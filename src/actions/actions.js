import types from './types.json';

export const setRepo = repo => ({ type: types.SET_REPO, repo });

export const setData = data => ({ type: types.SET_DATA, data });

export const setCommits = commits => ({ type: types.SET_COMMITS, commits });

export const setStartCommit = startCommit => ({ type: types.SET_START_COMMIT, startCommit });

export const setEndCommit = endCommit => ({ type: types.SET_END_COMMIT, endCommit });

export const setTopCount = topCount => ({ type: types.SET_TOP_COUNT, topCount });

export const setOrdering = ordering => ({ type: types.SET_ORDERING, ordering });
