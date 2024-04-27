import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

/**
 * A React function component that serves as a route guard for public routes.
 * It checks for the absence of an authentication token in the context and
 * redirects to the home page if the token is present.
 */
function PublicRoute() {
    const {token} = useContext(AuthContext);
    if(token) return <Navigate to="/" replace />;
    return <Outlet />
}

export default PublicRoute;