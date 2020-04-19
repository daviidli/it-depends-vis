import React from 'react';
import {
	PageHeader, Button, Row, Col
} from 'antd';
import { GiThink } from 'react-icons/gi';
import { FiGitCommit } from 'react-icons/fi';
import { useHistory } from 'react-router';
import routes from '../../constants/routes.json';
import SearchBox from '../../containers/SearchBoxContainer';
import Slider from '../../containers/SliderContainer';
import Dropdown from '../../containers/DropdownContainer';
import './Header.scss';

const Header = () => {
	const history = useHistory();

	const onBack = () => history.push(routes.HOME);
	const backIcon = <Button className="icon" type="primary" shape="circle" size="large" icon={<GiThink size={32} />} />;

	const contents = (
		<Row className="contents" justify="end">
			<Col />
			<Col xs={22} md={12}><Slider /></Col>
			<Col xs={2} className="dropdownContainer">
				<Dropdown icon={<FiGitCommit size={28} />} />
			</Col>
		</Row>
	);

	return (
		<PageHeader
			className="header"
			title={<SearchBox />}
			backIcon={backIcon}
			onBack={onBack}
			extra={contents}
		/>
	);
};

export default Header;
