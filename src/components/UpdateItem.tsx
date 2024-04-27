import React, {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import {useNavigate, useParams} from "react-router-dom";
import categoryList from "../constants/categoryList";
import ItemCard from "./ItemCard";
import peeled_banana from "../assets/peeled_banana.png";
import banana from "../assets/banana.png";
import {UserDataContext} from "../contexts/UserDataContext";
import ModalContent from "./ModalContent";
import {Modal} from "@mui/material";
import {FaTrashCan} from "react-icons/fa6";

/**
 * This component makes up the Update Item page, which is very similar to the Create Item page, but on this page
 * instead of creating an item the user can update the data of a single item or even delete it.
 */
function UpdateItem() {
    const axios = useContext(HttpContext);
    const { userItems, setUserItems } = useContext(UserDataContext);

    const [selectedPicture, setSelectedPicture] = useState<Blob | null>(null);
    const [itemPicture, setItemPicture] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('OTHER');
    const [priceTier, setPriceTier] = useState(1);
    const [banana2, setBanana2] = useState(false);
    const [banana3, setBanana3] = useState(false);
    const [banana4, setBanana4] = useState(false);
    const [banana5, setBanana5] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [openModal, setOpenModal] = useState<boolean>(false);

    const navigate = useNavigate();
    let { itemId } = useParams();

    useEffect(() => {
        axios.get('item/' + itemId)
            .then((response) => {
                setItemPicture(response.data.itemPicture);
                setTitle(response.data.title);
                setDescription(response.data.description);
                setCategory(response.data.category);
                setPriceTier(response.data.priceTier);
            })
            .catch((error) => {
                if(error.response) {
                    setErrorMessage(error.response.data);
                }
            });
    }, [itemId, axios]);

    useEffect(() => {
        switch (priceTier) {
            case 1:
                setBanana2(false);
                setBanana3(false);
                setBanana4(false);
                setBanana5(false);
                break;
            case 2:
                setBanana2(true);
                setBanana3(false);
                setBanana4(false);
                setBanana5(false);
                break;
            case 3:
                setBanana2(true);
                setBanana3(true);
                setBanana4(false);
                setBanana5(false);
                break;
            case 4:
                setBanana2(true);
                setBanana3(true);
                setBanana4(true);
                setBanana5(false);
                break;
            case 5:
                setBanana2(true);
                setBanana3(true);
                setBanana4(true);
                setBanana5(true);
                break;
        }
    }, [priceTier]);

    function handleSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (title.trim() === '') {
            setErrorMessage('Title is empty');
        } else if (description.trim() === '') {
            setErrorMessage('Description is empty');
        } else {
            const formData = new FormData();
            formData.append('title', title.trim());
            formData.append('itemPicture', selectedPicture ? selectedPicture : new Blob([itemPicture]));
            formData.append('description', description.trim());
            formData.append('category', category.trim() as string);
            formData.append('priceTier', priceTier.toString());

            axios.put('item/' + itemId, formData)
                .then((response) => {
                    const updatedIndex = userItems.findIndex(item => item.id === response.data.id);
                    const updatedItems = [...userItems];
                    updatedItems[updatedIndex] = response.data;
                    setUserItems(updatedItems);
                    navigate('/inventory');
                })
                .catch((error) => {
                    if (error.response) {
                        setErrorMessage(error.response.data);
                    }
                });
        }
    }

    function handleModalClose() {
        setOpenModal(false);
    }

    function handleItemPictureChange(files: FileList | null) {
        if ( files && files.length > 0) {
            setSelectedPicture(files[0]);
        }
    }

    function handleCancel() {
        navigate('/inventory');
    }

    function handleItemDelete() {
        axios.delete('item/' + itemId)
            .then(() => {
                const updatedItems = userItems.filter(item => item.id !== Number(itemId));
                setUserItems(updatedItems);
                navigate('/inventory');
            });
    }

    return(
        <div className="grid grid-cols-2">
            <div className="flex flex-col w-fit font-poppins overflow-hidden columns-3">
                <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray-200 mt-3 ml-5 mr-5">
                    <h1 className="font-bold">Update an item</h1>
                    <div className="w-full">
                        <form onSubmit={handleSubmitEvent}>
                            <label className="font-semibold">
                                Picture
                            </label>
                            <div>
                                <input
                                    type="file"
                                    className="mb-3"
                                    accept="image/*"
                                    onChange={(event) => handleItemPictureChange(event.target.files)}
                                />
                            </div>

                            <label className="font-semibold">
                                Title
                            </label>
                            <div>
                                <input
                                    type="text"
                                    maxLength={40}
                                    className="mb-3 pl-2 border-2 border-gray-300 rounded-xl pt-1 pb-1 w-80"
                                    placeholder="Golden monkey"
                                    value={title}
                                    onChange={event => setTitle(event.target.value)}
                                />
                            </div>

                            <label className="font-semibold">
                                Description
                            </label>
                            <div>
                                <textarea
                                    id="inputDescription"
                                    className="mb-3 pl-2 pt-1 border-2 border-gray-300 rounded-xl w-80 h-32"
                                    placeholder="A monkey made of gold..."
                                    value={description}
                                    onChange={event => setDescription(event.target.value)}
                                />
                            </div>

                            <label className="font-semibold">
                                Category
                            </label>
                            <div>
                                <select
                                    className="mb-3 pl-1 pr-2 border-2 border-gray-300 rounded-xl"
                                    id="inputCategory"
                                    value={category}
                                    onChange={event => setCategory(event.target.value)}
                                >
                                    {categoryList.map(item => (
                                        <option
                                            key={item}
                                            value={item.toUpperCase().replaceAll(' ', '')}
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <label className="font-semibold">
                                Price Tier
                            </label>
                            <div className="columns-5 w-fit">
                                <img
                                    className="cursor-pointer h-20"
                                    src={peeled_banana} alt="banana" onClick={() => setPriceTier(1)}/>
                                <img
                                    className="cursor-pointer h-20"
                                    src={banana2 ? peeled_banana : banana} alt="banana"
                                    onClick={() => setPriceTier(2)}/>
                                <img
                                    className="cursor-pointer h-20"
                                    src={banana3 ? peeled_banana : banana} alt="banana"
                                    onClick={() => setPriceTier(3)}/>
                                <img
                                    className="cursor-pointer h-20"
                                    src={banana4 ? peeled_banana : banana} alt="banana"
                                    onClick={() => setPriceTier(4)}/>
                                <img
                                    className="cursor-pointer h-20"
                                    src={banana5 ? peeled_banana : banana} alt="banana"
                                    onClick={() => setPriceTier(5)}/>
                            </div>

                            <p className="text-red-600 mt-3">{errorMessage}</p>
                            <button type="submit" className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all w-52 py-2 rounded-xl bg-primary-yellow
                    text-yellow-900 text-lg font-bold">Update
                            </button>
                            <button onClick={handleCancel} className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all py-2 mt-3 ml-10 rounded-xl bg-white
                    text-lg font-bold text-yellow-900">Cancel
                            </button>
                            <br/>
                        </form>
                        <button onClick={() => setOpenModal(true)} className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all w-52 mt-3 py-2 ml-16 rounded-xl bg-red-600
                    text-white text-lg font-bold">Delete item
                        </button>
                        <Modal open={openModal} onClose={handleModalClose} className="grid h-screen place-items-center">
                            <ModalContent onClose={handleModalClose}>
                                <div className="text-center w-56">
                                    <FaTrashCan size={56} className="mx-auto text-red-500"/>
                                    <div className="mx-auto my-4 w-48">
                                        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete this item?
                                        </p>
                                    </div>
                                    <div className="flex gap-4 font-semibold">
                                        <button className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all rounded-xl bg-red-600 w-full py-2 text-white"
                                                onClick={handleItemDelete}>Delete
                                        </button>
                                        <button
                                            className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out w-full py-2"
                                            onClick={handleModalClose}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </ModalContent>
                        </Modal>
                    </div>
                </div>
            </div>

            <div className="place-content-center">
                <ItemCard
                    item={{
                        id: 0,
                        title: title.trim() === '' ? 'Golden monkey' : title,
                        itemPicture: selectedPicture ? URL.createObjectURL(selectedPicture) : `data:image/png;base64, ${itemPicture}`,
                        description: description!.trim() === '' ? 'A monkey made of gold...' : description,
                        priceTier: priceTier,
                        views: 0
                    }}
                    showViews={true}
                    buttonText="Example"
                />
            </div>
        </div>
    );
}

export default UpdateItem;