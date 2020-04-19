import types from './types.json';

export const setError = error => ({ type: types.SET_ERROR, error });

export const setRepo = repo => ({ type: types.SET_REPO, repo });

export const setData = data => ({ type: types.SET_DATA, data });

export const setSelectedFile = filename => ({ type: types.SET_SELECTED_FILE, filename });

export const setRange = range => ({ type: types.SET_RANGE, range });

export const setCommits = commits => ({ type: types.SET_COMMITS, commits });

export const setStartCommit = startCommit => ({ type: types.SET_START_COMMIT, startCommit });

export const setEndCommit = endCommit => ({ type: types.SET_END_COMMIT, endCommit });
