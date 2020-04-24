import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select } from 'antd';
import {
	pipe, length, prop, map, slice, indexOf
} from 'ramda';
import DropdownPanelItem from './DropdownPanelItem';

import './DropdownPanel.scss';

const DropdownPanel = ({
	startCommit, endCommit, setStartCommit, setEndCommit, commits
}) => {
	const createOptionItem = x => (
		<Select.Option
			key={x.sha}
			value={x.sha}
		>
			<DropdownPanelItem commit={x} />
		</Select.Option>
	);

	const createStartCommitOptions = x => pipe(
		slice(0, x),
		map(createOptionItem)
	);
	const createEndCommitOptions = x => pipe(
		slice(x + 1, length(commits)),
		map(createOptionItem)
	);

	const onSelect = (fn, arr) => x => fn(indexOf(x, map(prop('sha'))(arr)));

	return (
		<Row>
			<Col span={24} className="dropdownCol">
				<div>Staring Commit</div>
				<Select
					className="dropdownSelect"
					size="middle"
					value={commits[startCommit].sha}
					onSelect={onSelect(setStartCommit, commits)}
				>
					{ createStartCommitOptions(endCommit)(commits) }
				</Select>
			</Col>
			<Col span={24} className="dropdownCol">
				<div>Ending Commit</div>
				<Select
					className="dropdownSelect"
					size="middle"
					value={commits[endCommit].sha}
					onSelect={onSelect(setEndCommit, commits)}
				>
					{ createEndCommitOptions(startCommit)(commits) }
				</Select>
			</Col>
		</Row>
	);
};

DropdownPanel.propTypes = {
	startCommit: PropTypes.number.isRequired,
	endCommit: PropTypes.number.isRequired,
	setStartCommit: PropTypes.func.isRequired,
	setEndCommit: PropTypes.func.isRequired,
	commits: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default DropdownPanel;
