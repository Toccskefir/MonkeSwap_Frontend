import {ReactNode, useContext, useEffect, useState} from "react";
import {UserDataContext} from "../contexts/UserDataContext";
import UserData from "../interfaces/userData";
import {HttpContext} from "./HttpProvider";
import {AuthContext} from "../contexts/AuthContext";

interface UserDataProviderProps {
    children: ReactNode,
}

function UserDataProvider({children}: UserDataProviderProps) {
    const axios = useContext(HttpContext);
    const {token} = useContext(AuthContext);

    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {
        if (token) {
            axios.get('user')
                .then((response) => {
                    setUserData(response.data);
                });
        }
    }, [axios]);

    return(
        <UserDataContext.Provider value={{userData, setUserData}}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserDataProvider;