import { getTranslations } from "next-intl/server";
import { Link, Button, GradientButton, InteractionCard } from "@royalfut/ui";
import { PROJECT_PUBLIC_WWW_ROUTES } from "@royalfut/collections";

const CoinTransactionPromptCard = async () => {
    const t = await getTranslations("skyler_pages");

    return (
        <InteractionCard.Root className="no-print">
            <InteractionCard.BgCoins
                images={["t/coin-card-2.webp", "t/coin-card-1.webp"]}
            />
            <InteractionCard.Title label={t("card.title")} />
            <InteractionCard.Body>
                <GradientButton asChild className="h-16 w-full rounded-xl">
                    <Link href={PROJECT_PUBLIC_WWW_ROUTES["ORDER_INFO"]}>
                        {t("card.button.1")}
                    </Link>
                </GradientButton>
                <Button
                    asChild
                    vtype="bordered-shadow"
                    className="h-16 w-full rounded-xl font-semibold text-xl">
                    <Link
                        className="text-center"
                        href={PROJECT_PUBLIC_WWW_ROUTES["HOME"]}>
                        {t("card.button.2")}
                    </Link>
                </Button>
            </InteractionCard.Body>
        </InteractionCard.Root>
    );
};

export default CoinTransactionPromptCard;
