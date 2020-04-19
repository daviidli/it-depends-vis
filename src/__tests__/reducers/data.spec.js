import data from '../../reducers/data';
import actions from '../../actions/types.json';

describe('data reducer', () => {
	it('should return inital state', () => expect(data(undefined, {})).toEqual(null));

	it('should return same state', () => expect(
		data({ data: 123 }, { type: 'foo', data: { data: 456 } })
	).toEqual({ data: 123 }));

	it('should return new state', () => expect(
		data({ data: 123 }, { type: actions.SET_DATA, data: { data: 456 } })
	).toEqual({ data: 456 }));
});
