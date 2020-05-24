import React from 'react';
import PropTypes from 'prop-types';
import {
	Popover, Button
} from 'antd';
import DropdownPanel from './DropdownPanel';
import './Dropdown.scss';

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
		<div className="button"><Button type="default" shape="circle" size="large" icon={icon} /></div>
	</Popover>
);

Dropdown.propTypes = {
	icon: PropTypes.element.isRequired,
	startCommit: PropTypes.number.isRequired,
	endCommit: PropTypes.number.isRequired,
	setStartCommit: PropTypes.func.isRequired,
	setEndCommit: PropTypes.func.isRequired,
	commits: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Dropdown;
