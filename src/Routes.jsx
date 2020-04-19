import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import routes from './constants/routes.json';

const Routes = () => (
	<App>
		<Switch>
			<Route exact path={routes.HOME} component={<div />} />
			<Route path={routes.LOADING} component={<div />} />
			<Route path={routes.VIS} component={<div />} />
		</Switch>
	</App>
);

export default Routes;
