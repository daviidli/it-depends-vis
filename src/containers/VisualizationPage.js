import { connect } from 'react-redux';
import { pick } from 'ramda';
import { setRepo, setData } from '../actions/actions';
import Visualization from '../components/visualization/Visualization';

export const mapStateToProps = pick(['startCommit', 'endCommit', 'repo', 'data']);

const actions = {
	setRepo,
	setData
};

export default connect(mapStateToProps, actions)(Visualization);
