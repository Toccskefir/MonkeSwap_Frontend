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
        const formData = new FormData();
        formData.append('title', title);
        if (itemPicture) {
            formData.append('itemPicture', itemPicture);
        }
        formData.append('description', description);
        formData.append('category', category as string);
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

    function handleItemPictureChange(files: FileList | null) {
        if ( files && files.length > 0) {
            setItemPicture(data => files[0]);
        }
    }

    return(
        <>
            <h1>Create a new item</h1>
            <form onSubmit={handleSubmitEvent}>
                <div className="form-group">
                    <label>
                        Picture
                        <input
                            type="file"
                            id="inputImage"
                            className="form-control mb-3"
                            accept="image/*"
                            onChange={(event) => handleItemPictureChange(event.target.files)}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Title
                        <input
                            type="text"
                            id="inputTitle"
                            className="form-control mb-3"
                            placeholder="Golden monkey"
                            value={title}
                            onChange={event => setTitle(event.target.value)}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Description
                        <textarea
                            id="inputDescription"
                            className="form-control mb-3"
                            placeholder="A monkey made of gold..."
                            value={description}
                            onChange={event => setDescription(event.target.value)}
                        />
                    </label>
                </div>

                <div className="form-group">
                    <label>
                        Category
                        <select
                            className="form-control mb-3"
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
                    </label>
                </div>


                <label>
                    Price Tier
                    <div className="columns-5 justify-center">
                        <img
                            className="cursor-pointer h-28 w-28"
                            src={peeled_banana} alt="banana" onClick={() => setPriceTier(1)}/>
                        <img
                            className="cursor-pointer h-28 w-28"
                            src={banana2 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(2)}/>
                        <img
                            className="cursor-pointer h-28 w-28"
                            src={banana3 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(3)}/>
                        <img
                            className="cursor-pointer h-28 w-28"
                            src={banana4 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(4)}/>
                        <img
                            className="cursor-pointer h-28 w-28"
                            src={banana5 ? peeled_banana : banana} alt="banana" onClick={() => setPriceTier(5)}/>
                    </div>
                </label>

            <p>{errorMessage}</p>
            <button type="submit">Create</button>
            </form>

            <div className="absolute right-40 bottom-20">
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