import {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
import {Grid} from "@mui/material";
import ItemCard from "./ItemCard";
import ItemCardWithIdData from "../interfaces/itemCardWithIdData";
import {useNavigate} from "react-router-dom";

function Inventory() {
    const axios = useContext(HttpContext);

    const [itemList, setItemList] = useState<ItemCardWithIdData[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('user/items')
            .then((response) => {
                setItemList(response.data);
            });
    }, [axios]);

    function handleButtonClick(selectedItem: ItemCardWithIdData) {
        navigate('/updateitem/' + selectedItem.id);
    }

    return(
        <Grid container columns={{ xl: 15, lg: 12, md: 12, xs: 12 }}>
            {itemList
                .sort((itemA, itemB) => itemB.id - itemA.id)
                .map((item) => (
                <Grid key={item.id} item xl={3} lg={3} md={4} xs={6}>
                    <ItemCard
                        item={{...item, itemPicture: `data:image/png;base64, ${item.itemPicture}`}}
                        onButtonClick={() => handleButtonClick(item)}
                        buttonText="Edit"
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default Inventory;