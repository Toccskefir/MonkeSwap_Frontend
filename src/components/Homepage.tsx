import React, {useContext, useEffect, useState} from "react";
import ItemCard from "./ItemCard";
import {HttpContext} from "../providers/HttpProvider";
import categoryList from "../constants/categoryList";
import {Modal} from "@mui/material";
import ModalContent from "./ModalContent";
import ItemData from "../interfaces/itemData";
import PriceTier from "./PriceTier";
import {UserDataContext} from "../contexts/UserDataContext";

function Homepage() {
    const axios = useContext(HttpContext);
    const { userData } = useContext(UserDataContext);

    const [itemList, setItemList] = useState<ItemData[]>([]);
    const [incomingItem, setIncomingItem] = useState<ItemData>();
    const [offeredItem, setOfferedItem] = useState<ItemData>();
    const [comment, setComment] = useState('');
    const [errorMessage, setErrorMessage] = useState('Advertised items will be displayed here');
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        loadCards();
    }, [axios]);

    function handleModalClose() {
        setOpenModal(false);
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

    function handleButtonClick(item: ItemData) {
        axios.put('item/views/' + item.id)
            .then(() => {
                setOpenModal(true);
                setIncomingItem(item);
            });
    }

    function handleOfferSend() {
        axios.post('tradeoffer', {
            offeredItem: offeredItem?.id,
            incomingItem: incomingItem?.id,
            comment: comment
        }).then(() => {
                axios.post('notification', {
                    message: `${userData?.username} sent you a trade offer!`,
                    type: 'NOTIFICATION',
                    userId: incomingItem?.userId,
                }).then(() => {
                    handleModalClose();
                });
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
                            onButtonClick={() => handleButtonClick(item)}
                            buttonText="View"
                        />
                    ))}
            </div>
            }
            <Modal open={openModal}>
                <ModalContent onClose={handleModalClose}>
                    <img src={`data:image/png;base64, ${incomingItem?.itemPicture}`} alt="incoming item picture"/>
                    <label>
                        Title
                        <p>{incomingItem?.title}</p>
                    </label>
                    <label>
                        Description
                        <p>{incomingItem?.description}</p>
                    </label>
                    <label>
                        Category
                        <p>{incomingItem?.category}</p>
                    </label>
                    <label>
                        Price Tier
                        <PriceTier tier={incomingItem?.priceTier as number}/>
                    </label>

                    <input
                        type="text"
                        placeholder="Write a comment for your offer"
                        value={comment}
                        onChange={event => setComment(event.target.value)}
                    />
                    <button onClick={handleOfferSend}>Send offer</button>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default Homepage;