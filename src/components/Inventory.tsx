import {useContext, useEffect, useState} from "react";
import {HttpContext} from "../providers/HttpProvider";
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center place-items-center">
            {itemList
                .sort((itemA, itemB) => itemB.id - itemA.id)
                .map((item) => (
                    <ItemCard
                        item={{...item, itemPicture: `data:image/png;base64, ${item.itemPicture}`}}
                        onButtonClick={() => handleButtonClick(item)}
                        buttonText="Edit"
                    />
                ))}
        </div>)
}

export default Inventory;