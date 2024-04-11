import {createContext} from "react";
import LoginData from "../interfaces/loginData";
import UserData from "../interfaces/userData";

interface AuthContextProps {
    token: string | null,
    userData: UserData | null,
    setUserData: (userData: UserData) => void,
    login: (user: LoginData) => Promise<void>,
    logout: () => void,
}

export const AuthContext = createContext<AuthContextProps>(null as any);