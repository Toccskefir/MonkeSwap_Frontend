import React, {useEffect, useState} from "react";

/**
 * This component's sole porpuse is to animate an image sliding in slowly from the top to its original position.
 * @param imageUrl The url of the image that will have the animation applied to it.
 */
const ImageTransition: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            // When the image is loaded, set loaded state to true
            setLoaded(true);
        };
        img.src = imageUrl; // Set the src attribute of the image to trigger loading
    }, [imageUrl]);

    return (
        <div>
            <img
                src={imageUrl}
                alt="MonkeSwap Logo"
                className={`w-64 h-auto transition-all ${
                    loaded ? "mb-0" : "mb-96" // Apply opacity classes based on loaded state
                }`}
                style={{ transitionDuration: "3s" }} // Inline style for transition duration
            />
        </div>
    );
};

export default ImageTransition;