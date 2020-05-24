import ordering from '../../reducers/ordering';
import actions from '../../actions/types.json';

describe('ordering', () => {
	it('should return initial state', () => expect(ordering(undefined, {})).toEqual('descending'));

	it('should return same state', () => expect(
		ordering('a', { type: 'foo', ordering: 'b' })
	).toEqual('a'));

	it('should return new state', () => expect(
		ordering('a', { type: actions.SET_ORDERING, ordering: 'b' })
	).toEqual('b'));
});
