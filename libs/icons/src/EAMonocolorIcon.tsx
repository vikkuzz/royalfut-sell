import type { FC, ComponentProps } from "react";

const EAMonocolorIcon: FC<ComponentProps<"svg">> = ({ ...props }) => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                fill="currentColor"
                d="M12 24c6.6274 0 12-5.3726 12-12 0-6.62742-5.3726-12-12-12C5.37258 0 0 5.37258 0 12c0 6.6274 5.37258 12 12 12ZM7.699 8.4h5.9034l-.9026 1.43943H6.80333L7.699 8.4Zm8.2122.54015h.0947v-.4587h.1707v-.081h-.4357v.081h.1703v.4587Zm.4165-.41703h.0017l.1497.41703h.0771l.1497-.41703h.0021v.41703h.0889v-.53967h-.1307l-.1447.42213h-.0025l-.1482-.42213h-.1328v.53967h.0897v-.41703Zm-1.5189-.10939-3.6089 5.74647H7.19687l.92354-1.4406h2.39929l.9164-1.44H5.88953l-.91631 1.44h1.314l-1.82311 2.8763h7.60839l2.8102-4.4319 1.0246 1.5555h-.9239l-.875 1.4407h2.736l.95 1.4357h1.7453l-4.7309-7.18217Z"
            />
        </svg>
    );
};

export default EAMonocolorIcon;
