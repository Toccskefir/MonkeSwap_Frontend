import {useContext, useEffect} from "react";
import ItemCard from "./ItemCard";
import {useNavigate} from "react-router-dom";
import ItemData from "../interfaces/itemData";
import {UserDataContext} from "../contexts/UserDataContext";

/**
 * This page displays the currently logged-in user's items as cards in a grid.
 * The user can also modify the cards by clicking on the "Update item" button on the backside of every card,
 * but this will lead the user to a different page.
 */
function Inventory() {
    const { userItems, loadItems} = useContext(UserDataContext);

    useEffect(() => {
        loadItems();
    }, []);

    const navigate = useNavigate();

    function handleButtonClick(selectedItem: ItemData) {
        navigate('/updateitem/' + selectedItem.id);
    }

    return(
        <div className="font-poppins">
            {userItems.length === 0 ?
                <div className="text-4xl text-center text-black m-5">
                    Your items will be displayed here
                </div> :
                <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-center items-center place-items-center">
                    {userItems
                        .sort((itemA, itemB) => {
                            if (itemA.state === 'DISABLED' && itemB.state !== 'DISABLED') {
                                return 1; // itemA comes after itemB
                            } else if (itemA.state !== 'DISABLED' && itemB.state === 'DISABLED') {
                                return -1; // itemA comes before itemB
                            } else {
                                return itemB.id - itemA.id; // default sorting by id
                            }
                        })
                        .map((item) => (
                            <ItemCard
                                item={{...item, itemPicture: `data:image/png;base64, ${item.itemPicture}`}}
                                onButtonClick={() => handleButtonClick(item)}
                                showViews={true}
                                buttonText="Edit"
                            />
                        ))}
                </div>
            }
        </div>
    )
}

export default Inventory;