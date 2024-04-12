import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Link} from "react-router-dom";


function Footer() {
    const {token} = useContext(AuthContext);

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return(
        <>
            {!token ? null :
                <footer className="relative text-black bg-primary-yellow mt-32 -z-0">
                    <div className="absolute top-0 left-0 w-full overflow-hidden">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                             preserveAspectRatio="none">
                            <path
                                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                                className="relative block fill-white">
                            </path>
                        </svg>
                    </div>
                    <div
                        className="grid lg:grid-cols-4 md:grid-cols-2 max-md:grid-cols-1 max-md:justify-items-center grid-cols-1 p-20 pt-44">
                        <div className="flex flex-col gap-4 max-md:mr-5">
                            <img className="h-20 w-20 ml-7" src="https://i.imgur.com/dWypbxr.png"
                                 alt="monkeswap_logo"/>
                            <h4 className="text-2xl text-black">MonkeSwap&trade;</h4>
                        </div>

                        <div className="flex flex-col gap-4 max-md:mr-20">
                            <h2 className="text-3xl text-yellow-900">Profile</h2>
                            <Link to="/profile" className="lg:block w-2 text-yellow-900
                         hover:text-black transition-all duration-150 no-underline font-semibold" onClick={scrollToTop}>
                                Profile
                            </Link>
                            <Link to="/notifications" className="lg:block w-2 text-yellow-900
                         hover:text-black transition-all duration-150 no-underline font-semibold" onClick={scrollToTop}>
                                Notifications
                            </Link>
                        </div>

                        <div className="flex flex-col gap-4 max-md:mr-12">
                            <h2 className="text-3xl text-yellow-900">Items</h2>
                            <Link to="/tradeoffers" className="lg:block w-28 text-yellow-900
                         hover:text-black transition-all duration-150 no-underline font-semibold" onClick={scrollToTop}>
                                Trade Offers
                            </Link>
                            <Link to="/createitem" className="lg:block w-24 text-yellow-900
                         hover:text-black transition-all duration-150 no-underline font-semibold" onClick={scrollToTop}>
                                Create Item
                            </Link>
                            <Link to="/inventory" className="lg:block w-2 text-yellow-900
                         hover:text-black transition-all duration-150 no-underline font-semibold" onClick={scrollToTop}>
                                Inventory
                            </Link>
                        </div>

                        <div className="flex flex-col gap-3">
                            <h2 className="text-3xl text-yellow-900">Contact us</h2>
                            <p className="lg:block pt-2">monkeswap@gmail.com</p>
                            <p className="lg:block">+36 20 4276 420</p>
                            <p className="lg:block">Budapest, Hungary</p>
                        </div>

                    </div>

                    <div className="text-center">
                        <p>All rights reserved.
                            MonkeSwap&trade; 2024</p></div>
                </footer>
            }
        </>
    )

}

export default Footer;