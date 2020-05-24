import { connect } from 'react-redux';
import { setOrdering } from '../actions/actions';
import Header from '../components/header/Header';

export const mapStateToProps = ({ ordering }) => ({
	ordering
});

const actions = {
	setOrdering
};

export default connect(mapStateToProps, actions)(Header);
