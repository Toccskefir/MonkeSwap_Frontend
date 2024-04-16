import TradeOfferData from "../interfaces/tradeOfferData";
import {useContext, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import ItemCardData from "../interfaces/itemCardData";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";

interface TradeOfferProps {
    tradeOffer: TradeOfferData,
    type: 'INCOMING' | 'OFFERED',
    accept: () => void,
    decline: () => void,
}

function TradeOffer(props: TradeOfferProps) {
    const axios = useContext(HttpContext);

    const [incomingItemData, setIncomingItemData] = useState<ItemCardData>();
    const [offeredItemData, setOfferedItemData] = useState<ItemCardData>();

    function getIncomingItemData() {
        axios.get('item/' + props.tradeOffer.incomingItemId)
            .then((response) => {
                setIncomingItemData(response.data);
            });
    }

    function getOfferedItemData() {
        axios.get('item/' + props.tradeOffer.offeredItemId)
            .then((response) => {
                setOfferedItemData(response.data);
            });
    }

    function acceptOffer() {
        axios.delete('tradeoffer/accept/' + props.tradeOffer.id);
    }

    function declineOffer() {
        axios.delete('tradeoffer/decline/' + props.tradeOffer.id);
    }

    function openTradeOffer() {

    }

    return (
        <div className="w-full" onClick={openTradeOffer}>
            <div
                className="border border-gray-300 rounded-md p-4 m-2.5 flex justify-start shadow-md items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                {props.type === 'INCOMING' ?
                    <FaArrowDown className="text-green-700"/> :
                    <FaArrowUp className="text-green-700"/>
                }
                <div className="font-bold text-xl ml-6 text-black">
                    {props.tradeOffer.comment}
                </div>
            </div>
        </div>
    );
}

export default TradeOffer;