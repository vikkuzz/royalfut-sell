import React from "react";
import Image from "next/legacy/image";
import Loader from "../Loader/Loader";

export default function ImageWithState({ alt, ...rest }) {
    const [isLoading, setLoading] = React.useState(true);
    const [isError, setIsError] = React.useState(false);

    const handleLoad = async () => {
        setLoading(false);
        setIsError(false);
    };

    const handleError = async () => {
        setLoading(false);
        setIsError(true);
    };

    return (
        <div>
            {isError && !isLoading && <div>*Error loading*</div>}
            {!isError && isLoading && (
                <div>
                    <Loader />
                </div>
            )}
            <div
                style={{
                    display: isError || isLoading ? "none" : "initial",
                }}>
                <Image
                    alt={alt || "Default Alt"}
                    onLoad={handleLoad}
                    onError={handleError}
                    {...rest}
                />
            </div>
        </div>
    );
}
