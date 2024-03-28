import 'bootstrap/dist/css/bootstrap.css';
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import ItemCard from "./ItemCard";
import basic_item_card_pic from "../assets/basic_item_card_pic.jpg";
import {HttpContext} from "../providers/HttpProvider";

function ItemCreation() {
    const [itemPicture, setItemPicture] = useState('');
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('OTHER');
    const [priceTier, setPriceTier] = useState(1);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const axios = useContext(HttpContext);

    async function handleSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await axios.post('item', {title, itemPicture, description, category, priceTier})
            .then(async () => {
                navigate('/');
            }).catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                }
            });
    }

    async function itemPictureUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if ( files && files.length > 0) {
            const clientId = '3c7b9d040312b85';
            const auth = 'Client-ID ' + clientId;
            const formData = new FormData();
            formData.append('itemPicture', files[0]);

            axios.defaults.baseURL = 'https://api.imgur.com/3/';
            const config= {
                headers: {
                    Authorization: auth,
                },
            }
            try {
                const response = await axios.post('image/', formData, config);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            }
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
                            onChange={itemPictureUpload}
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
                            placeholder="Rubber duckie"
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
                            placeholder="It floats..."
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
                                <option value="VEHICLE">Vehicle</option>
                                <option value="HOME">Home</option>
                                <option value="HOUSEHOLD">Household</option>
                                <option value="ELECTRONICS">Electronics</option>
                                <option value="FREETIME">Free time</option>
                                <option value="SPORT">Sport</option>
                                <option value="FASHION">Fashion</option>
                                <option value="COLLECTIBLES">Collectibles</option>
                                <option value="PETS">Pets</option>
                                <option value="OTHER">Other</option>
                        </select>
                    </label>
                </div>

                <p>{errorMessage}</p>
                <button type="submit">Create</button>
            </form>

            <ItemCard
                title={title.trim() === '' ? 'Golden monkey' : title}
                itemPicture={itemPicture.trim() === '' ? basic_item_card_pic : itemPicture}
                description={description.trim() === '' ? 'A monkey made of gold...' : description}
                priceTier={priceTier}
            />
        </>
    );
}

export default ItemCreation;