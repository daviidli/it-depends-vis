import React from 'react';
import Header from './components/Header/Header';
import HelpModal from './components/Modal/HelpModal';

const App = () => {
	return (
		<div className="App">
			<HelpModal />
			<Header />
		</div>
	);
}

export default App;
