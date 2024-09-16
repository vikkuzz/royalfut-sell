import { useRouter } from "next/router";
import { Trans, t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { loadCatalog } from "../utils/useLinguiInit";
import MainContainer from "../components/MainContainer";
import { seoTags } from "../data-elements/seoTags";

import styles from "../styles/App.module.scss";

const CookiePage = () => {
    /**
     * This hook is needed to subscribe your
     * component for changes if you use t`` macro
     */
    useLingui();
    const router = useRouter();
    const seo = seoTags[router.locale];

    return (
        <MainContainer
            title={seo.delivery.title}
            description={seo.delivery.description}
            customStyle={".no_backgr_img"}>
            <div className={`${styles.app_main} ${styles.terms_main}`}>
                <h1 className={`${styles.app_h1} ${styles.delivery_h}`}>
                    <Trans>ab53</Trans>
                </h1>
                <p className={styles.p_cook}>
                    <Trans>ab54</Trans>
                </p>

                <h2 className={`${styles.h2_cook}`}>
                    <Trans>ab55</Trans>
                </h2>
                <p className={styles.p_cook}>
                    <Trans>ab56</Trans>
                </p>
                <h2 className={`${styles.h2_cook}`}>
                    <Trans>ab57</Trans>
                </h2>
                <h3 className={`${styles.h3_cook}`}>
                    <Trans>ab58</Trans>
                </h3>
                <p className={styles.p_cook}>
                    <Trans>ab59</Trans>
                </p>
                <h3 className={`${styles.h3_cook}`}>
                    <Trans>ab60</Trans>
                </h3>
                <p className={styles.p_cook}>
                    <Trans>ab61</Trans>
                </p>
                <h3 className={`${styles.h3_cook}`}>
                    <Trans>ab62</Trans>
                </h3>
                <p className={styles.p_cook}>
                    <Trans>ab63</Trans>
                </p>
                <h3 className={`${styles.h3_cook}`}>
                    <Trans>ab64</Trans>
                </h3>
                <p className={styles.p_cook}>
                    <Trans>ab65</Trans>
                </p>
                <p className={styles.p_cook}>
                    <Trans>ab66</Trans>
                </p>
                <ol className={`${styles.cook_ol}`}>
                    <li>
                        1. <Trans>ab67</Trans>
                    </li>
                    <li>
                        2. <Trans>ab68</Trans>
                    </li>
                    <li>
                        3. <Trans>ab69</Trans>
                    </li>
                </ol>
                <p className={`${styles.p_cook} initial`}>
                    <Trans>ab70</Trans>
                    <a href={t`ab71`}>
                        <b>
                            <Trans>ab71</Trans>
                        </b>
                    </a>
                </p>
                <h2 className={`${styles.h2_cook}`}>
                    <Trans>ab73</Trans>
                </h2>
                <p className={styles.p_cook}>
                    <Trans>ab74</Trans>
                </p>
                <p className={styles.p_cook}>
                    <Trans>ab75</Trans>
                </p>
                <h2 className={`${styles.h2_cook}`}>
                    <Trans>ab76</Trans>
                </h2>
                <p className={styles.p_cook}>
                    <Trans>ab77</Trans>
                </p>
                <h2 className={`${styles.h2_cook}`}>
                    <Trans>ab78</Trans>
                </h2>
                <p className={styles.p_cook}>
                    {t`ab79`.replace("support@royalfut.com.", "")}
                    <a
                        href="mailto:support@royalfut.com"
                        className={`${styles.mail}`}>
                        support@royalfut.com.
                    </a>
                </p>
            </div>
        </MainContainer>
    );
};

export const getStaticProps = async ctx => {
    const translation = await loadCatalog(ctx.locale);

    return {
        props: { translation },
    };
};

export default CookiePage;
