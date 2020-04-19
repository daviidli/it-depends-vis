import { connect } from 'react-redux';
import { pick } from 'ramda';
import { setRepo } from '../actions/actions';
import Home from '../components/home/Home';

export const mapStateToProps = pick(['repo']);

const actions = {
	setRepo
};

export default connect(mapStateToProps, actions)(Home);
