import React, { useState } from 'react';
import { PageHeader, Button, Row, Col, Radio } from 'antd';
import { GiThink } from 'react-icons/gi';
import { FiGitCommit } from 'react-icons/fi';
import { useHistory } from 'react-router';
import routes from '../../constants/routes.json';
import Dropdown from '../../containers/DropdownContainer';
import './Header.scss';

const Header = () => {
	const history = useHistory();
	const [selectedType, setSelectedType] = useState('normal');

	const onBack = () => history.push(routes.HOME);
	const backIcon = (
		<div className="button-container">
			<Button
				type="primary"
				shape="circle"
				size="large"
				icon={<GiThink size={32} />}
			/>
		</div>
	);

	const contents = (
		<>
			<Row className="contents" justify="end">
				<Col className="aaa">
					<Radio.Group
						className="order-select"
						value={selectedType}
						onChange={e => setSelectedType(e.target.value)}
					>
						<Radio.Button value="normal">Default</Radio.Button>
						<Radio.Button value="reverse">Reverse</Radio.Button>
					</Radio.Group>
				</Col>
				<Col xs={2} className="dropdownContainer">
					<Dropdown icon={<FiGitCommit size={28} />} />
				</Col>
			</Row>
			<span id="order" className={selectedType} />
		</>
	);

	return (
		<PageHeader
			className="header"
			backIcon={backIcon}
			onBack={onBack}
			extra={contents}
		/>
	);
};

export default Header;
