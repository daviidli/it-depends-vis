import React from 'react';
import Header from './components/Header/Header';
import HelpModal from './components/Modal/HelpModal';
import HelpModalContextProvider from './components/Modal/HelpModalContext';
import Footer from './components/Footer/Footer';

const App = () => {
	return (
		<div className="App">
			<HelpModalContextProvider>
				<HelpModal />
				<Header />
			</HelpModalContextProvider>
			<Footer />
		</div>
	);
}

export default App;
