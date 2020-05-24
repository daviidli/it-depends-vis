import { connect } from 'react-redux';
import D3 from '../components/d3/D3';

export const mapStateToProps = ({ data, ordering, topCount }) => ({
	files: data.names,
	mappings: data.data,
	ordering,
	topCount
});

export default connect(mapStateToProps)(D3);
