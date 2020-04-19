import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { clone } from 'ramda';
import SearchBox from '../../../components/searchBox/SearchBox';

const defaultProps = {
	setSelectedFile: jest.fn(),
	files: ['file1', 'file2']
};

const setup = (props = defaultProps) => {
	const wrapper = shallow(<SearchBox {...props} />);
	return { wrapper };
};

describe('SearchBox component', () => {
	it('should match snapshot', () => {
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should match snapshot with no files prop', () => {
		const props = clone(defaultProps);
		props.files = undefined;
		const { wrapper } = setup();
		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
