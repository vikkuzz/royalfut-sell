import { useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/legacy/image";
import { useDispatch } from "react-redux";
// import { Trans, t } from '@lingui/macro';
import styles from "./OrderDeliveryStage.module.scss";
import { orderData } from "../../redux/actions/royalfutOrderActions";
import Analitic from "../../Analitic/Analitic";
import { useTranslations } from "next-intl";

const analitic = new Analitic();

const OrderDeliveryStage = ({ backToPayment, successPayment }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations("order");
    let [currentPath, setCurrentPath] = useState("");
    let [timer, setTimer] = useState(10);
    useEffect(() => {
        let status = searchParams.get("status");
        if (status == "from-acquiring-successfully") {
            let params = {};
            searchParams.forEach((value, key) => {
                params[key] = value;
            });
            analitic.successPaymentCoinsPack(
                params?.priceEur,
                params?.payMethod,
                params?.coupon,
                params?.id,
                "ps4",
                params?.method
            );
            setCurrentPath("from-acquiring-successfully");
        }
        if (status == "from-acquiring-failed") {
            setCurrentPath("from-acquiring-failed");
        }
    }, [pathname]);

    useEffect(() => {
        if (currentPath === "from-acquiring-successfully") {
            if (successPayment) {
                successPayment();
            }
            for (let i = 0; i <= timer; i++) {
                (function (i) {
                    setTimeout(() => {
                        setTimer(timer - i);
                        if (i === 10) {
                            localStorage.removeItem("/order");
                            dispatch(orderData({ order_step: 1 }));

                            router.push(
                                `/profile?tab=orders&status=from-acquiring-successfully&page=neworder`
                            );
                        }
                    }, i * 1000);
                })(i);
            }
        }
    }, [currentPath]);

    if (currentPath == "from-acquiring-successfully") {
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.img_wrapper}`}>
                    <img
                        alt="coins"
                        className={`${styles.pic}`}
                        src="/img/coins/futcoins.webp"></img>
                </div>
                {/* <div className={`${styles.title_wrapper}`}>
                    <span className={`${styles.title}`}>{t.seo79}</span>
                </div> */}
                <div className={`${styles.text_wrapper}`}>
                    <span className={`${styles.text}`}>
                        {/* <Trans>seo80</Trans> */}
                        {t("seo80")}
                    </span>
                </div>
                <div className={`${styles.btn_wrapper}`}>
                    {/* <Link href={successUrl}> */}
                    <button
                        rel="nofollow"
                        onClick={() => {
                            localStorage.removeItem("/order");
                            router.push(
                                `/profile/#orders#from-acquiring-successfully#neworder`
                            );
                        }}
                        className={`${styles.btn}`}>
                        {/* <Trans>seo81</Trans> */}
                        {t("seo81")}
                        <Image
                            width={32}
                            height={26}
                            src={"/img/arrow-right-white.svg"}
                        />
                    </button>
                    {/* </Link> */}
                </div>
                <div className={`${styles.time_wrapper}`}>
                    <span className={`${styles.time_message}`}>
                        {t(`seo82`).replace("[X]", timer)}
                    </span>
                </div>
            </div>
        );
    } else {
        return (
            <div className={`${styles.container}`}>
                <div className={`${styles.img_wrapper}`}>
                    <img
                        alt="coins"
                        className={`${styles.pic}`}
                        src="/img/coins/futcoins_failed.webp"></img>
                </div>
                <div className={`${styles.title_wrapper}`}>
                    <span className={`${styles.title}`}>
                        {/* <Trans>seo175</Trans> */}
                        {t("seo175")}
                    </span>
                </div>
                <div className={`${styles.text_wrapper}`}>
                    <span className={`${styles.text}`}>
                        {/* <Trans>seo176</Trans> */}
                        {t("seo176")}
                    </span>
                </div>
                <div className={`${styles.btn_wrapper}`}>
                    {/* <Link href={failUrl}> */}
                    <button
                        rel="nofollow"
                        onClick={backToPayment}
                        className={`${styles.btn}`}>
                        {/* <Trans>seo86</Trans> */}
                        {t("seo86")}
                    </button>
                    {/* </Link> */}
                </div>
            </div>
        );
    }
};

export default OrderDeliveryStage;
