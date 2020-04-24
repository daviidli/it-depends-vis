import React from 'react';
import PropTypes from 'prop-types';
import { Input, AutoComplete } from 'antd';
import { AiOutlineSearch } from 'react-icons/ai';
import {
	pipe, map, objOf, mergeRight, of
} from 'ramda';

import './SearchBox.scss';

const createLabelObj = value => ({ value, label: <div className="searchItem">{ value }</div> });

const createOptions = pipe(
	map(createLabelObj),
	objOf('options'),
	mergeRight({ label: 'Files' }),
	of
);

const SearchBox = ({ files, setSelectedFile }) => (
	<AutoComplete
		autoFocus
		filterOption
		options={createOptions(files)}
		dropdownClassName="searchDropdown"
		dropdownMatchSelectWidth={400}
		onSelect={setSelectedFile}
	>
		<Input
			className="searchInput"
			size="large"
			placeholder="Select a file"
			prefix={
				<AiOutlineSearch size={24} color="grey" className="searchIcon" />
			}
		/>
	</AutoComplete>
);

SearchBox.propTypes = {
	setSelectedFile: PropTypes.func.isRequired,
	files: PropTypes.arrayOf(PropTypes.string)
};

SearchBox.defaultProps = {
	files: []
};

export default SearchBox;
