import { connect } from 'react-redux';
import { pick, pipe } from 'ramda';
import { setRange } from '../actions/actions';
import D3 from '../components/d3/D3';
import { splitData } from '../utils/reduxUtils';

export const mapStateToProps = pipe(
	pick(['data', 'selectedFile']),
	splitData
);

const actions = {
	setRange
};

export default connect(mapStateToProps, actions)(D3);
