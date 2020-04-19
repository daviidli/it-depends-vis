import React from 'react';
import PropTypes from 'prop-types';

const App = ({ children }) => <>{ children }</>;

App.propTypes = {
	children: PropTypes.element
};

App.defaultProps = {
	children: null
};

export default App;
