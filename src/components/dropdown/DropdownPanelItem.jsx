/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { pipe, split, head } from 'ramda';

import './DropdownPanelItem.scss';

const firstParagraph = pipe(split('\n'), head);

const DropdownPanelItem = ({ commit }) => (
	<Row justify="center" align="center" gutter={[16, 8]}>
		<Col span={3}>
			<img className="avatar" alt="author avatar" src={commit.author.avatar_url} />
		</Col>
		<Col span={21}>
			{ firstParagraph(commit.message) }
		</Col>
	</Row>
);

DropdownPanelItem.propTypes = {
	commit: PropTypes.object.isRequired
};

export default DropdownPanelItem;
