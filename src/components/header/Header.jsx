import React from 'react';
import PropTypes from 'prop-types';
import {
	Button, Row, Col, Select
} from 'antd';
import { GiThink } from 'react-icons/gi';
import { FiGitCommit } from 'react-icons/fi';
import { useHistory } from 'react-router';
import routes from '../../constants/routes.json';
import Dropdown from '../../containers/DropdownContainer';
import Slider from '../../containers/SliderContainer';
import './Header.scss';

const Header = ({ ordering, setOrdering }) => {
	const history = useHistory();

	const onBack = () => history.push(routes.HOME);
	const backIcon = (
		<div className="button-container" onClick={onBack}>
			<Button
				className="button"
				type="primary"
				shape="circle"
				size="large"
				icon={<GiThink size={32} />}
			/>
		</div>
	);

	return (
		<>
			<Row className="header" justify="space-between">
				<Col xs={2}>
					{backIcon}
				</Col>
				<Col xs={22}>
					<Row justify="end">
						<Col>
							<Select
								className="order-select"
								value={ordering}
								onChange={setOrdering}
							>
								<Select.Option value="descending">Descending</Select.Option>
								<Select.Option value="ascending">Ascending</Select.Option>
								<Select.Option value="directory">Directory</Select.Option>
							</Select>
						</Col>
						<Col xs={16} md={10}>
							<Slider />
						</Col>
						<Col className="dropdownContainer">
							<Dropdown icon={<FiGitCommit size={28} />} />
						</Col>
					</Row>
				</Col>
			</Row>
		</>
	);
};

Header.propTypes = {
	ordering: PropTypes.string.isRequired,
	setOrdering: PropTypes.func.isRequired
};

export default Header;
