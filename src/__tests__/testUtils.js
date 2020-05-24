/* istanbul ignore file */
/* eslint-disable indent */
/* eslint-disable no-unexpected-multiline */
import { fork } from 'fluture/index';

export const expectResolve = (future, onResolve) => {
	fork
		(x => { throw new Error(`Expected future to pass.\nValue: ${x}`); })
		(onResolve)
		(future);
};

export const expectReject = (future, onReject) => {
	fork
		(onReject)
		(x => { throw new Error(`Expected future to fail.\nValue: ${x}`); })
		(future);
};
