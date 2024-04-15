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
            <div className="h-96 w-80 relative [perspective:1000px]" onClick={handleFlip}>
                <div className={`relative h-full w-full rounded-xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped && "[transform:rotateY(180deg)]"}`}>
                    <div className="absolute rounded overflow-hidden shadow-lg max-w-sm mr-5 ml-5 mt-5">
                        <img className="min-w-80 min-h-60 max-w-70 max-h-60"
                             src={props.item.itemPicture}
                             alt="card picture"/>
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl mb-2">{props.item.title}</div>
                        </div>
                    </div>
                    <div className="h-96 w-80 rounded bg-white p-12 border-black border-3 [transform:rotateY(180deg)] [backface-visibility:hidden]">
                        <div className="flex flex-col">
                            <p className="text-base">{props.item.description}</p>
                            <button
                                className="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900"
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