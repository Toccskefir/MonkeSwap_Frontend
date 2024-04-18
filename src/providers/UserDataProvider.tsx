import {ReactNode, useContext, useEffect, useState} from "react";
import {UserDataContext} from "../contexts/UserDataContext";
import UserData from "../interfaces/userData";
import {HttpContext} from "./HttpProvider";
import {AuthContext} from "../contexts/AuthContext";
import ItemData from "../interfaces/itemData";

interface UserDataProviderProps {
    children: ReactNode,
}

function UserDataProvider({children}: UserDataProviderProps) {
    const axios = useContext(HttpContext);
    const {token} = useContext(AuthContext);

    const [userData, setUserData] = useState<UserData | null>(null);
    const [userItems, setUserItems] = useState<ItemData[]>([]);

    useEffect(() => {
        if (token) {
            axios.get('user')
                .then((response) => {
                    setUserData(response.data);
                    loadItems();
                });
        }
    }, [axios]);

    function loadItems() {
        axios.get('user/items')
            .then((response) => {
                setUserItems(response.data);
            });
    }

    return(
        <UserDataContext.Provider value={{userData, userItems, setUserData, setUserItems, loadItems}}>
            {children}
        </UserDataContext.Provider>
    );
}

export default UserDataProvider;