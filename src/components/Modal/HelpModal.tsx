import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';

const HelpModal = () => {
	const [open, setOpen] = useState(false);

	return (
		<Modal
			aria-labelledby='help'
			open={open}
			onClose={() => setOpen(false)}
		>
			<div className='helpModal'>
				<h2 id='simple-modal-title'>Text in a modal</h2>
				<p id='simple-modal-description'>
					Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
				</p>
			</div>
		</Modal>
	);
};

export default HelpModal;