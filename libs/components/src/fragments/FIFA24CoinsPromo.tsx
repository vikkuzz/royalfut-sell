import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { useTranslations } from "next-intl";

const FIFA24CoinsPromo = ({ dir }: { dir: string }) => {
    const t = useTranslations("pi_home");

    return (
        <LayoutViewportSectionFrame asChild>
            <div className="mt-16 leading-4" dir={dir}>
                <span className="text-white-50 text-base sm:text-xs font-medium">
                    {t.rich("promotional.offer.fc24.description", {
                        fc: "FC 25",
                        fifa: "FIFA 25",
                        ut: "UT 25",
                        b: chunk => (
                            <span className="text-white-55 text-base sm:text-xs font-medium">
                                {chunk}
                            </span>
                        ),
                    })}
                </span>
            </div>
        </LayoutViewportSectionFrame>
    );
};

export default FIFA24CoinsPromo;
