import {ReactNode, useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import LoginData from "../interfaces/loginData";
import {useNavigate} from "react-router-dom";
import {HttpContext} from "./HttpProvider";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider ({children}: AuthProviderProps) {
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null);

    const navigate = useNavigate();

    const axios = useContext(HttpContext);

    async function login(user: LoginData) {
        await axios.post('http://localhost:8080/auth/login', {email: user.email, password: user.password},
            {headers: { Authorization: ''}} )
            .then((response) => {
                setToken(response.data.token);
                localStorage.setItem('accessToken', response.data.token);
                navigate('/');
            })
            .catch((error) => {
                if (error.response) {
                    throw new Error(error.response.data);
                }
            });

    }

    function logout() {
        setToken(null);
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    function userDelete() {
        axios.delete('user')
            .then(() => {
                setToken(null);
                localStorage.removeItem('accessToken');
                navigate('/login');
            });
    }

    return (
        <AuthContext.Provider value={{token, login, logout, userDelete}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;