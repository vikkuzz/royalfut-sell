import styles from "./Aside.module.scss";
import Image from "next/image";

const Aside = () => {
    const stock = {
        rate: "4.6",
        reviews: 527,
    };

    return (
        stock && (
            <aside className="flex justify-center px-6">
                <a
                    rel="nofollow noreferrer"
                    target="_blank"
                    className={`flex inline-flex h-11 justify-center items-center gap-2 flex-shrink-0 ${styles.aside_wrapper}`}
                    href={"https://uk.trustpilot.com/review/royalfut.com"}>
                    <Image
                        alt="logo"
                        width={24}
                        height={24}
                        className={`${styles.aside_logo}`}
                        src={"/image/tpstar-logo.svg"}
                    />
                    TrustScore <b>{stock.rate}</b> |{" "}
                    <b className={`flex whitespace-nowrap underline`}>
                        {stock.reviews} reviews
                    </b>
                </a>
            </aside>
        )
    );
};

export default Aside;
