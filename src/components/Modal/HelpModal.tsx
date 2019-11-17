import React, { useContext } from 'react';
import Modal from '@material-ui/core/Modal';
import { HelpModalContext } from './HelpModalContext';
import Button from '@material-ui/core/Button';

import './HelpModal.scss';

const HelpModal = () => {
	const [open, setOpen] = useContext(HelpModalContext);

	const modalPosition = {
		top: window.innerHeight / 2,
		left: window.innerWidth / 2,
		width: window.innerWidth > 550 ? 480 : '85%',
	};

	return (
		<Modal
			aria-labelledby='help'
			open={open}
			onClose={() => setOpen(false)}
		>
			<div className='helpModal' style={modalPosition}>
				<span className='helpHeader'>Help</span>
				<div className='helpDescription'>
					This tool enables developers to more easily visualize dependencies between entities in a software system (classes, files, etc...)
					which cut across commit history.
				</div>
				<Button
					className='closeButton'
					variant='contained'
					color='secondary'
					onClick={() => setOpen(false)}
				>
					Close
				</Button>
			</div>
		</Modal>
	);
};

export default HelpModal;