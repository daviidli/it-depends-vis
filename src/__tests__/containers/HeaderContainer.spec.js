import { mapStateToProps } from '../../containers/HeaderContainer';

it('mapStateToProps should return ordering', () => {
	const input = {
		ordering: 'abc',
		foo: 1,
		bar: 2
	};
	expect(mapStateToProps(input)).toEqual({ ordering: 'abc' });
});
