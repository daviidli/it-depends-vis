import React from 'react';
import Header from './components/Header/Header';
import HelpModal from './components/Modal/HelpModal';
import HelpModalContextProvider from './components/Modal/HelpModalContext';

const App = () => {
	return (
		<div className="App">
			<HelpModalContextProvider>
				<HelpModal />
				<Header />
			</HelpModalContextProvider>
		</div>
	);
}

export default App;
