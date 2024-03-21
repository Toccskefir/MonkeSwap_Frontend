import {ReactNode, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import axios from "../axios";
import LoginDataDto from "../interfaces/loginDataDto";
import {useNavigate} from "react-router-dom";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider ({children}: AuthProviderProps) {
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null);
    const [init, setInit] = useState(false);

    const navigate = useNavigate();

    async function login(user: LoginDataDto) {
        await axios.post('auth/login', {email: user.email, password: user.password},
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
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{token, login, logout, init}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;