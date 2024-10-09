import termsText from "./termsText";

let count = 0;

const Index = async () => {
    return (
        <div className="flex flex-row self-center">
            <section className="w-full max-w-viewport min-w-viewport mx-auto px-4 md:px-8 flex flex-col mt-12 gap-3">
                <h1 className="text-5xl font-bold text-white mb-10">
                    Terms and Conditions
                </h1>

                <p className="text-sm text-slate-50 text-opacity-80">
                    Please read the following User Agreement carefully. If you
                    do not accept any of the items in this User Agreement, you
                    do not have the right to confirm your registration, use any
                    services provided by https://royalfut.com, or sell, buy or
                    exchange goods via this trading platform.
                </p>
                <h3 className="text-2xl font-bold">User Agreement</h3>
                {termsText.map((el: { p: string | number | boolean }) => {
                    return (
                        <noindex key={count++}>
                            <p className="text-sm pb-5 text-slate-50 text-opacity-80">
                                {el.p}
                            </p>
                        </noindex>
                    );
                })}
                <p className="leading-5 pb-5">
                    <a
                        rel="nofollow"
                        href="/Terms_and_conditions_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                        target={"_blank"}
                        className="underline underline-offset-2 text-xl"
                    >
                        Terms and conditions from 01.10.2020 (01.10.2020 -
                        07.02.2021)
                    </a>
                </p>
                <p className="leading-5 pb-5">
                    <a
                        rel="nofollow"
                        href="/Terms_and_conditions_from_08_02_2021_08_02_2021_03_06_2021.pdf"
                        target={"_blank"}
                        className="underline underline-offset-2 text-xl"
                    >
                        Terms and conditions from 08.02.2021 (08.02.2021 -
                        03.06.2021)
                    </a>
                </p>
                <p className="leading-5 pb-5">
                    <a
                        rel="nofollow"
                        href="/Privacy_Policy_from_01_10_2020_01_10_2020_07_02_2021.pdf"
                        target={"_blank"}
                        className="underline underline-offset-2 text-xl"
                    >
                        Privacy Policy from 01.10.2020 (01.10.2020 - 07.02.2021)
                    </a>
                </p>
            </section>
        </div>
    );
};

export default Index;
