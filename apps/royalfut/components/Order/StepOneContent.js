import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import PlatformSection from "./PlatformSection";

import styles from "./StepOneContent.module.scss";

const DynamicCoinsChanger = dynamic(
    () => import("../../components/Order/CoinsChanger"),
    {
        loading: () => <Spin />,
    }
);
const DynamicStickyBlock = dynamic(
    () => import("../../components/Order/StickyTotalBlock"),
    {
        loading: () => <Spin />,
    }
);
const StepOneContent = () => {
    const stateOrderPlatform = useSelector(
        state => state.royalfutOrderReducer.order_platform
    );

    return (
        <div className={`${styles.order_content_wrapper}`}>
            <PlatformSection />
            {stateOrderPlatform && (
                <>
                    <DynamicCoinsChanger />
                    <DynamicStickyBlock />
                </>
            )}
        </div>
    );
};

export default StepOneContent;
