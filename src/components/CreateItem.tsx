import 'bootstrap/dist/css/bootstrap.css';
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import ItemCard from "./ItemCard";
import basic_item_card_pic from "../assets/basic_item_card_pic.jpg";
import {HttpContext} from "../providers/HttpProvider";
import categoryList from "../constants/categoryList";

function CreateItem() {
    const [itemPicture, setItemPicture] = useState<Blob | null>(null);
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('OTHER');
    const [priceTier, setPriceTier] = useState(1);
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
        formData.append('category', category);
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
                <button type="submit">Create</button>
            </form>

            <ItemCard
                title={title.trim() === '' ? 'Golden monkey' : title}
                itemPicture={itemPicture ? URL.createObjectURL(itemPicture) : basic_item_card_pic}
                description={description.trim() === '' ? 'A monkey made of gold...' : description}
                priceTier={priceTier}
            />
        </>
    );
}

export default CreateItem;