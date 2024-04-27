import peeled_banana from "../assets/peeled_banana.png";

/**
 * Defines the props expected by components representing price tiers.
 */
export interface PriceTierProps {
    /**
     * The tier number indicating the level of the price tier.
     */
    tier: number;
}

/**
 * This component appears on the CreateItem page, and it produces the price tier board where the user can set the item's price tier.
 */
function PriceTier({ tier }: PriceTierProps) {
    const imageArray = new Array(tier).fill(null);
    return (
        <div>
            {imageArray.map((_, index) => (
                <img key={index} src={peeled_banana} alt="banana" className="h-12"/>
            ))}
        </div>
    );
}

export default PriceTier;