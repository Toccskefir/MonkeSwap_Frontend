import React, {ReactNode, useContext, useMemo} from "react";
import axios, {AxiosInstance} from "axios";
import {AuthContext} from "../contexts/AuthContext";

interface HttpContextProviderProps {
    children: ReactNode;
}

export const HttpContext = React.createContext<AxiosInstance>(axios);

function createAxios(token: string|null){
    if (token) {
        return axios.create({
            baseURL: "http://localhost:8080/",
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    } else {
        return axios.create();
    }

}

function HttpProvider({children}: HttpContextProviderProps) {
    const {token} = useContext(AuthContext);

    const axios = useMemo(()=>{
        return createAxios(token);
    },[token]);

    return (
        <HttpContext.Provider value={axios}>
            {children}
        </HttpContext.Provider>
    );
}

export default HttpProvider;