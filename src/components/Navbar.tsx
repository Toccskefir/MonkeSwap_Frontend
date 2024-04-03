import {useContext, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Link} from 'react-router-dom'
import {FiMenu} from "react-icons/fi";
import {FaInbox} from "react-icons/fa";
import {IoCloseOutline} from "react-icons/io5";
import clsx from "clsx";

export function Navbar() {
    const {token} = useContext(AuthContext);

    const [isSideMenuOpen, setMenu] = useState(false);

    const navLinks =
        [
            { label: "Home", href: "/"},
            { label: "Trade Offers", href: "/tradeoffers"},
            { label: "Create Item", href: "/itemcreation"},
            { label: "Inventory", href: "/inventory"},
            { label: "Profile", href: "/profile"},
        ]

    return (
        <>
            {!token ? null:
        <main>
            {/*Large navbar*/}
            <nav className="flex justify-between px-8 items-center py-6 font-poppins lg:px-24 md:px-0">
                <div className="flex items-center gap-8">
                    <section className="flex items-center gap-4">
                        <FiMenu className="text-3xl cursor-pointer lg:hidden md:ml-7 md:mt-1 " onClick={() => setMenu(true)}/>
                        <Link to="/" className="text-4xl font-poppins no-underline text-black font-bold">
                            MonkeSwap
                        </Link>
                        <img className="h-8 w-8 rounded-full" src="https://i.imgur.com/dWypbxr.png" alt="avatar-img"/>
                    </section>
                    {navLinks.map((d, i) => (
                        <Link to={d.href} key={i} className="hidden lg:block text-gray-400
                         hover:text-black no-underline">
                            {d.label}
                        </Link>
                    ))}
                </div>

                {/*Blur*/}
            <div className={clsx("fixed h-full w-screen lg:hidden bg-black/50 " +
                "backdrop-blur-sm top-0 right-0 -translate-x-full transition-all", isSideMenuOpen && "translate-x-0")}>

                {/*SideMenu*/}
                <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen
                 p-8 gap-8 z-50 w-56 flex">
                    <IoCloseOutline className="mt-0 mb-8 text-3xl cursor-pointer" onClick={()=>setMenu(false)}/>
                    {navLinks.map((d,i) =>(
                        <Link to={d.href} key={i} className="font-bold no-underline text-black">
                            {d.label}
                        </Link>
                    ))}
                </section>
            </div>

                {/*Notifications icon and avatar*/}
            <section className="flex items-center md:px-0 gap-4">
                <FaInbox className="text-3xl cursor-pointer"/>
                <img className="h-8 w-8 rounded-full" src="https://i.imgur.com/61LN9Ye.jpeg" alt="avatar-img"/>
            </section>
            </nav>

            <hr className="lg:mx-24"/>
        </main>
            }
    </>
);
}

export default Navbar;