import {createContext} from "react";
import LoginData from "../interfaces/loginData";

interface AuthContextValue {
    token: string | null,
    login: (user: LoginData) => Promise<void>,
    logout: () => void,
}

export const AuthContext =
    createContext<AuthContextValue>(null as unknown as AuthContextValue);