import { connect } from 'react-redux';
import { pick } from 'ramda';
import { setRange } from '../actions/actions';
import Slider from '../components/slider/Slider';

export const mapStateToProps = pick(['range']);

const actions = {
	setRange
};

export default connect(mapStateToProps, actions)(Slider);
