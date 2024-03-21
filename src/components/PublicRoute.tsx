import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

function PublicRoute() {
    const {token} = useContext(AuthContext);
    if(token) return <Navigate to="/" replace />;
    return <Outlet />
}

export default PublicRoute;