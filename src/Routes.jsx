import React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import routes from './constants/routes.json';
import Visualization from './containers/VisualizationPage';
import HomePage from './containers/HomePage';

const Routes = () => (
	<App>
		<Switch>
			<Route exact path={routes.HOME} component={HomePage} />
			<Route path={routes.VIS} component={Visualization} />
		</Switch>
	</App>
);

export default Routes;
