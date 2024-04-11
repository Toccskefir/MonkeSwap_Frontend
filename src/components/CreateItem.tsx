import 'bootstrap/dist/css/bootstrap.css';
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import ItemCard from "./ItemCard";
import basic_item_card_pic from "../assets/basic_item_card_pic.jpg";
import {HttpContext} from "../providers/HttpProvider";
import categoryList from "../constants/categoryList";
import ItemCardData from "../interfaces/itemCardData";

interface CreateItemProps {
    itemToEdit?: ItemCardData,
}

function CreateItem(props: CreateItemProps) {
    const [itemPicture, setItemPicture] = useState<Blob | null>(null);
    const [title, setTitle] = useState(props.itemToEdit ? props.itemToEdit.title : '')
    const [description, setDescription] = useState(props.itemToEdit ? props.itemToEdit.description : '');
    const [category, setCategory] = useState(props.itemToEdit ? props.itemToEdit.category : 'OTHER');
    const [priceTier, setPriceTier] = useState(props.itemToEdit ? props.itemToEdit.priceTier : 1);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const axios = useContext(HttpContext);

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
            .then(async () => {
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

    function handleClose() {
        navigate('/inventory');
    }

    return(
        <>
            <h1>Create a new card</h1>
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

                <p>{errorMessage}</p>
                <button type="submit">{itemPicture ? "Save changes" : "Create"}</button>
                {itemPicture ? <button onClick={handleClose}>Close</button> : null}
            </form>

            <ItemCard
                item={{
                    title: title.trim() === '' ? 'Golden monkey' : title,
                    itemPicture: itemPicture ? URL.createObjectURL(itemPicture) : basic_item_card_pic,
                    description: description.trim() === '' ? 'A monkey made of gold...' : description,
                    priceTier: priceTier,
                }}
                buttonText="Example"
            />
        </>
    );
}

export default CreateItem;