import peeled_banana from "../assets/peeled_banana.png";

interface PriceTierProps {
    tier: number,
}

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