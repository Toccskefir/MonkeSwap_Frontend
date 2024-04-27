import {useState} from "react";
import ItemData from "../interfaces/itemData";
import {FaRegEye} from "react-icons/fa";
import PriceTier from "./PriceTier";

/**
 * Serves the props to the main function of the page.
 */
export interface ItemCardProps {
    /**
     * Data representing the item.
     */
    item: ItemData;

    /**
     * Text to be displayed on the button.
     */
    buttonText: string;

    /**
     * Boolean indicating whether to show views or not.
     */
    showViews: boolean;

    /**
     * Optional callback function for button click event.
     */
    onButtonClick?: () => void;
}

/**
 * This component is the backbone of the advertisements that appear on most of the pages.
 * This component makes the items look like cards and also handles the flip animation that takes place when the user
 * clicks on the cards.
 */
function ItemCard(props: ItemCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    function handleFlip() {
        setIsFlipped(flipped => !flipped);
    }

    return (
            <div className={`h-96 w-80 [perspective:1000px] ml-5 mt-5 mb-24 font-poppins
                ${props.item.state === 'DISABLED' && "opacity-45"}`} onClick={handleFlip}>
                <div className={`rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped && "[transform:rotateY(180deg)]"}`}>
                    <div className="absolute rounded overflow-hidden shadow-lg max-w-sm">
                        <img className="w-80 h-72"
                             src={props.item.itemPicture}
                             alt="card picture"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-md mb-5 h-20 w-full p-no-overflow-title">{props.item.title}</div>
                            {props.showViews &&
                                <>
                                    <FaRegEye className="absolute right-2.5 bottom-4_5"/>
                                    <p className="absolute font-medium text-sm right-8 bottom-0">{props.item.views}</p>
                                </>
                            }
                            <div className="absolute columns-5 bottom-8"><PriceTier tier={props.item.priceTier}/></div>
                            </div>
                        </div>
                    <div className="absolute h-card-backside w-card-backside rounded bg-white p-12 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="flex flex-col justify-center">
                            <p className="text-base font-bold max-w-1 p-no-overflow-description">{props.item.description}</p>
                            <button
                                className={`${props.item.state === 'ENABLED' && "active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all duration-100"}
                                bg-primary-yellow rounded-xl py-2 font-bold text-lg text-yellow-900 mt-2`}
                                onClick={props.onButtonClick}
                                disabled={props.item.state === 'DISABLED' && true}>
                                    {props.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ItemCard;