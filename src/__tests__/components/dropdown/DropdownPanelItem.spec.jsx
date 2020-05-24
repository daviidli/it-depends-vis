import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import DropdownPanelItem from '../../../components/dropdown/DropdownPanelItem';

const defaultProps = {
	commit: {
		author: {
			avatar_url: 'url'
		},
		message: 'commit msg'
	}
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<DropdownPanelItem {...props} />);
	return {
		wrapper
	};
};

describe('DropdownPanel component', () => {
	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should match snapshot without author avatar', () => {
		const props = {
			commit: {
				message: 'commit msg'
			}
		};
		const { wrapper } = setup(props);
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
