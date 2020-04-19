import { connect } from 'react-redux';
import { pipe, pick } from 'ramda';
import { setSelectedFile } from '../actions/actions';
import SearchBox from '../components/searchBox/SearchBox';
import { splitData } from '../utils/reduxUtils';

export const mapStateToProps = pipe(pick(['data']), splitData, pick(['files']));

const actions = {
	setSelectedFile
};

export default connect(mapStateToProps, actions)(SearchBox);
