import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";

function Navbar() {
    const {token} = useContext(AuthContext);
    return (
        <nav>
            {!token ? null :
                <ul>
                    <li><a href="/">Homepage</a></li>
                    <li><a href="/notifications">Notifications</a></li>
                    <li><a href="/tradeoffers">Trade offers</a></li>
                    <li><a href="/itemcreation">Item Creation</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
            }
        </nav>
    );
}

export default Navbar;