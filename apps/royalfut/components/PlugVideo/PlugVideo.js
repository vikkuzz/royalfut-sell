import { Trans } from "@lingui/macro";

import styles from "./PlugVideo.module.scss";

const PlugVideo = () => {
    return (
        <div className={`${styles.plug_container}`}>
            <div className={`${styles.plug_content}`}></div>
            <div className={`${styles.plug_gear_wrapper}`}>
                <img
                    alt="gear"
                    className={`${styles.gear_pic}`}
                    src="/img/gear.svg"></img>
                <span className={`${styles.plug_text}`}>
                    <Trans>work</Trans>
                </span>
            </div>
        </div>
    );
};

export default PlugVideo;
