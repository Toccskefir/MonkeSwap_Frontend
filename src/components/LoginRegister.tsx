import React, {useContext, useState} from 'react';
import {AuthContext} from "../contexts/AuthContext";
import {HttpContext} from "../providers/HttpProvider";
import ImageTransition from "./ImageTransition";

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
        <div className="flex w-full h-screen font-poppins overflow-hidden">
            <div className="w-full flex items-center justify-center lg:w-1/2 bg-gray-100">
                <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-200">

                    {action ? <div><h1 className="text-5xl font-semibold">Login</h1>
                            <p className="font-medium text-lg text-gray-500 mt-4">Welcome back! Please enter your
                                details!</p>
                        </div>
                        :
                        <div><h1 className="text-5xl font-semibold">Sign up</h1>
                        </div>}

                    <form onSubmit={handleSubmitEvent}>
                        <div className="mt-8">
                            <label className="font-medium">
                                Email
                                <input
                                    type="text"
                                    className="w-full border-2 border-gray-100 rounded-xl pr-28 pt-3 pb-3 pl-3 mt-1"
                                    placeholder="monke@swap.com"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </label>
                        </div>

                        {action ? null :
                            <div className="mt-3">
                                <label className="font-medium">
                                    Username
                                    <input
                                        type="text"
                                        className="w-full border-2 border-gray-100 rounded-xl padding_right_4_75_rem pt-3 pb-3 pl-3 mt-1"
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
                                    className="w-full border-2 border-gray-100 rounded-xl pr-20 pt-3 pb-3 pl-3 mt-1"
                                    placeholder="**********"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </label>
                        </div>


                        {action ? null :
                            <>
                                <div className="mt-3">
                                    <label className="font-medium">
                                        Confirm password
                                        <input
                                            type="password"
                                            className="w-full border-2 border-gray-100 rounded-xl pr-2 pt-3 pb-3 pl-3 mt-1"
                                            placeholder="**********"
                                            value={passwordAgain}
                                            onChange={event => setPasswordAgain(event.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-check mt-3">
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

                        <p className="pt-3 pl-1 text-red-600 font-medium ">{errorMessage}</p>

                        {action ?
                            <div className="mt-6 flex flex-col gap-y-4">
                                <button type="submit" className="active:scale-[.98] active:duration-75
                                    hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-primary-yellow
                                    text-white text-lg font-bold">Sign in
                                </button>
                            </div>
                            :
                            <div className="flex flex-col">
                            <button type="submit" className="active:scale-[.98] active:duration-75
                                    hover:scale-[1.01] ease-in-out transition-all py-3 rounded-xl bg-primary-yellow
                                    text-white text-lg font-bold">Sign up</button>
                            </div>
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
                        <div className="mt-6 flex justify-center">
                            <p className="font-medium text-base pt-3">Already have an account?</p>
                            <button type="button" onClick={() => {
                                setAction(true);
                                setFormToInitState();
                            }} className="text-blue-700 text-base font-medium ml-2"
                            >Log in
                            </button>
                        </div>
                    }

                </div>
            </div>
            <div className="hidden lg:flex lg:flex-col h-full items-center w-1/2 justify-center bg-primary-yellow">
                <div><p className="text-6xl font-bold">Welcome to</p>
                    <p className="ml-14 text-4xl flex-wrap font-bold">MonkeSwap&trade;</p></div>
                <ImageTransition imageUrl="https://i.imgur.com/dWypbxr.png"/>
            </div>
        </div>
    )
}
export default LoginRegister;