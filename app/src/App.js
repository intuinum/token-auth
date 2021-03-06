import { useEffect, useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import UserPortal from './userportal';
import UserDashboard from './userdashboard';
import PrivateRoute from './privateroute';
import { TokenProvider } from './tokenContext';
import './app.css';

function App() {
	const [token, setToken] = useState();
	const [user, setUser] = useState();

	useEffect(() => {
		const savedToken = window.localStorage.getItem('user-token');
		if(savedToken) setToken(savedToken);
	}, []);

	return (
		<TokenProvider value={{ token, setToken }}>
		<Switch>
			<PrivateRoute exact path='/'>
				<UserDashboard setUser={setUser} user={user}/>
			</PrivateRoute>
			<Route path='/portal'>
				<UserPortal setUser={setUser}/>
			</Route>
		</Switch>
		</TokenProvider>
	);
}

export default App;
