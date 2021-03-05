import { Switch, Route } from 'react-router-dom';
import UserPortal from './userportal';
import PrivateRoute from './privateroute';
import './app.css';

function App() {
	return (
		<Switch>
			<PrivateRoute exact path='/'>
				<h1>Hidden information</h1>
			</PrivateRoute>
			<Route path='/portal'>
				<UserPortal/>
			</Route>
		</Switch>
	);
}

export default App;
