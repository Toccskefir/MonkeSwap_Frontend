import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Link} from 'react-router-dom'

function Navbar() {
    const {token} = useContext(AuthContext);
    return (
        <nav>
            {!token ? null :
                <ul>
                    <li><Link to="/">Homepage</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                    <li><Link to="/tradeoffers">Trade offers</Link></li>
                    <li><Link to="/itemcreation">Item Creation</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                </ul>
            }
        </nav>
    );
}

export default Navbar;