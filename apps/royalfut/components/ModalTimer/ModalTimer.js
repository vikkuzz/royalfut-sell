import Countdown from "react-countdown";
// import { useRouter } from 'next/router';
// import { Trans } from "@lingui/macro";

import styles from "./ModalTimer.module.scss";
import { useTranslations } from "next-intl";

const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a complete state
        return "Offer off";
    } else {
        // Render a countdown
        return (
            <span className={`${styles.countdown}`}>
                <span className={`${styles.countdown_days}`}>{days}d</span>
                <span className={`${styles.countdown_timer}`}>
                    {String(hours).split("").length > 1 ? hours : "0" + hours}:
                    {String(minutes).split("").length > 1
                        ? minutes
                        : "0" + minutes}
                    :
                    {String(seconds).split("").length > 1
                        ? seconds
                        : "0" + seconds}
                </span>
            </span>
        );
    }
};

const ModalTimer = () => {
    const t = useTranslations("modal");
    // const router = useRouter();
    return (
        <div className={`${styles.timer_container}`}>
            <div className={`${styles.img_wrapper}`}>
                <img
                    className={`${styles.timer_img}`}
                    src={"/img/modal_timer.png"}></img>
            </div>
            <div dir="ltr" className={`${styles.timer}`}>
                <Countdown
                    date={1695405600000}
                    // date={
                    //     currentPromo
                    //         ? Date.now() + currentPromo.endDate
                    //         : Date.now() + 0
                    // }
                    renderer={renderer}
                />
            </div>
            <div className={`${styles.description}`}>
                {/* <Trans>season</Trans> */}
                {t("season")}
            </div>
        </div>
    );
};

export default ModalTimer;
