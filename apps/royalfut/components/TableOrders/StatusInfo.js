"use client";
import { useTranslations } from "next-intl";
// import { Trans, t } from '@lingui/macro';

import styles from "../../styles/TableOrders.module.scss";

const StatusInfo = ({ item, currentStatus, open }) => {
    const t = useTranslations("profile");
    return (
        <div className={`${styles.body_order}`}>
            <div
                className={`${styles.status} 
    ${currentStatus.backgrd_status === "green" && styles.green_body}
    ${currentStatus.backgrd_status === "red" && styles.red_body}
    ${currentStatus.backgrd_status === "blue" && styles.blue_body}
    `}>
                <div className={`${styles.status_info}`}>
                    <div>
                        <div className="column">
                            <span className={`${styles.status_title}`}>
                                {/* <Trans>locales.status</Trans> */}
                                {t("status")}
                            </span>
                            <h3 className={`${styles.status_text}`}>
                                {currentStatus.title_status}
                            </h3>
                        </div>

                        <div className={`${styles.status_icon_wrapper}`}>
                            {currentStatus.icon_status === "anime" && (
                                <div className={`${styles.wrapper_animation}`}>
                                    <div className={`${styles.block1}`}></div>
                                    <div className={`${styles.block2}`}></div>
                                </div>
                            )}

                            {currentStatus.icon_status === "error" && (
                                <img
                                    alt="error"
                                    className={`${styles.status_svg} ${styles.status_svg_warning}`}
                                    src="/img/Error.svg"></img>
                            )}
                            {currentStatus.icon_status === "info" && (
                                <img
                                    alt="info"
                                    className={`${styles.status_svg} ${styles.status_svg_warning}`}
                                    src="/img/info.svg"></img>
                            )}
                            {currentStatus.icon_status === "done" && (
                                <img
                                    alt="done"
                                    className={`${styles.status_svg} ${styles.status_svg_warning}`}
                                    src="/img/done_green.svg"></img>
                            )}
                            {currentStatus.icon_status === "wrong_info" && (
                                <img
                                    alt="warning"
                                    className={`${styles.status_svg} ${styles.status_svg_warning}`}
                                    src="/img/warning_circle.svg"></img>
                            )}
                        </div>
                    </div>
                    {open && currentStatus?.have_body === true && (
                        <p className={`${styles.status_description}`}>
                            {currentStatus.description_status}
                        </p>
                    )}
                    {currentStatus?.have_body === false && (
                        <p className={`${styles.status_description}`}>
                            {currentStatus.description_status}
                        </p>
                    )}
                    {!open &&
                        item.coinTransferred > 0 &&
                        (currentStatus.icon_status === "error" ||
                            currentStatus.icon_status === "wrong_info" ||
                            currentStatus.icon_status === "anime") && (
                            <div className={`${styles.wrapper_progress}`}>
                                <div
                                    className={`${styles.tableorder_content_progress} ${styles.style_row}`}>
                                    <div
                                        className={`${styles.tableorder_content_progressline} ${styles.custom_tableorder_content_progressline}`}>
                                        <div
                                            className={`${styles.tableorder_line} ${styles.custom_tableorder_content_line}`}
                                            style={{
                                                width: `${
                                                    item.percentTransferred &&
                                                    toString(
                                                        item.percentTransferred
                                                    ).indexOf("%") > -1
                                                        ? item.percentTransferred
                                                        : `${item.percentTransferred}%`
                                                }`,
                                            }}></div>
                                    </div>
                                    <div
                                        className={`${styles.tableorder_content_percent} ${styles.position}`}>
                                        {item.percentTransferred &&
                                        toString(
                                            item.percentTransferred
                                        ).indexOf("%") > -1
                                            ? item.percentTransferred
                                            : `${item.percentTransferred}%`}
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
                {currentStatus.transit_coins && open && (
                    <div className={`${styles.wrapper_progress}`}>
                        <div className={`${styles.tableorder_content_title}`}>
                            {`locales.transferred`.toLocaleString("ru-RU")}
                        </div>
                        <div
                            dir="ltr"
                            className={`${styles.tableorder_content_transfer}`}>
                            {item.coinTransferred.toLocaleString("ru-RU")} /{" "}
                            {item.coinCount.toLocaleString("ru-RU")}
                        </div>
                        <div
                            className={`${styles.tableorder_content_progress}`}>
                            <div
                                className={`${styles.tableorder_content_percent}`}>
                                {item.percentTransferred &&
                                toString(item.percentTransferred).indexOf("%") >
                                    -1
                                    ? item.percentTransferred
                                    : `${item.percentTransferred}%`}
                            </div>
                            <div
                                className={`${styles.tableorder_content_progressline}`}>
                                <div
                                    className={`${styles.tableorder_line}`}
                                    style={{
                                        width: `${
                                            item.percentTransferred &&
                                            toString(
                                                item.percentTransferred
                                            ).indexOf("%") > -1
                                                ? item.percentTransferred
                                                : `${item.percentTransferred}%`
                                        }`,
                                    }}></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatusInfo;
