import {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import TradeOfferData from "../interfaces/tradeOfferData";
import TradeOffer from "./TradeOffer";

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
                <button
                    /*className="active:scale-[.98] active:duration-75
                                    hover:scale-[1.01] ease-in-out transition-all mt-72 mr-2 w-20 py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold col-span-2"*/
                    onClick={handleTypeChangeIncoming}>
                    Incoming offers
                </button>
                <button onClick={handleTypeChangeOffered}>Outgoing offers</button>

                {incomingOffers.length === 0 ?
                    <div className="text-4xl text-center text-black m-5">
                        {errorMessage}
                    </div> :
                    <div>
                        {incomingOffers.map((tradeOffer) => (
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
                <button onClick={handleTypeChangeIncoming}>Incoming offers</button>
                <button onClick={handleTypeChangeOffered}>Outgoing offers</button>

                { offeredOffers.length === 0 ?
                    <div className="text-4xl text-center text-black m-5">
                        {errorMessage}
                    </div> :
                    <div>
                        {offeredOffers.map((tradeOffer) => (
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