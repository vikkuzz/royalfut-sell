import Header from "./Header";

import type { FNCN } from "@royalfut/interfaces";

const PrivateHeader: FNCN = ({ className }) => {
    return <Header className={className}>Header.private</Header>;
};

export default PrivateHeader;
