import {createContext} from "react";
import LoginDataDto from "../interfaces/loginDataDto";

interface AuthContextProps {
    token: string | null,
    login: (user: LoginDataDto) => Promise<void>,
    logout: () => void,
    init: boolean;
}

export const AuthContext = createContext<AuthContextProps>(null as any);