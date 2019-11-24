import React from 'react';
import Dropdown from '../Dropdown/Dropdown';
import { ICommit } from '../../App';

export interface CommitDropdownProps {
	label: string,
	selectedCommit: string,
	showCommitsAfter: string,
	setSelectedCommit: Function,
	commits: ICommit[],
};

const CommitDropdown = (props: CommitDropdownProps) => {
	const { label, selectedCommit, showCommitsAfter, setSelectedCommit, commits } = props;

	let commitsShown: ICommit[];
	const indexOfStart: number = indexOfCommit(commits, showCommitsAfter);
	if (indexOfStart < 0) {
		commitsShown = commits;
	} else {
		commitsShown = commits.slice(indexOfStart + 1, commits.length);
	}

	const commitsShownValues = commitsShown.map((commit: ICommit) => commit.value);

	return (
		<Dropdown
			selectedValue={selectedCommit}
			label={label}
			disabled={!commitsShown.length}
			setSelectedValue={setSelectedCommit}
			values={commitsShownValues}
		/>
	);
}

export const indexOfCommit = (commits: ICommit[], commitName: string) => {
	for (let i = 0; i < commits.length; i++) {
		if (commits[i].value === commitName) {
			return i;
		}
	}
	return -1;
};

export default CommitDropdown;
