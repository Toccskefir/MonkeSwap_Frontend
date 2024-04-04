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
            { label: "Trade Offers", href: "/tradeoffers"},
            { label: "Create Item", href: "/itemcreation"},
            { label: "Inventory", href: "/inventory"},
        ]

    return (
        <>
            {!token ? null:
                <main>
                    {/*Large navbar*/}
                    <nav className="flex justify-between px-4 items-center py-6 font-poppins
            lg:px-24 md:px-0 bg-yellow-500">
                        <div className="flex items-center gap-8">
                            <section className="flex items-center gap-4">
                                <FiMenu className="text-3xl cursor-pointer text-yellow-900 lg:hidden md:ml-7 md:mt-1
                        hover:text-black hover:font-bold transition-all duration-300" onClick={() => setMenu(true)}/>
                                <Link to="/"
                                      className="text-4xl font-poppins no-underline text-black font-bold max-sm:ml-7">
                                    MonkeSwap
                                </Link>
                                <img className="h-8 w-8 rounded-full" src="https://i.imgur.com/dWypbxr.png"
                                     alt="monkeswap_logo"/>
                            </section>
                            {navLinks.map((d, i) => (
                                <Link to={d.href} key={i} className="hidden lg:block text-yellow-900
                         hover:text-black hover:font-bold transition-all duration-300 no-underline font-semibold">
                                    {d.label}
                                </Link>
                            ))}
                        </div>

                        {/*Blur*/}
                        <div className={clsx("fixed h-full w-screen lg:hidden bg-black/50 " +
                            "backdrop-blur-sm top-0 right-0 -translate-x-full transition-all", isSideMenuOpen && "translate-x-0")}>

                            {/*SideMenu*/}
                            <section className="bg-yellow-500 flex-col absolute left-0 top-0 h-screen
                 p-8 gap-8 z-50 w-56 flex">
                                <IoCloseOutline className="mt-0 mb-8 text-3xl cursor-pointer text-yellow-900
                    hover:text-black hover:font-bold transition-all duration-300" onClick={() => setMenu(false)}/>
                                {navLinks.map((d, i) => (
                                    <Link to={d.href} key={i} className="no-underline text-yellow-900 font-semibold
                        hover:text-black hover:font-bold transition-all duration-300">
                                        {d.label}
                                    </Link>
                                ))}
                                <p className="position-fixed bottom-3 left-3">MonkeSwap© 2024</p>
                            </section>
                        </div>

                        {/*Notifications icon and avatar*/}
                        <section className="flex items-center md:px-0 gap-4">
                            <Link to="/notifications"><FaInbox className="block text-3xl cursor-pointer text-yellow-900 hover:text-black
                 transition-colors duration-200 max-sm:hidden"/></Link>
                            <button className="rounded-full border-3 border-yellow-900 hover:border-black
                 transition-colors duration-200 focus:border-black">
                                <img className="h-12 w-12 rounded-full cursor-pointer"
                                     src="https://i.imgur.com/61LN9Ye.jpeg"
                                     alt="avatar-img"/>
                            </button>
                        </section>
                    </nav>
                    <div className="mt-2 py-2 w-60 bg-white rounded-lg shadow-xl">
                        <Link to="#"
                              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500
                              hover:text-white no-underline">Profile</Link>
                        <Link to="#"
                              className="block px-4 py-2 text-gray-800 hover:bg-indigo-500
                              hover:text-white no-underline">Notifications</Link>
                        <Link to="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500
                        hover:text-white no-underline">Log
                            out</Link>
                    </div>
                </main>
                /*export default{
                data(){
                return{
                isOpen: false
            }
            }
            }*/
            }
        </>
    );
}

export default Navbar;