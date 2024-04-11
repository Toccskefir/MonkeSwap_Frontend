import default_profile_pic from "../assets/default_profile_pic.png";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Link} from 'react-router-dom'
import {FiMenu} from "react-icons/fi";
import {FaBell} from "react-icons/fa";
import {IoCloseOutline} from "react-icons/io5";
import clsx from "clsx";
import {UserDataContext} from "../contexts/UserDataContext";

function Navbar() {
    const {token, logout} = useContext(AuthContext);
    const {userData} = useContext(UserDataContext);

    const [isSideMenuOpen, setMenu] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [profilePicture, setProfilePicture] = useState(userData?.profilePicture);

    useEffect(() => {
        setProfilePicture(userData?.profilePicture);
    }, [userData]);

    const navLinks =
        [
            { label: "Trade Offers", href: "/tradeoffers"},
            { label: "Create Item", href: "/createitem"},
            { label: "Inventory", href: "/inventory"},
        ]

    function handleSideMenuClosing(){
        setMenu(true);
        setIsOpen(false);
    }

    function handleLogOut() {
        setIsOpen(false);
        logout();
    }

    return (
        <>
            {!token ? null:
                <main>
                    {/*Large navbar*/}
                    <nav className="flex justify-between px-4 items-center py-6 font-poppins
            w-full lg:px-24 md:px-0 bg-primary-yellow relative z-40">
                        <div className="flex items-center gap-8">
                            <section className="flex items-center gap-4">
                                <FiMenu className="text-3xl cursor-pointer text-yellow-900 lg:hidden md:ml-7 md:mt-1
                        hover:text-black hover:font-bold transition-all duration-300" onClick={handleSideMenuClosing}/>
                                <Link to="/"
                                      className="text-4xl font-poppins no-underline text-black font-bold max-sm:ml-7 max-sm:text-2xl">
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
                            <section className="bg-primary-yellow flex-col left-0 top-0 h-screen
                 p-8 gap-8 w-56 flex">
                                <IoCloseOutline className="mt-0 mb-8 ml-8 text-3xl cursor-pointer text-yellow-900
                    hover:text-black hover:font-bold transition-all duration-300" onClick={() => setMenu(false)}/>
                                {navLinks.map((d, i) => (
                                    <Link to={d.href} key={i} className="no-underline text-yellow-900 font-semibold
                        hover:text-black hover:font-bold transition-all duration-300" onClick={() => setMenu(false)}>
                                        {d.label}
                                    </Link>
                                ))}
                                <p className="position-fixed bottom-3 left-10">MonkeSwap&trade; 2024</p>
                            </section>
                        </div>

                        {/*Notifications icon and avatar*/}
                        <section className="flex items-center md:px-0 gap-4">
                            <Link to="/notifications"><FaBell className="block text-3xl
                            cursor-pointer text-yellow-900 hover:text-black
                 transition-colors duration-200 max-sm:hidden"/></Link>
                            <button className="rounded-full border-3 border-yellow-900 hover:border-black
                 transition-colors duration-200 focus:border-black"
                                    onClick={()=> setIsOpen(prev => !prev)}>
                                <img className="h-12 w-12 max-sm:h-8 max-sm:w-8 rounded-full cursor-pointer"
                                     src={profilePicture ? `data:image/png;base64, ${profilePicture}` : default_profile_pic}
                                     alt="avatar-img"/>
                            </button>
                        </section>
                    </nav>
                    {isOpen && (
                        <div className="top-20 right-8 absolute w-60 bg-white rounded-lg shadow-xl
                         border-gray-400 border-1 font-semibold z-40">
                            <Link to="/profile"
                                  className="block px-4 py-2 text-gray-950 hover:bg-yellow-900
                              hover:text-white rounded-lg no-underline" onClick={()=> setIsOpen(false)}>Profile</Link>
                            <Link to="/notifications"
                                  className="block sm:hidden px-4 py-2 text-gray-950 hover:bg-yellow-900
                              hover:text-white rounded-lg no-underline" onClick={()=> setIsOpen(false)}>Notifications</Link>
                            <button className="block w-full text-left px-4 py-2 text-gray-950 hover:bg-yellow-900
                        hover:text-white rounded-lg no-underline" onClick={handleLogOut}>Log out</button>
                        </div>
                    )}
                </main>
            }
        </>
    );
}

export default Navbar;