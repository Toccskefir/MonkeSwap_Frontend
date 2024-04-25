import React, {useContext, useEffect, useState} from "react";
import ItemCard from "./ItemCard";
import {HttpContext} from "../providers/HttpProvider";
import categoryList from "../constants/categoryList";
import {Modal} from "@mui/material";
import ModalContent from "./ModalContent";
import ItemData from "../interfaces/itemData";
import PriceTier from "./PriceTier";
import {UserDataContext} from "../contexts/UserDataContext";
import {FaFlag} from "react-icons/fa";

function Homepage() {
    const axios = useContext(HttpContext);
    const { userData, userItems } = useContext(UserDataContext);

    const [itemList, setItemList] = useState<ItemData[]>([]);
    const [incomingItem, setIncomingItem] = useState<ItemData>();
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('Advertised items will be displayed here');
    const [errorMessageOffer, setErrorMessageOffer] = useState('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        loadCards();
    }, [axios]);

    function handleModalClose() {
        setOpenModal(false);
        setErrorMessageOffer('');
        setComment('');
    }

    function loadCards() {
        axios.get('items')
            .then((response) => {
                setItemList(response.data);
            })
            .catch((error) => {
                if(error.response) {
                    setErrorMessage(error.response.data);
                }
            });
    }

    function handleCategoryFilterChange(category: string) {
        if (category === 'ALL') {
            loadCards();
        } else {
            axios.get('items/' + category)
                .then((response) => {
                    setItemList(response.data);
                })
                .catch((error) => {
                    if(error.response) {
                        setErrorMessage(error.response.data);
                    }
                });
        }
    }

    function handleViewButtonClick(item: ItemData) {
        axios.put('item/views/' + item.id)
            .then(() => {
                setOpenModal(true);
                setIncomingItem(item);
            });
    }

    function handleItemReport() {
        axios.put('item/reports/' + incomingItem?.id)
            .then(() => {
                handleModalClose();
            }).catch((error) => {
                if (error.response) {
                    setErrorMessageOffer(error.response.data);
                }
        });
    }

    function handleOfferSend(item: ItemData) {
        axios.post('tradeoffer', {
            offeredItem: item.id,
            incomingItem: incomingItem?.id,
            comment: comment
        }).then(() => {
                axios.post('notification', {
                    message: `${userData?.username} sent you a trade offer!`,
                    type: 'NOTIFICATION',
                    userId: incomingItem?.userId,
                }).then(() => {
                    handleModalClose();
                }).catch((error) => {
                    if (error.response) {
                        setErrorMessageOffer(error.response.data);
                    }
                });
            }).catch((error) => {
                if (error.response) {
                    setErrorMessageOffer(error.response.data);
                }
        });
    }

    return(
        <div className="font-poppins">
            <div className="text-center mt-3">
                <label className="font-semibold text-xl">
                    Filter by category
                    <select
                        defaultValue="ALL"
                        onChange={(event) => handleCategoryFilterChange(event.target.value)}
                        className="ml-3 p-1 border-black border-2 rounded-xl text-xl"
                    >
                        <option value="ALL">All</option>
                        {categoryList.map(item => (
                            <option
                                key={item}
                                value={item.toUpperCase().replaceAll(' ', '')}
                            >
                                {item}
                            </option>
                        ))}
                    </select>
                </label>
            </div>
            {itemList.length === 0 ?
                <div className="text-4xl text-center text-black m-5">
                    {errorMessage}
                </div> :
            <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center place-items-center">
                {itemList
                    .sort((itemA, itemB) => itemB.id - itemA.id)
                    .map((item) => (
                        <ItemCard
                            item={{...item, itemPicture: `data:image/png;base64, ${item.itemPicture}`}}
                            onButtonClick={() => handleViewButtonClick(item)}
                            showViews={true}
                            buttonText="View"
                        />
                    ))}
            </div>
            }
            <Modal open={openModal} onClose={handleModalClose} className="font-poppins m-2 h-screen">
                <ModalContent onClose={handleModalClose}>
                    <div className="flex pt-5 pb-8 px-2">
                        <div className="flex w-1/2 mr-5">
                            <div>
                                <img src={`data:image/png;base64, ${incomingItem?.itemPicture}`}
                                     alt="incoming item picture"
                                     className="w-96 h-96 mb-3 rounded-xl"/>
                                <p className="text-red-600 mt-3">{errorMessageOffer}</p>

                                <div className="flex flex-col">
                                    <input
                                        type="text"
                                        placeholder="Write a comment for your trade offer"
                                        className="pl-2 pt-1 pb-1 border-2 border-gray-300 rounded-xl w-96 h-12"
                                        value={comment}
                                        onChange={event => setComment(event.target.value)}
                                    />
                                    <button onClick={handleItemReport} className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all w-36 py-2 pl-3 mt-3 rounded-xl bg-red-600
                    text-white text-base font-bold flex">Report item<FaFlag className="h-6 ml-2"/></button>
                                </div>
                            </div>
                            <div className="flex flex-col ml-3">
                                <p className="font-bold text-2xl w-72 break-words">{incomingItem?.title}</p>
                                <p className="w-72 break-words">{incomingItem?.description}</p>
                                <label className="font-bold">
                                    Category:
                                    <p className="font-normal">{incomingItem?.category}</p>
                                </label>
                                <label className="font-bold">
                                    Price Tier:
                                    <div className="columns-5 w-fit">
                                        <PriceTier tier={incomingItem?.priceTier as number}/>
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div className="-mt-12 overflow-x-auto overflow-y-hidden h-fit">
                            <div className="flex flex-nowrap">
                            {userItems
                                .sort((itemA, itemB) => {
                                    if (itemA.state === 'DISABLED' && itemB.state !== 'DISABLED') {
                                        return 1; // itemA comes after itemB
                                    } else if (itemA.state !== 'DISABLED' && itemB.state === 'DISABLED') {
                                        return -1; // itemA comes before itemB
                                    } else {
                                        return itemB.id - itemA.id; // default sorting by id
                                    }
                                })
                                .map((item) => (
                                    <div className="pr-3">
                                    <ItemCard
                                        item={{...item, itemPicture: `data:image/png;base64, ${item.itemPicture}`}}
                                        onButtonClick={() => handleOfferSend(item)}
                                        showViews={false}
                                        buttonText="Send offer"
                                    />
                                    </div>
                                ))}
                            </div>
                        </div>
                        </div>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Homepage;