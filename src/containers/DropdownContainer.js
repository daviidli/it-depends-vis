import { connect } from 'react-redux';
import { pick } from 'ramda';
import { setStartCommit, setEndCommit } from '../actions/actions';
import Dropdown from '../components/dropdown/Dropdown';

export const mapStateToProps = pick(['startCommit', 'endCommit', 'commits']);

const actions = {
	setStartCommit,
	setEndCommit
};

export default connect(mapStateToProps, actions)(Dropdown);
