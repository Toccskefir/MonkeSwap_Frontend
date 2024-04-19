import {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import TradeOfferData from "../interfaces/tradeOfferData";
import TradeOffer from "./TradeOffer";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

function TradeOffers() {
    const axios = useContext(HttpContext);

    const [incomingOffers, setIncomingOffers] = useState<TradeOfferData[]>([]);
    const [offeredOffers, setOfferedOffers] = useState<TradeOfferData[]>([]);
    const [type, setType] = useState<'INCOMING'|'OFFERED'>('INCOMING');
    const [errorMessage, setErrorMessage] = useState('Your incoming offers will be displayed here');

    useEffect(() => {
        getIncoming();
    }, [axios]);

    function getIncoming() {
        axios.get('tradeoffer/incoming')
            .then((response) => {
                setIncomingOffers(response.data);
                setErrorMessage('Your incoming offers will be displayed here');
            }).catch((error) => {
            if (error.response) {
                setErrorMessage(error.response.data);
            }
        });
    }

    function getOffered() {
        axios.get('tradeoffer/offered')
            .then((response) => {
                setOfferedOffers(response.data);
                setErrorMessage('Your outgoing offers will be displayed here');
            }).catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                }
        });
    }

    function handleTypeChangeIncoming() {
        setType('INCOMING');
        getIncoming();
    }

    function handleTypeChangeOffered() {
        setType('OFFERED');
        getOffered();
    }

    if (type === 'INCOMING') {
        return (
            <>
                <div className="flex mt-3 ml-3 mb-3">
                <button className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all w-52 py-2 px-2 rounded-xl bg-primary-yellow
                        text-yellow-900 text-lg font-bold flex" onClick={handleTypeChangeIncoming}>Incoming offers<FaArrowDown className="h-6 ml-9"/></button>
                <button className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all w-52 py-2 px-2 rounded-xl bg-primary-yellow
                        text-yellow-900 text-lg font-bold flex ml-3" onClick={handleTypeChangeOffered}>Outgoing offers<FaArrowUp className="h-6 ml-9"/></button>
                </div>

                {incomingOffers.length === 0 ?
                    <div className="text-4xl text-center text-black m-5">
                        {errorMessage}
                    </div> :
                    <div  className="mb-72">
                        {incomingOffers
                            .sort((tradeOfferA, tradeOfferB) => tradeOfferB.id - tradeOfferA.id)
                            .map((tradeOffer) => (
                            <TradeOffer
                                key={tradeOffer.id}
                                tradeOffer={tradeOffer}
                                type={type}
                                onDelete={getIncoming}
                            />
                        ))}
                    </div>
                }

            </>
        );
    } else {
        return (
            <>
                <div className="flex mt-3 ml-3 mb-3">
                    <button className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all w-52 py-2 px-2 rounded-xl bg-primary-yellow
                        text-yellow-900 text-lg font-bold flex" onClick={handleTypeChangeIncoming}>Incoming
                        offers<FaArrowDown className="h-6 ml-9"/></button>
                    <button className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all w-52 py-2 px-2 rounded-xl bg-primary-yellow
                        text-yellow-900 text-lg font-bold flex ml-3" onClick={handleTypeChangeOffered}>Outgoing
                        offers<FaArrowUp className="h-6 ml-9"/></button>
                </div>

                {offeredOffers.length === 0 ?
                    <div className="text-4xl text-center text-black m-5">
                        {errorMessage}
                    </div> :
                    <div>
                        {offeredOffers
                            .sort((tradeOfferA, tradeOfferB) => tradeOfferB.id - tradeOfferA.id)
                            .map((tradeOffer) => (
                                <TradeOffer
                                    key={tradeOffer.id}
                                    tradeOffer={tradeOffer}
                                    type={type}
                                    onDelete={getOffered}
                                />
                            ))}
                    </div>
                }
            </>
        );
    }

}

export default TradeOffers;