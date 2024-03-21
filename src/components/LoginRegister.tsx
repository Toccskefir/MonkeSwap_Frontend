import React, {useContext, useState} from 'react';
import './LoginRegister.css';
import 'bootstrap/dist/css/bootstrap.css'
import {AuthContext} from "../contexts/AuthContext";
import axios from "../axios";

function LoginRegister() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [isAdult, setIsAdult] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    //true means login, false means register
    const [action, setAction] = useState(true);

    const {login} = useContext(AuthContext);

    async function handleSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (action) {
            try {
                await login({email, password});
            } catch (error) {
                if (error instanceof Error) {
                    setErrorMessage(error.message);
                }
            }
        } else {
            if (password !== passwordAgain) {
                setErrorMessage('Passwords are not matching')
            } else if (!isAdult) {
                setErrorMessage('You must be over the age of 18');
            } else if (!acceptTerms) {
                setErrorMessage('You need to accept terms & conditions');
            } else {
                axios.post('auth/register', {username, email, password}, {headers: { Authorization: ''}})
                    .then(async(response) => {
                        setAction(true);
                        setFormToInitState();
                    }).catch((error) => {
                    if (error.response) {
                        setErrorMessage(error.response.data);
                    }
                });
            }
        }
    }

    function setFormToInitState() {
        setUsername('');
        setEmail('');
        setPassword('');
        setPasswordAgain('');
        setErrorMessage('');
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="w-50 border">

                <h1>{action ? "Login" : "Account creation"}</h1>

                <form onSubmit={handleSubmitEvent}>
                    {action ? null :
                        <div className="form-group">
                            <label>
                                Username
                                <input
                                    type="text"
                                    className="form-control"
                                    id="inputUsername"
                                    placeholder="Monke"
                                    value={username}
                                    onChange={event => setUsername(event.target.value)}
                                />
                            </label>
                        </div>
                    }

                    <div className="form-group">
                        <label>
                            Email
                            <input
                                type="text"
                                className="form-control"
                                id="inputEmail"
                                placeholder="monke@swap.com"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Password
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword"
                                placeholder="********"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </label>
                    </div>

                    {action ? null :
                        <>
                            <div className="form-group">
                                <label>
                                    Confirm password
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputPasswordAgain"
                                        placeholder="********"
                                        value={passwordAgain}
                                        onChange={event => setPasswordAgain(event.target.value)}
                                    />
                                </label>
                            </div>
                            <div className="form-check">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkBoxIsAdult"
                                        onChange={() => setIsAdult(isAdult => !isAdult)}
                                    />
                                    I am over the age of 18
                                </label>
                            </div>
                            <div className="form-check">
                                <label>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="checkBoxAcceptTerms"
                                        onChange={() => setAcceptTerms(acceptTerms => !acceptTerms)}
                                    />
                                    Terms&Conditions
                                </label>
                            </div>
                        </>
                    }

                    <p>{errorMessage}</p>

                    {action ?
                        <button type="submit" id="buttonLogin">Login</button>
                        :
                        <button type="submit" id="buttonRegistration">Create</button>
                    }
                </form>

                {action ?
                    <button type="button" id="buttonChangeToRegister" onClick={() => {
                        setAction(false);
                        setFormToInitState();
                    }}>Register</button>
                    :
                    <button type="submit" id="buttonCancel" onClick={() => {
                        setAction(true);
                        setFormToInitState();
                    }}>Back</button>
                }
            </div>
        </div>
    );
}

export default LoginRegister;