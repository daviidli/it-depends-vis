import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select } from 'antd';
import {
	pipe, dropWhile, dropLastWhile, init, tail, map, addIndex
} from 'ramda';

import './DropdownPanel.scss';

const createOptionItem = (value, i) => <Select.Option key={`option-${i}`} value={value}>{ value }</Select.Option>;
const notEquals = x => y => x !== y;
const mappedIndex = addIndex(map);

const createStartCommitOptions = commit => pipe(
	dropLastWhile(notEquals(commit)),
	init,
	mappedIndex(createOptionItem)
);
const createEndCommitOptions = commit => pipe(
	dropWhile(notEquals(commit)),
	tail,
	mappedIndex(createOptionItem)
);

const DropdownPanel = ({
	startCommit, endCommit, setStartCommit, setEndCommit, commits
}) => (
	<Row>
		<Col span={24} className="dropdownCol">
			<div>Staring Commit</div>
			<Select
				className="dropdownSelect"
				size="middle"
				value={startCommit}
				onSelect={setStartCommit}
			>
				{ createStartCommitOptions(endCommit)(commits) }
			</Select>
		</Col>
		<Col span={24} className="dropdownCol">
			<div>Ending Commit</div>
			<Select
				className="dropdownSelect"
				size="middle"
				value={endCommit}
				onSelect={setEndCommit}
			>
				{ createEndCommitOptions(startCommit)(commits) }
			</Select>
		</Col>
	</Row>
);

DropdownPanel.propTypes = {
	startCommit: PropTypes.string.isRequired,
	endCommit: PropTypes.string.isRequired,
	setStartCommit: PropTypes.func.isRequired,
	setEndCommit: PropTypes.func.isRequired,
	commits: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DropdownPanel;
