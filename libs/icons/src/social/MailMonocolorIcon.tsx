import type { FC, ComponentProps } from "react";

const MailIcon: FC<ComponentProps<"svg">> = props => {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}>
            <path
                d="M20.627 4.845H3.373a.614.614 0 0 0-.613.614v1.234c0 .057.062.123.112.149l9.069 5.18a.15.15 0 0 0 .154-.001l8.794-5.174c.05-.028.18-.1.23-.134.06-.04.121-.077.121-.15V5.459a.614.614 0 0 0-.613-.614m.537 3.71a.16.16 0 0 0-.155 0l-4.977 2.93a.153.153 0 0 0-.035.236l4.978 5.365a.15.15 0 0 0 .22.004.15.15 0 0 0 .045-.108V8.688a.15.15 0 0 0-.076-.133m-6.567 3.912a.15.15 0 0 0-.19-.028l-1.994 1.174a.78.78 0 0 1-.77.005l-1.756-1.003a.15.15 0 0 0-.18.02L3.04 18.82a.153.153 0 0 0 .028.244q.153.09.305.09H20.45a.153.153 0 0 0 .112-.258zm-6.357-.563a.153.153 0 0 0-.027-.245L2.989 8.675a.153.153 0 0 0-.229.133v7.83a.153.153 0 0 0 .258.111z"
                fill="currentColor"
            />
        </svg>
    );
};

export default MailIcon;
