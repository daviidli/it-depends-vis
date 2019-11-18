import React from 'react';
import Dropdown from '../Dropdown/Dropdown';

export interface CommitDropdownProps {
	label: string,
	selectedCommit: string,
	showCommitsAfter: string,
	setSelectedCommit: Function,
	commits: Array<string>,
};

const CommitDropdown = (props: CommitDropdownProps) => {
	const { label, selectedCommit, showCommitsAfter, setSelectedCommit, commits } = props;

	let commitsShown: Array<string>;
	const indexOfStart: number = commits.indexOf(showCommitsAfter);
	if (indexOfStart < 0) {
		commitsShown = commits;
	} else {
		commitsShown = commits.slice(indexOfStart + 1, commits.length);
	}

	return (
		<Dropdown
			selectedValue={selectedCommit}
			label={label}
			disabled={!commitsShown.length}
			setSelectedValue={setSelectedCommit}
			values={commitsShown}
		/>
	);
}

export default CommitDropdown;
