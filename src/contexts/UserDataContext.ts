import UserData from "../interfaces/userData";
import React from "react";

interface UserDataContextValue {
    userData: UserData | null,
    setUserData: (user: UserData) => void,
}

export const UserDataContext =
    React.createContext<UserDataContextValue>(null as unknown as UserDataContextValue);