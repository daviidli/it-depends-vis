import error from '../../reducers/error';
import actions from '../../actions/types.json';

describe('error', () => {
	it('should return initial state', () => expect(error(undefined, {})).toEqual(''));

	it('should return same state', () => expect(
		error('someError', { type: 'foo', error: 'someOtherError' })
	).toEqual('someError'));

	it('should return new state', () => expect(
		error('someError', { type: actions.SET_ERROR, error: 'someOtherError' })
	).toEqual('someOtherError'));
});
