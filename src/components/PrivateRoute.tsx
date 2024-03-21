import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

function PrivateRoute() {
    const {token} = useContext(AuthContext);
    if(!token) return <Navigate to="/" />;
    return <Outlet/>
}

export default PrivateRoute;