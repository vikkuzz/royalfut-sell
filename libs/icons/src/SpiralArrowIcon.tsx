import type { FC, ComponentProps } from "react";

const SpiralArrowIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 171 86"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M3.304 31.842a1.5 1.5 0 0 0-2.608 1.482zm60.66 15.415 1.052 1.069zm37.027 35.37-.354-1.458zm69.486-26.078a1.5 1.5 0 0 0-1.215-1.738l-13.293-2.357a1.5 1.5 0 0 0-.524 2.954l11.816 2.095-2.094 11.816a1.5 1.5 0 1 0 2.954.523zM.696 33.324c4.682 8.24 13.497 18.972 24.79 24.184 5.679 2.621 12.016 3.86 18.753 2.636 6.735-1.222 13.733-4.88 20.777-11.818l-2.105-2.138c-6.708 6.607-13.183 9.91-19.208 11.005-6.024 1.093-11.735.003-16.96-2.409C16.23 49.932 7.817 39.781 3.305 31.842zm64.32 15.002C73.803 39.672 77.345 31.38 77.3 24.078c-.044-7.305-3.677-13.332-8.65-17.439C63.697 2.55 57.308.271 51.52.52 45.671.767 40.332 3.628 38 9.856l2.81 1.052c1.824-4.873 5.93-7.184 10.838-7.394 4.968-.211 10.646 1.767 15.092 5.438 4.425 3.654 7.522 8.89 7.56 15.143.039 6.255-2.984 13.814-11.389 22.092zM38 9.856c-2.217 5.922-2.265 14.236-.485 23.064 1.789 8.868 5.457 18.437 10.873 26.948 10.83 17.017 28.875 30.065 52.957 24.216l-.708-2.915c-22.39 5.438-39.295-6.535-49.718-22.912-5.21-8.186-8.744-17.407-10.463-25.93-1.726-8.562-1.585-16.24.354-21.418zm63.345 74.228c37.306-9.062 61.143-21.416 68.514-26.567l-1.718-2.459c-6.987 4.883-30.454 17.111-67.504 26.11z"
                fill="currentColor"
            />
        </svg>
    );
};

export default SpiralArrowIcon;
