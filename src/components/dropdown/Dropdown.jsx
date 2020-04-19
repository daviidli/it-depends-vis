import React from 'react';
import PropTypes from 'prop-types';
import {
	Popover, Button
} from 'antd';
import DropdownPanel from './DropdownPanel';

const Dropdown = ({
	icon, startCommit, endCommit, setStartCommit, setEndCommit, commits
}) => (
	<Popover
		className="dropdown"
		content={(
			<DropdownPanel {...{
				startCommit, endCommit, setStartCommit, setEndCommit, commits
			}}
			/>
		)}
		placement="bottomRight"
		trigger="click"
	>
		<Button type="default" shape="circle" size="large" icon={icon} />
	</Popover>
);

Dropdown.propTypes = {
	icon: PropTypes.element.isRequired,
	startCommit: PropTypes.string.isRequired,
	endCommit: PropTypes.string.isRequired,
	setStartCommit: PropTypes.func.isRequired,
	setEndCommit: PropTypes.func.isRequired,
	commits: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Dropdown;
