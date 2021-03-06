import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { withToken } from './tokenContext';
import axios from 'axios';

const Tab = ({ style, text, changeTab }) => {
    return (
        <span onClick={changeTab} className={style}>
            {text}
        </span>
    );
}

const Email = ({ email, handleEmail, disable }) => 
    <input
        disabled={disable}
        required 
        type='email' 
        placeholder='Email' 
        value={email}
        onChange={handleEmail}/>

const Password = ({ password, handlePassword, disable }) =>
    <input
        disabled={disable}
        required 
        type='password' 
        placeholder='password' 
        value={password} 
        onChange={handlePassword}/>

const postUser = (url, data, fn, errFn) =>
    axios.post(url, data).then(fn).catch(errFn);

const createUser = (data, fn, errFn) =>
    postUser('http://192.168.42.10:6969/api/user/register', data, fn, errFn);

const loginUser = (data, fn, errFn) =>
    postUser('http://192.168.42.10:6969/api/user/login', data, fn, errFn);

const UserPortal = ({ token, setToken, setUser }) => {
    const [tab, setTab] = useState('signup');
    const [redirect, setRedirect] = useState(false);
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [save, setSave] = useState(false);

    const saving = (token) => {
        if(save)
            window.localStorage.setItem('user-token', token);
    }

    const onSubmitSuccess = (response) => {
        setDisable(true);
        if(error.length >= 1) setError('');
        setToken(response.data.token);
        setUser(response.data.user.email);
        saving(response.data.token)
        setRedirect(true);
    }

    const onSubmitError = (error) => {
        if(error.response) {
            const { response } = error;
            setError(response.data.message);
            setPassword('');
            setEmail('');
        }
    }

    const changeTab = (e) => {
        e.preventDefault();
        if(tab === 'signup') setTab('login');
        else setTab('signup');

        setEmail('');
        setPassword('');
        setError('');
    }

    const handleEmail = (e) =>
        setEmail(e.target.value);

    const handlePassword = (e) => 
        setPassword(e.target.value);
    
    const handleSave = (e) =>
        setSave(e.target.checked);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email, password
        }

        if(tab === 'signup') {
            createUser(data,
                onSubmitSuccess,
                onSubmitError);
        } else {
            loginUser(data,
                onSubmitSuccess,
                onSubmitError);
        }
    }

    if(redirect || token)
        return <Redirect to='/'/>;
    else return (
        <section id='app' className='portal'>
        <header>
            Wadup
            <span className='tab'>({tab})</span>
        </header>
        <div className={`error ${error.length >= 1 ? 'show' : 'hide'}`}>{`${error}`}</div>
        <form onSubmit={handleSubmit}>
            <Email disable={disable} email={email} handleEmail={handleEmail}/>
            <Password disable={disable} password={password} handlePassword={handlePassword}/>
            <label className='checkbox'>
                <input disabled={disable} id='checkbox' type='checkbox' checked={save} onChange={handleSave}/>
                <span className='checkbox-label'>Stay signed in?</span>
            </label>
            <button disabled={disable} type='submit'>Done</button>
        </form>
        <div className='current-page'>
            <Tab
                style={tab === 'signup' ? 'highlight' : null}
                text='Signup'
                changeTab={changeTab}/>

            <Tab
                style={tab === 'login' ? 'highlight' : null}
                text='Login'
                changeTab={changeTab}/>
        </div>
        </section>
    );
}

export default withToken(UserPortal);