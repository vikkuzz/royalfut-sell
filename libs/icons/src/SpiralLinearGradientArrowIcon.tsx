import type { FC, ComponentProps } from "react";

const SpiralLinearGradientArrowIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 52 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M.893 3.429a1 1 0 0 0-.887 1.1l.958 8.95a1 1 0 0 0 1.99-.214L2.1 5.311l7.954-.852a1 1 0 1 0-.213-1.989zm15.582 9.113.11-.994-.017-.002-.016-.001zM32.46 10.71l-.358-.934zm7.213-6.287-.995-.1zm-3.49-3.336-.135.99zm-5.42 17.8-.837.545zm10.163 3.47-.016 1zm9.295 1a1 1 0 1 0 0-2zM.372 5.202c1.254 1.01 3.451 2.966 6.186 4.706 2.74 1.743 6.122 3.342 9.84 3.63l.154-1.993c-3.257-.253-6.316-1.668-8.92-3.325-2.61-1.66-4.662-3.493-6.004-4.575zm15.993 8.334c5.29.582 11.416.045 16.455-1.893l-.718-1.867c-4.688 1.803-10.484 2.325-15.518 1.772zm16.455-1.893c1.365-.525 3.184-1.295 4.716-2.397 1.522-1.093 2.92-2.63 3.133-4.722l-1.99-.202c-.128 1.26-.986 2.348-2.31 3.3-1.314.945-2.932 1.641-4.267 2.154zm7.849-7.119c.144-1.427-.462-2.518-1.367-3.243C38.439.588 37.321.232 36.317.096l-.268 1.982c.78.106 1.513.37 2.002.763.447.359.695.815.628 1.481zM36.317.096c-2.47-.335-4.404.448-5.782 1.943-1.334 1.446-2.08 3.483-2.425 5.591-.35 2.123-.31 4.418.013 6.489.32 2.054.934 3.979 1.803 5.313l1.676-1.092c-.657-1.007-1.206-2.625-1.503-4.53-.294-1.888-.326-3.968-.016-5.856.313-1.902.955-3.51 1.923-4.56.923-1 2.202-1.566 4.043-1.316zm-6.39 19.336c1.235 1.896 3.197 2.847 5.178 3.34 1.975.491 4.099.558 5.806.585l.032-2c-1.711-.027-3.626-.096-5.356-.526-1.725-.429-3.134-1.185-3.985-2.49zm10.984 3.925c3.106.05 6.237 0 9.311 0v-2c-3.12 0-6.192.05-9.279 0z"
                fill="url(#av-21)"
            />
            <defs>
                <linearGradient
                    id="av-21"
                    x1="50.222"
                    y1="1.019"
                    x2="-1.154"
                    y2="9.854"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#A82DF9" />
                    <stop offset="1" stopColor="#6678E9" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export default SpiralLinearGradientArrowIcon;
