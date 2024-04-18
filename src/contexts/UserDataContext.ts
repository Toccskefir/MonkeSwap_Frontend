import UserData from "../interfaces/userData";
import React from "react";
import ItemData from "../interfaces/itemData";

interface UserDataContextValue {
    userData: UserData | null,
    setUserData: (user: UserData) => void,
    userItems: ItemData[],
    setUserItems: (items: ItemData[]) => void,
    loadItems: () => void,
}

export const UserDataContext =
    React.createContext<UserDataContextValue>(null as unknown as UserDataContextValue);