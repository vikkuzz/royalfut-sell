import React, { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import styles from "../../styles/Newpages.module.scss";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import GradientBtn from "../../components/GradientBtn";
import Link from "next/link";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../../utils/useLinguiInit";

const NewPages = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const pagesData = [
        {
            id: "new51",
            url: "new51",
            title: "It's a pity that our prices seemed too high to you",
            p1: "We always strive to offer the cheapest FC coins on the market.",

            p2: "Use this discount coupon on our next purchase to see for yourself: ",
            promocode: "HEY5",
        },
        {
            id: "new52",
            url: "new52",
            title: "Your trust is the most important thing for us",
            p1: "At ROYALFUT, we prioritize transparency and security in every transaction. Our prices are among the lowest on the market and there are no fees whatsoever.",

            p2: "As a token of our appreciation for giving us a try, we would like to offer you this discount coupon: ",
            promocode: "HEY5",
        },
        {
            id: "new53",
            url: "new53",
            title: "Looking forward to your return to ROYALFUT!",
            p1: "We are always here to fulfill your needs when it comes to EA FC coins. ",

            p2: "Get 5% off your next order with this coupon: ",
            promocode: "HEY5",
        },
    ];
    const router = useRouter();
    const [pageText, setPageText] = useState();

    useEffect(() => {
        console.log(router);
        if (router?.asPath && router?.asPath != "/[newpages]") {
            const page = pagesData.filter(el =>
                router.asPath.includes(el.id)
            )[0];
            console.log(router.asPath, page);
            if (!page) {
                router.push("/404");
            } else {
                setPageText(page);
            }
        }
    }, [router?.asPath]);
    return (
        <MainContainer noBread={true}>
            <div className={`${styles.newpages_content}`}>
                <div className={styles.wrapper_img}>
                    <Image
                        width={241}
                        height={192}
                        src={"/img/blur_ellipse.png"}></Image>
                </div>
                {pageText && (
                    <div className={styles.text_content}>
                        <h1 className={styles.h1}>{pageText.title}</h1>
                        <p className={styles.p}>{pageText.p1}</p>
                        <p className={styles.p}>
                            {pageText.p2}
                            <strong className={styles.strong}>
                                {pageText.promocode}
                            </strong>
                        </p>
                        <Link href={"/order"} className={styles.btn_wrapper}>
                            <GradientBtn size={{ height: 64 }}>
                                <span className={styles.text_btn}>
                                    Buy coins
                                </span>
                            </GradientBtn>
                        </Link>
                    </div>
                )}
            </div>
        </MainContainer>
    );
};
export const getServerSideProps = async ctx => {
    const translation = await loadCatalog(ctx.locale);

    return {
        props: { translation },
    };
};

export default NewPages;
