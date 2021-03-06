import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserPortal from './userportal';
import PrivateRoute from './privateroute';
import { TokenProvider } from './tokenContext';
import './app.css';

function App() {
	const [token, setToken] = useState();

	useEffect(() => {
		const savedToken = window.localStorage.getItem('user-token');
		if(savedToken) setToken(savedToken);
	}, []);

	return (
		<TokenProvider value={{ token, setToken }}>
		<Switch>
			<PrivateRoute exact path='/'>
				<h1>Hidden information</h1>
			</PrivateRoute>
			<Route path='/portal'>
				<UserPortal/>
			</Route>
		</Switch>
		</TokenProvider>
	);
}

export default App;
