import PlatformChoice from "./PlatformChoice";
import { PlatformSets } from "@royalfut/collections";
import { OrderBoxTitle } from "./TradeSummary.client";

const OrderByPlatforms = () => {
    return (
        <div className="flex flex-col mb-8">
            <OrderBoxTitle>Select your platform</OrderBoxTitle>
            <PlatformChoice sets={PlatformSets} />
        </div>
    );
};

export default OrderByPlatforms;
