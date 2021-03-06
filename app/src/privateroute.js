import { Route, Redirect } from 'react-router-dom';
import { withToken } from './tokenContext';

const PrivateRoute = ({ children, token, ...rest }) => {
	return (
		<Route {...rest}>
			{token ? children : <Redirect to='/portal'/>}
		</Route>
	);
}

export default withToken(PrivateRoute);