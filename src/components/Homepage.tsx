import React, {useContext, useEffect, useState} from "react";
import ItemCard from "./ItemCard";
import {HttpContext} from "../providers/HttpProvider";
import categoryList from "../constants/categoryList";
import ItemCardWithIdData from "../interfaces/itemCardWithIdData";

function Homepage() {
    const [itemList, setItemList] = useState<ItemCardWithIdData[]>([]);

    const [errorMessage, setErrorMessage] = useState('Advertised items will be displayed here');

    const axios = useContext(HttpContext);

    useEffect(() => {
        loadCards();
    }, [axios]);

    function loadCards() {
        axios.get('items')
            .then((response) => {
                setItemList(response.data);
            });
    }

    function handleCategoryFilterChange(category: string) {
        if (category === 'ALL') {
            loadCards();
        } else {
            axios.get('items/' + category)
                .then((response) => {
                    setItemList(response.data);
                });
        }
    }

    function handleButtonClick(item: ItemCardWithIdData) {
        axios.put('item/views/' + item.id)
            .then(() => {

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
        </div>
    );
}

export default Homepage;