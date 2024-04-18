import React, {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import {useNavigate, useParams} from "react-router-dom";
import categoryList from "../constants/categoryList";
import ItemCard from "./ItemCard";
import peeled_banana from "../assets/peeled_banana.png";
import banana from "../assets/banana.png";
import {UserDataContext} from "../contexts/UserDataContext";

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
        const formData = new FormData();
        formData.append('title', title);
        formData.append('itemPicture', selectedPicture ? selectedPicture : new Blob([itemPicture]));
        formData.append('description', description);
        formData.append('category', category as string);
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

    function handleItemPictureChange(files: FileList | null) {
        if ( files && files.length > 0) {
            setSelectedPicture(data => files[0]);
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
        <>
            <h1>Update your item</h1>
            <form onSubmit={handleSubmitEvent}>
                <div className="form-group">
                    <label>
                        Image
                        <input
                            type="file"
                            id="inputImage"
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                <button type="submit">Update</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleItemDelete}>Delete item</button>

            <div className="absolute right-40 bottom-20">
            <ItemCard
                item={{
                    id: 0,
                    title: title.trim() === '' ? 'Golden monkey' : title,
                    itemPicture: selectedPicture ? URL.createObjectURL(selectedPicture) : `data:image/png;base64, ${itemPicture}`,
                    description: description!.trim() === '' ? 'A monkey made of gold...' : description,
                    priceTier: priceTier,
                }}
                buttonText="Example"
            />
            </div>
        </>
    );
}

export default UpdateItem;