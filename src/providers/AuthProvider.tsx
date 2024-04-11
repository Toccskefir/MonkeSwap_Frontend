import {ReactNode, useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import LoginData from "../interfaces/loginData";
import {useNavigate} from "react-router-dom";
import {HttpContext} from "./HttpProvider";
import UserData from "../interfaces/userData";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider ({children}: AuthProviderProps) {
    const [token, setToken] = useState(localStorage.getItem('accessToken') || null);
    const [userData, setUserData] = useState<UserData | null>(null);

    const navigate = useNavigate();

    const axios = useContext(HttpContext);

    async function getUserData(token: string) {
        await axios.get('user', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then((response) => {
                console.log(response.data.profilePicture)
                setUserData(response.data);
            });
    }

    async function login(user: LoginData) {
        await axios.post('http://localhost:3000/auth/login', {email: user.email, password: user.password},
            {headers: { Authorization: ''}} )
            .then((response) => {
                const token = response.data.token
                setToken(token);
                localStorage.setItem('accessToken', token);
                getUserData(token);
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
        <AuthContext.Provider value={{token, userData, setUserData, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;