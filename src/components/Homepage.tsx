import React, {useContext, useEffect, useState} from "react";
import ItemCard from "./ItemCard";
import {Grid} from "@mui/material";
import {HttpContext} from "../providers/HttpProvider";
import categoryList from "../constants/categoryList";
import ItemCardWithIdData from "../interfaces/itemCardWithIdData";

function Homepage() {
    const [itemList, setItemList] = useState<ItemCardWithIdData[]>([]);

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

    function handleButtonClick(itemId: number) {
        axios.put('item/views/' + itemId)
            .then(() => {

            });
    }

    return(
        <div>
            <label>
                Search by category
                <select
                    defaultValue="ALL"
                    onChange={(event) => handleCategoryFilterChange(event.target.value)}
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
            <Grid container columns={{ xl: 15, lg: 12, md: 12, xs: 12 }}>
                {itemList
                    .sort((itemA, itemB) => itemB.id - itemA.id)
                    .map((item) => (
                    <Grid key={item.id} item xl={3} lg={3} md={4} xs={6}>
                        <ItemCard
                            item={{...item, itemPicture: `data:image/png;base64, ${item.itemPicture}`}}
                            onButtonClick={() => handleButtonClick(item.id)}
                            buttonText="View"
                        />
                    </Grid>
                ))}
            </Grid>
        </div>

    );
}

export default Homepage;