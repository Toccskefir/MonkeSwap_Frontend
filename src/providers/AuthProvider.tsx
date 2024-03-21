import {ReactNode, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import axios from "../axios";
import LoginDataDto from "../interfaces/loginDataDto";
import {useNavigate} from "react-router-dom";
import UserDataDTO from "../interfaces/userDataDto";

interface AuthProviderProps {
    children: ReactNode;
}

function AuthProvider ({children}: AuthProviderProps) {
    const [user, setUser] = useState<UserDataDTO>();
    const [token, setToken] = useState(localStorage.getItem("accessToken") || null);
    const [init, setInit] = useState(false);

    const navigate = useNavigate();
    const config = {
        headers: {
            Authorization: 'Bearer ' + token?.toString()
        }
    }

    async function login(user: LoginDataDto) {
        await axios.post('auth/login', {email: user.email, password: user.password})
            .then((response) => {
                setToken(response.data.token);
                localStorage.setItem("accessToken", response.data.token);
                navigate('/homepage');
            })
            .catch((error) => {
                if (error.response) {
                    throw new Error(error.response.data);
                }
            });

    }

    function logout() {
        setToken(null);
        localStorage.removeItem("accessToken");
    }

    function getUserData() {
        axios.get('user', config)
            .then(response => {
               setUser(response.data);
            });
        return user;
    }

    return (
        <AuthContext.Provider value={{token, login, logout, getUserData, init}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;