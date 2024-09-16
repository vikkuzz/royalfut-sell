import { LayoutViewportSectionFrame } from "@royalfut/ui";
import { useTranslations } from "next-intl";

const FIFA24CoinsPromo = () => {
    const t = useTranslations("home");

    return (
        <LayoutViewportSectionFrame asChild>
            <div className="mt-16 leading-4">
                <span className="text-white-50 text-base sm:text-xs font-medium">
                    {t.rich("promotional.offer.fc24.description", {
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
