import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

/**
 * * A React component that acts as a route guard for private routes.
 *  * It checks for authentication token in the context and redirects
 *  * to the login page if the token is not present.
 */
function PrivateRoute() {
    const {token} = useContext(AuthContext);
    if(!token) return <Navigate to="/login" />;
    return <Outlet />
}

export default PrivateRoute;