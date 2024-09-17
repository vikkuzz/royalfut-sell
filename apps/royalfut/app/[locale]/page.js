import { seoTags } from "../../data-elements/seoTags";
import api from "../../Api/Api";
import Index from "./index";

export async function generateMetadata({ params }) {
    console.log("params", params);
    return {
        title: "Pre-Order FIFA 25 Coins for All Platforms | Ultimate Team Coin Store",
        // title: seoTags[params.locale]?.title,
        description: "Best store to pre-order FUT 25 Coins ✓ Pre-order FIFA 25 Coins for PS 4/5, Xbox One/X/S Fast Delivery & 24/7 Live Support ⚡ 100% Secure Payments Safe place to get ",
        // description: seoTags[params.locale]?.description,
        icons: {
            icon: "/favicon2.ico", // /public path
        },
    };
}

async function getData() {
    const [promo, allReviews] = await Promise.all([
        api.getPromo(),
        Promise.all([api.getReviews(), api.getReviews(), api.getReviews()]),
    ]);

    let offers = null;
    const lastPromoCard = promo.promoCards[promo.promoCards.length - 1];
    const currentDate = new Date();
    const reviews = allReviews
        .flat()
        .filter(
            (item, index, array) =>
                array.findIndex(obj => obj.id === item.id) === index
        );

    if (lastPromoCard && new Date(lastPromoCard.endDate) > currentDate) {
        offers = [lastPromoCard];
    }

    return {
        data: {
            offers,
            reviews,
        },
    };
}

export default async function Home({ params }) {
    const data = await getData();

    return (
        <>
            <Index data={data} locale={params.locale} />
        </>
    );
}
