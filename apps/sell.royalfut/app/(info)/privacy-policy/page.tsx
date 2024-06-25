import Link from "next/link";
import privacyText from "./privacyText";

const Index = async () => {
    return (
        <div className="flex flex-row self-center">
            <section className="w-full max-w-viewport min-w-viewport mx-auto px-4 md:px-8 flex flex-col mt-12 gap-3">
                <h1 className="text-6xl font-bold text-white mb-10">
                    Privacy policy
                </h1>
                {privacyText.map((el, i) => {
                    return (
                        <p
                            className={`text-sm text-slate-50 text-opacity-80 ${el.padding === true && "pb-5 "}`}
                            key={i}>
                            <span
                                className={`w-auto pr-3 pl-3 ${el.marker === false && "hidden"}`}>
                                •
                            </span>
                            <span>{el.p}</span>
                        </p>
                    );
                })}
                <p>
                    Consent is valid from the moment the personal data subject
                    is registered at{" "}
                    <Link
                        href="/termsold"
                        target={"_blank"}
                        className="underline underline-offset-2">
                        https://royalfut.com
                    </Link>
                </p>
                <p>
                    If you want to delete your RoyalFUT account please send the
                    request at{" "}
                    <a
                        className="underline underline-offset-2"
                        href="mailto:support@royalfut.com"
                        target={"_blank"}
                        rel="noreferrer">
                        support@royalfut.com
                    </a>
                </p>
            </section>
        </div>
    );
};

export default Index;
