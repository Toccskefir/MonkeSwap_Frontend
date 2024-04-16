import TradeOfferData from "../interfaces/tradeOfferData";
import {useContext, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import {FaArrowDown, FaArrowUp} from "react-icons/fa";
import {Modal} from "@mui/material";
import ModalContent from "./ModalContent";
import ItemData from "../interfaces/itemData";
import {UserDataContext} from "../contexts/UserDataContext";

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

    function openTradeOffer() {
        getIncomingItemData();
        getOfferedItemData();
        setOpenModal(true);
    }

    return (
        <>
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
            <Modal onClose={handleModalClose} open={openModal}>
                <ModalContent onClose={handleModalClose}>
                    <img src={incomingItemData?.itemPicture} alt="incoming item picture"/>
                    <p>{incomingItemData?.title}</p>
                    <p>{incomingItemData?.description}</p>
                    <p>{incomingItemData?.priceTier}</p>
                    <p>{incomingItemData?.category}</p>
                    {props.type === 'INCOMING' && <button onClick={acceptOffer}>Accept</button>}
                    {props.type === 'INCOMING' && <button onClick={declineOffer}>Decline</button>}
                    {props.type === 'OFFERED' && <button onClick={deleteOffer}>Delete offer</button>}
                    <img src={offeredItemData?.itemPicture} alt="incoming item picture"/>
                    <p>{offeredItemData?.title}</p>
                    <p>{offeredItemData?.description}</p>
                    <p>{offeredItemData?.priceTier}</p>
                    <p>{offeredItemData?.category}</p>
                </ModalContent>
            </Modal>
        </>
    );
}

export default TradeOffer;