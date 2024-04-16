import React, {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import {useNavigate, useParams} from "react-router-dom";
import categoryList from "../constants/categoryList";
import ItemCard from "./ItemCard";

function UpdateItem() {
    const axios = useContext(HttpContext);

    const [selectedPicture, setSelectedPicture] = useState<Blob | null>(null);
    const [itemPicture, setItemPicture] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('OTHER');
    const [priceTier, setPriceTier] = useState(1);
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

    function handleSubmitEvent(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('itemPicture', selectedPicture ? selectedPicture : new Blob([itemPicture]));
        formData.append('description', description);
        formData.append('category', category as string);
        formData.append('priceTier', priceTier.toString());

        axios.put('item/' + itemId, formData)
            .then(() => {
                navigate('/inventory')
            })
            .catch((error) => {
                if (error.response) {
                    setErrorMessage(error.response.data);
                }
            })
    }

    function handleItemPictureChange(files: FileList | null) {
        if ( files && files.length > 0) {
            setSelectedPicture(data => files[0]);
        }
    }

    function handleCancel() {
        navigate('/inventory');
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

                <p>{errorMessage}</p>
                <button type="submit">Update</button>
            </form>
            <button type="submit" onClick={handleCancel}>Cancel</button>

            <ItemCard
                item={{
                    title: title.trim() === '' ? 'Golden monkey' : title,
                    itemPicture: selectedPicture ? URL.createObjectURL(selectedPicture) : `data:image/png;base64, ${itemPicture}`,
                    description: description!.trim() === '' ? 'A monkey made of gold...' : description,
                    priceTier: priceTier,
                }}
                buttonText="Example"
            />
        </>
    );
}

export default UpdateItem;