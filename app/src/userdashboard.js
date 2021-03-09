import axios from 'axios';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withToken } from './tokenContext';

const UserDashboard = ({ token, setToken, user, setUser }) => {
	const [redirect, setRedirect] = useState(false);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [oldPassword, setOld] = useState('');
	const [newPassword, setNew] = useState('');

	useEffect(() => {
		if(!token) setRedirect(true);
		if(!user && token) axios
			.get('http://192.168.42.10:6969/api/user', {
				headers: {'authorization': `bearer ${token}`}
			})
			.then(({ data }) => {
				setUser(data.user.email);
			})
			.catch((error) => {
				if(error.response) {
					const { response } = error;
					setError(response.data.message);
					setToken(undefined);
					setRedirect(true);
				}
			});

	}, [token]);

    const handleOld = (e) =>
        setOld(e.target.value);

    const handleNew = (e) =>
        setNew(e.target.value);

	const handleLogout = (e) => {
		e.preventDefault();
		window.localStorage.removeItem('user-token');
		setToken(undefined);
    }

    const changePassword = (e) => {
        e.preventDefault();
		setSuccess('');

		const update = {
			current: oldPassword,
			updated: newPassword
		}

		axios
		.put(
			'http://192.168.42.10:6969/api/user/password',
			{ update }, 
			{ headers: {'authorization': `bearer ${token}`} })
		.then((res) => {
			if(error.length >= 1) setError('');
			setSuccess('Password change, successful!');
			setOld('');
			setNew('');
		})
		.catch((error) => {
			if(error.response) {
				setError('');
				const { response } = error;
				setError(response.data.message);
			}
		});
	}

	const deleteAccount = (e) => {
		e.preventDefault();

		axios
		.delete('http://192.168.42.10:6969/api/user', {
			headers: {'authorization': `bearer ${token}`}
		})
		.then(() => {
			window.localStorage.removeItem('user-token');
			setToken(undefined);
		})
		.catch();
	}

	if(redirect) return <Redirect to='/portal'/>;
	else return (
		<section id='app' className='dashboard' >
		<button className='logout' onClick={handleLogout}>logout</button>
		<header>Dashboard</header>
		<p className='email'>{user}</p>
		<div className={`error ${error.length >= 1 ? 'show' : 'hide'}`}>{`${error}`}</div>
		<div className={`success ${success.length >=1 ? 'show': 'hide'}`}>{`${success}`}</div>
		<form onSubmit={changePassword}>
			<p>Update Password</p>
			<input required placeholder='Old' type='password' value={oldPassword} onChange={handleOld}/>
			<input required placeholder='New' type='password' value={newPassword} onChange={handleNew}/>
			<button type='submit'>Done</button>
		</form>
        <div className='delete'>
    		<button onClick={deleteAccount}>Delete Account</button>
        </div>
		</section>
	);
}

export default withToken(UserDashboard);