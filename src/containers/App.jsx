import React from 'react';
import PropTypes from 'prop-types';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ children }) => (
	<>
		<ToastContainer
			position="top-right"
			autoClose={2500}
			hideProgressBar
			newestOnTop
			closeOnClick
			rtl={false}
			pauseOnVisibilityChange
			draggable
			pauseOnHover
			transition={Slide}
		/>
		{ children }
	</>
);

App.propTypes = {
	children: PropTypes.element
};

App.defaultProps = {
	children: null
};

export default App;
