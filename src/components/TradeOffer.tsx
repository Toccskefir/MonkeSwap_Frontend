import TradeOfferData from "../interfaces/tradeOfferData";
import React, {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import {FaArrowDown, FaArrowUp, FaExchangeAlt} from "react-icons/fa";
import {Modal} from "@mui/material";
import ModalContent from "./ModalContent";
import ItemData from "../interfaces/itemData";
import {UserDataContext} from "../contexts/UserDataContext";
import PriceTier from "./PriceTier";

interface TradeOfferProps {
    tradeOffer: TradeOfferData,
    type: 'INCOMING' | 'OFFERED',
    onDelete: () => void,
}

function TradeOffer(props: TradeOfferProps) {
    const axios = useContext(HttpContext);
    const {userData} = useContext(UserDataContext);

    const [incomingItemData, setIncomingItemData] = useState<ItemData>();
    const [offeredItemData, setOfferedItemData] = useState<ItemData>();
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        getIncomingItemData();
        getOfferedItemData();
    }, []);

    function handleModalClose() {
        setOpenModal(false);
    }

    function getIncomingItemData() {
        axios.get('item/' + props.tradeOffer.incomingItem)
            .then((response) => {
                setIncomingItemData(response.data);
            });
    }

    function getOfferedItemData() {
        axios.get('item/' + props.tradeOffer.offeredItem)
            .then((response) => {
                setOfferedItemData(response.data);
            });
    }

    function acceptOffer() {
        axios.delete('tradeoffer/accept/' + props.tradeOffer.id)
            .then(() => {
                axios.post('/notification',
                    {
                            message: `Your trade offer has been accepted: ${offeredItemData?.title} for ${incomingItemData?.title}`,
                            type: 'NOTIFICATION',
                            userId: offeredItemData?.userId,
                    }).then(() => {
                    props.onDelete();
                });
            });
        handleModalClose();
    }

    function declineOffer() {
        axios.delete('tradeoffer/decline/' + props.tradeOffer.id)
            .then(() => {
                axios.post('/notification',
                    {
                        message: `Your trade offer has been declined: ${offeredItemData?.title} for ${incomingItemData?.title}`,
                        type: 'NOTIFICATION',
                        userId: offeredItemData?.userId,
                    }).then(() => {
                    props.onDelete();
                });
            });
        handleModalClose();
    }

    function deleteOffer() {
        axios.delete('tradeoffer/decline/' + props.tradeOffer.id)
            .then(() => {
                axios.post('/notification',
                    {
                        message: `${userData?.username} deleted a trade offer: ${offeredItemData?.title} for ${incomingItemData?.title}`,
                        type: 'NOTIFICATION',
                        userId: incomingItemData?.userId,
                    }).then(() => {
                    props.onDelete();
                });
            });
        handleModalClose();
    }

    return (
        <>
            <div className="w-full" onClick={() => setOpenModal(true)}>
                <div
                    className="border border-gray-300 rounded-md p-4 m-2.5 flex justify-start shadow-md items-center cursor-pointer hover:bg-gray-100 transition-colors duration-200">
                    {props.type === 'INCOMING' ?
                        <FaArrowDown className="text-green-700"/> :
                        <FaArrowUp className="text-green-700"/>
                    }
                    <div className="font-bold text-xl ml-6 text-black">
                        {props.type === 'INCOMING' ?
                            `Your ${incomingItemData?.title} has an offer for a ${offeredItemData?.title}` :
                            `You offered a ${offeredItemData?.title} for a ${incomingItemData?.title}`}
                    </div>
                </div>
            </div>
            <Modal open={openModal} onClose={handleModalClose} className="font-poppins m-2 h-screen">
                <ModalContent onClose={handleModalClose}>
                    <div className="flex flex-col">
                    <div className="flex pt-5 pb-8 px-2">
                        <div className="flex mr-5">
                            <div>
                                <p className="font-semibold -mt-10">Your item</p>
                                <img src={`data:image/png;base64, ${incomingItemData?.itemPicture}`}
                                     alt="incoming item picture"
                                     className="w-96 h-96 rounded-xl"/>
                            </div>
                            <div className="flex flex-col ml-3">
                                <p className="font-bold text-2xl w-72 break-words">{incomingItemData?.title}</p>
                                <p className="w-72 break-words">{incomingItemData?.description}</p>
                                <label className="font-bold">
                                    Category:
                                    <p className="font-normal">{incomingItemData?.category}</p>
                                </label>
                                <label className="font-bold">
                                    Price Tier:
                                    <div className="columns-5 w-fit">
                                        <PriceTier tier={incomingItemData?.priceTier as number}/>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="w-40 justify-center place-content-center">
                            <FaExchangeAlt className="h-32 w-32 text-primary-yellow border-2 border-black rounded-full p-3"/>
                        </div>

                        <div className="-mt-12 flex pt-5 pb-8 px-2">
                            <div className="flex mr-5">
                                <div>
                                    <p className="font-semibold -mt-10">Offered item</p>
                                    <img src={`data:image/png;base64, ${offeredItemData?.itemPicture}`}
                                         alt="incoming item picture"
                                         className="w-96 h-96 rounded-xl"/>
                                </div>
                                <div className="flex flex-col ml-3">
                                    <p className="font-bold text-2xl w-72 break-words">{offeredItemData?.title}</p>
                                    <p className="w-72 break-words">{offeredItemData?.description}</p>
                                    <label className="font-bold">
                                        Category:
                                        <p className="font-normal">{offeredItemData?.category}</p>
                                    </label>
                                    <label className="font-bold">
                                        Price Tier:
                                        <div className="columns-5 w-fit">
                                            <PriceTier tier={offeredItemData?.priceTier as number}/>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <label className="font-semibold">Comment:</label>
                        <p className="break-words">{props.tradeOffer.comment}</p>
                        {props.type === 'INCOMING' &&
                            <button onClick={acceptOffer} className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all rounded-xl
                    bg-primary-yellow w-28 py-2 mr-2 text-yellow-900 font-semibold">Accept</button>}
                        {props.type === 'INCOMING' &&
                            <button onClick={declineOffer} className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all rounded-xl
                    bg-red-600 w-28 py-2 text-white font-semibold">Decline</button>}
                        {props.type === 'OFFERED' &&
                            <button onClick={deleteOffer} className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all rounded-xl
                    bg-red-600 w-28 py-2 text-white font-semibold">Delete offer</button>}
                    </div>
                    </div>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TradeOffer;