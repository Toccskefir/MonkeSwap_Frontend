import basic_item_card_pic from "../assets/basic_item_card_pic.jpg";
import peeled_banana from "../assets/peeled_banana.png";
import banana from "../assets/banana.png";
import 'bootstrap/dist/css/bootstrap.css';
import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ItemCard from "./ItemCard";
import {HttpContext} from "../providers/HttpProvider";
import categoryList from "../constants/categoryList";
import {UserDataContext} from "../contexts/UserDataContext";

function CreateItem() {
    const axios = useContext(HttpContext);
    const { userItems, setUserItems } = useContext(UserDataContext);

    const [itemPicture, setItemPicture] = useState<Blob | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('OTHER');
    const [priceTier, setPriceTier] = useState(1);
    const [banana2, setBanana2] = useState(false);
    const [banana3, setBanana3] = useState(false);
    const [banana4, setBanana4] = useState(false);
    const [banana5, setBanana5] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

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

    async function handleSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!itemPicture) {
            setErrorMessage('Picture is empty');
        } else if (title.trim() === '') {
            setErrorMessage('Title is empty');
        } else if (description.trim() === '') {
            setErrorMessage('Description is empty');
        } else {
            const formData = new FormData();
            formData.append('title', title.trim());
            if (itemPicture) {
                formData.append('itemPicture', itemPicture);
            }
            formData.append('description', description.trim());
            formData.append('category', category.trim() as string);
            formData.append('priceTier', priceTier.toString());

            await axios.post('item', formData)
                .then(async (response) => {
                    setUserItems([...userItems, response.data]);
                    navigate('/inventory');
                }).catch((error) => {
                    if (error.response) {
                        setErrorMessage(error.response.data);
                    }
                });
        }
    }

    function handleItemPictureChange(files: FileList | null) {
        if ( files && files.length > 0) {
            setItemPicture(data => files[0]);
        }
    }

    return(
        <>
            <div className="flex flex-col w-fit font-poppins overflow-hidden columns-3">
                <div className="bg-white px-10 py-10 rounded-3xl border-2 border-gray-200 mt-3 ml-5 mr-5">
                    <h1 className="font-bold">Create a new item</h1>
                    <div className="w-full flex">
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
                                    src={banana2 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(2)}/>
                                <img
                                    className="cursor-pointer h-20"
                                    src={banana3 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(3)}/>
                                <img
                                    className="cursor-pointer h-20"
                                    src={banana4 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(4)}/>
                                <img
                                    className="cursor-pointer h-20"
                                    src={banana5 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(5)}/>
                            </div>

                            <p className="text-red-600 mt-3">{errorMessage}</p>
                            <button type="submit" className="active:scale-[.98] active:duration-75
                        hover:scale-[1.01] ease-in-out transition-all w-52 py-2 rounded-xl bg-primary-yellow
                        text-yellow-900 text-lg font-bold">Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="absolute right-80 bottom-0">
                <ItemCard
                    item={{
                        id: 0,
                        title: title.trim() === '' ? 'Golden monkey' : title,
                        itemPicture: itemPicture ? URL.createObjectURL(itemPicture) : basic_item_card_pic,
                        description: description.trim() === '' ? 'A monkey made of gold...' : description,
                        priceTier: priceTier,
                    }}
                    buttonText="Example"
                />
            </div>
        </>
    );
}

export default CreateItem;