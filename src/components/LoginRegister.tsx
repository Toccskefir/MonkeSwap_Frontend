import React, {useContext, useState} from 'react';
import {AuthContext} from "../contexts/AuthContext";
import {HttpContext} from "../providers/HttpProvider";

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
    const axios = useContext(HttpContext);

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
                setErrorMessage('Passwords must match');
            } else if (!isAdult) {
                setErrorMessage('You must be over the age of 18');
            } else if (!acceptTerms) {
                setErrorMessage('You need to accept terms & conditions');
            } else {
                axios.post('http://localhost:3000/auth/register', {username, email, password}, {headers: { Authorization: ''}})
                    .then(async() => {
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
        <div className="flex w-full h-screen font-poppins">
            <div className="w-full flex items-center justify-center lg:w-1/2 bg-gray-100">
                <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">

                    {action ? <div><h1 className="text-5xl font-semibold">Login</h1>
                        <p className="font-medium text-lg text-gray-500 mt-4">Welcome back! Please enter your details!</p>
                        </div>
                        :
                        <h1 className="text-5xl font-semibold">Sign up</h1>}

                    <form onSubmit={handleSubmitEvent}>
                        <div className="mt-8">
                            <label className="font-medium">
                                Email
                                <input
                                    type="text"
                                    className="w-full border-2 border-gray-100 rounded-xl pr-28 pt-3 pb-3 pl-3 mt-1 bg-transparent"
                                    placeholder="monke@swap.com"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </label>
                        </div>

                        {action ? null :
                            <div className="">
                                <label>
                                    Username
                                    <input
                                        type="text"
                                        className=""
                                        placeholder="Monke"
                                        value={username}
                                        onChange={event => setUsername(event.target.value)}
                                    />
                                </label>
                            </div>
                        }

                        <div className="mt-3">
                            <label className="font-medium">
                                Password
                                <input
                                    type="password"
                                    className="w-full border-2 border-gray-100 rounded-xl pr-20 pt-3 pb-3 pl-3 mt-1 bg-transparent"
                                    placeholder="**********"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </label>
                        </div>


                        {action ? null :
                            <>
                                <div className="">
                                    <label>
                                        Confirm password
                                        <input
                                            type="password"
                                            className=""
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
                                            onChange={() => setAcceptTerms(acceptTerms => !acceptTerms)}
                                        />
                                        Terms&Conditions
                                    </label>
                                </div>
                            </>
                        }

                        <p className="pt-3 pl-1 text-red-600 font-medium">{errorMessage}</p>

                        {action ?
                            <div className="mt-8 flex flex-col gap-y-4">
                                <button type="submit" className="active:scale-[.98] active:duration-75
                                    hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-primary-yellow
                                    text-white text-lg font-bold">Sign in
                                </button>
                            </div>
                            :
                            <button type="submit">Create</button>
                        }
                    </form>

                    {action ?
                        <div className="mt-8 flex justify-center">
                            <p className="font-medium text-base pt-3">Don't have an account?</p>
                            <button type="button" onClick={() => {
                                setAction(false);
                                setFormToInitState();
                            }}
                                    className="text-blue-700 text-base font-medium ml-2"
                            >Sign up
                            </button>
                        </div>
                        :
                        <button type="button" onClick={() => {
                            setAction(true);
                            setFormToInitState();
                        }}>Back</button>
                    }

                </div>
            </div>
            <div className="hidden lg:flex lg:flex-col h-full items-center w-1/2 justify-center bg-primary-yellow">
                <div><p className="text-6xl flex-wrap font-bold">MonkeSwap&trade;</p></div>
                <div><img alt="asd" src="https://i.imgur.com/dWypbxr.png" className="w-60 h-60 animate-bounce"/></div>
            </div>
        </div>
    )
}

/*
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
const axios = useContext(HttpContext);

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
            setErrorMessage('Passwords must match');
        } else if (!isAdult) {
            setErrorMessage('You must be over the age of 18');
        } else if (!acceptTerms) {
            setErrorMessage('You need to accept terms & conditions');
        } else {
            axios.post('http://localhost:3000/auth/register', {username, email, password}, {headers: { Authorization: ''}})
                .then(async() => {
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
                                    type="password"
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
                <button type="button" id="buttonCancel" onClick={() => {
                    setAction(true);
                    setFormToInitState();
                }}>Back</button>
            }
        </div>
    </div>
);
}
*/
export default LoginRegister;