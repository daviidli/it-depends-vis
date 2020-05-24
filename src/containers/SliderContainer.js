import { connect } from 'react-redux';
import { setTopCount } from '../actions/actions';
import Slider from '../components/slider/Slider';

export const mapStateToProps = ({ topCount }) => ({
	topCount
});

const actions = {
	setTopCount
};

export default connect(mapStateToProps, actions)(Slider);
