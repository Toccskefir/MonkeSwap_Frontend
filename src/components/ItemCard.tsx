import {useState} from "react";
import ItemCardData from "../interfaces/itemCardData";
import ItemCardWithIdData from "../interfaces/itemCardWithIdData";

interface ItemCardProps {
    item: ItemCardData | ItemCardWithIdData,
    buttonText: string,
    onButtonClick?: () => void,
}

function ItemCard(props: ItemCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    function handleFlip() {
        setIsFlipped(flipped => !flipped);
    }

    return (
            <div className="h-96 w-80 [perspective:1000px] ml-5 mt-5 mb-5 font-poppins" onClick={handleFlip}>
                <div className={`rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped && "[transform:rotateY(180deg)]"}`}>
                    <div className="absolute rounded overflow-hidden shadow-lg max-w-sm">
                        <img className="w-80 h-72"
                             src={props.item.itemPicture}
                             alt="card picture"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-md mb-2 h-20 w-full">{props.item.title}</div>
                        </div>
                    </div>
                    <div className="absolute h-card-backside w-card-backside rounded bg-white p-12 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="flex flex-col justify-center">
                            <p className="text-base font-bold max-w-1 p-no-overflow">{props.item.description}</p>
                            <button
                                className="active:scale-[.98] active:duration-75
                    hover:scale-[1.01] ease-in-out transition-all duration-100 bg-primary-yellow rounded-xl py-2 font-bold text-lg text-yellow-900 mt-2"
                                onClick={props.onButtonClick}>
                                    {props.buttonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    );
}

export default ItemCard;