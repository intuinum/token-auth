import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Tab = ({ style, text, changeTab }) => {
    return (
        <span onClick={changeTab} className={style}>
            {text}
        </span>
    );
}

const Email = ({ email, handleEmail }) => 
    <input 
        required 
        type='email' 
        placeholder='Email' 
        value={email} 
        onChange={handleEmail}/>

const Password = ({ password, handlePassword }) =>
    <input 
        required 
        type='password' 
        placeholder='password' 
        value={password} 
        onChange={handlePassword}/>

const postUser = async (url, data) => {
    const res = await axios.post(url, data);
    return res.data;
}

const createUser = async (data) =>
    await postUser('http://192.168.42.10:6969/signup', data);

const loginUser = async (data) =>
    await postUser('http://192.168.42.10:6969/login', data);

const UserPortal = () => {
    const [tab, setTab] = useState('signup');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            email, password
        }

        try {
            if(tab === 'signup') {
                try {
                    const response = await createUser(data);   
                } catch (error) {
                    throw `Network error: couldn't signup`
                }
            } else {
                try {
                    const response = await loginUser(data); 
                } catch (error) {
                    throw `Network error: couldn't login.`
                }
            }
        } catch (err) {
            setError(err);
            setEmail('');
            setPassword('');
        }
    }

    if(redirect) return <Redirect to='/'/>

    return (
        <section id='app'>
        <header>
            Wadup
        </header>
        <error className={error.length >= 1 ? 'show' : 'hide'}>{`${error}`}</error>
        <form onSubmit={handleSubmit}>
            <Email email={email} handleEmail={handleEmail}/>
            <Password password={password} handlePassword={handlePassword}/>
            <label className='checkbox'>
                <input id='checkbox' type='checkbox'/>
                <span className='checkbox-label'>Stay signed in?</span>
            </label>
            <button type='submit'>Done</button>
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

export default UserPortal;