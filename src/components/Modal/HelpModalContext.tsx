import React, { useState } from 'react';

export const HelpModalContext = React.createContext([] as any[]);

const HelpModalContextProvider = (props: any) => {
	const [open, setOpen] = useState(false);

	return (
		<HelpModalContext.Provider value={[open, setOpen]}>
			{ props.children }
		</HelpModalContext.Provider>
	)
}

export default HelpModalContextProvider;
