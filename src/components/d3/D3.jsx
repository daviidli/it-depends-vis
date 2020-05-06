import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import createVis from './D3Vis';
import './D3.scss';

const D3 = ({
	files, mappings, sizes, selectedFile
}) => {
	useEffect(() => {
		let observer;

		if (files && mappings) {
			observer = createVis(
				window.innerWidth - 200,
				window.innerHeight - 300,
				files.slice(0, 30),
				mappings.slice(0, 30),
				sizes,
				selectedFile
			);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [files, mappings]);

	return <div className="vis-container"><div className="vis"><svg id="d3-vis" /></div></div>;
};

D3.propTypes = {
	files: PropTypes.arrayOf(PropTypes.string).isRequired,
	mappings: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
	sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
	selectedFile: PropTypes.string.isRequired
};

export default D3;
