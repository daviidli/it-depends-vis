import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import createVis from './D3Vis';

const D3 = ({
	files, mappings, sizes, selectedFile
}) => {
	useEffect(() => createVis(
		window.innerWidth,
		window.innerHeight,
		files,
		mappings,
		sizes,
		selectedFile
	), []);

	return <svg id="d3-vis" />;
};

D3.propTypes = {
	files: PropTypes.arrayOf(PropTypes.string).isRequired,
	mappings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedFile: PropTypes.string.isRequired
};

export default D3;
