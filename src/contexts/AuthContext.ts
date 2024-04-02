import {createContext} from "react";
import LoginData from "../interfaces/loginData";

interface AuthContextProps {
    token: string | null,
    login: (user: LoginData) => Promise<void>,
    logout: () => void,
    userDelete: () => void,
}

export const AuthContext = createContext<AuthContextProps>(null as any);