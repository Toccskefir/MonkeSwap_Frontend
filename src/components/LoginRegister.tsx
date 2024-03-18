import React, {useState} from 'react';
import './LoginRegister.css';
import 'bootstrap/dist/css/bootstrap.css'

function LoginRegister() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [action, setAction] = useState(true);

    return (
        <div className="d-flex justify-content-center">
            <div className="w-50 border">

                <h1>{action ? "Login" : "Account creation"}</h1>

                <form>
                    {action ? null :
                        <div className="form-group">
                            <label>
                                Username
                                <input type="text" className="form-control" id="inputUsername"
                                       placeholder="Monke" value={username}/>
                            </label>
                        </div>
                    }

                    <div className="form-group">
                        <label>
                            Email
                            <input type="text" className="form-control" id="inputEmail"
                                   placeholder="monke@swap.com" value={email}/>
                        </label>
                    </div>

                    <div className="form-group">
                        <label>
                            Password
                            <input type="password" className="form-control" id="inputPassword"
                                   placeholder="********" value={password}/>
                        </label>
                    </div>

                    {action ? null :
                        <>
                            <div className="form-group">
                                <label>
                                    Confirm password
                                    <input type="text" className="form-control" id="inputPasswordAgain"
                                           placeholder="********" value={passwordAgain}/>
                                </label>
                            </div>
                            <div className="form-check">
                                <label>
                                    <input type="checkbox" className="form-check-input" id="checkBoxIsAdult"/>
                                    I am over the age of 18
                                </label>
                            </div>
                            <div className="form-check">
                                <label>
                                    <input type="checkbox" className="form-check-input" id="checkBoxAcceptTerms"/>
                                    Terms&Conditions
                                </label>
                            </div>
                        </>
                    }

                    {action ?
                        <button type="submit" id="buttonLogin">Login</button>
                        :
                        <button type="submit" id="buttonRegistration">Create</button>
                    }
                </form>

                {action ?
                    <button type="button" id="buttonChangeToRegister" onClick={() => setAction(false)}>Register</button>
                    :
                    <button type="submit" id="buttonCancel" onClick={() => setAction(true)}>Back</button>
                }
            </div>
        </div>
    );
}

export default LoginRegister;