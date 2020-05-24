import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

const ContentContainer = ({ className, align, children }) => (
	<Row className={className} align={align}>
		<Col
			xs={{ span: 20, offset: 2 }}
			md={{ span: 16, offset: 4 }}
			lg={{ span: 12, offset: 6 }}
			xl={{ span: 10, offset: 7 }}
			xxl={{ span: 8, offset: 8 }}
		>
			{children}
		</Col>
	</Row>
);

ContentContainer.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	align: PropTypes.oneOf(['top', 'middle', 'bottom'])
};

ContentContainer.defaultProps = {
	align: 'top'
};

export default ContentContainer;
