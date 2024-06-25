import { LayoutViewportSectionFrame } from "@royalfut/ui";
import Image from "next/image";

const WithdrawalMethods = () => {
    const backgroundColor = {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        minWidth: "109px",
    };
    return (
        <LayoutViewportSectionFrame asChild>
            <section className="flex flex-col mt-24 items-center">
                <div className="mb-10">
                    <h2 className="w-auto text-6xl font-bold text-white text-center">
                        Withdrawal methods
                    </h2>
                </div>
                <div className="max-w-xl">
                    <span className="text-white-60 text-base font-medium inline-block leading-tight text-center">
                        Choose any convenient method of withdrawal. The average
                        funds transfer is 1-2h after your withdrawal request.
                    </span>
                </div>
                <div className="flex flex-wrap gap-2 md:gap-6 py-6 md:py-10">
                    <div
                        className={`flex flex-1 min-w-0 min-h-0 col-span-1 min-w-min rounded-2xl py-5 px-5 md:px-16 justify-center items-center`}
                        style={backgroundColor}>
                        <Image
                            alt="mastercard"
                            width={60}
                            height={37}
                            src="/image/mastercard.svg"
                        />
                    </div>
                    <div
                        className={`flex flex-1 min-w-0 min-h-0 col-span-1 min-w-min rounded-2xl py-5 px-5 md:px-16 justify-center items-center`}
                        style={backgroundColor}>
                        <Image
                            alt="mastercard"
                            width={60}
                            height={37}
                            src="/image/Visa.svg"
                        />
                    </div>
                    <div
                        className={`flex flex-1 min-w-0 min-h-0 col-span-1 min-w-min rounded-2xl py-5 px-5 md:px-16 justify-center items-center`}
                        style={backgroundColor}>
                        <Image
                            alt="mastercard"
                            width={60}
                            height={37}
                            src="/image/bitcoin.svg"
                        />
                    </div>
                    <div
                        className={`flex flex-1 min-w-0 min-h-0 col-span-1 min-w-min rounded-2xl py-5 px-5 md:px-16 justify-center items-center`}
                        style={backgroundColor}>
                        <Image
                            alt="mastercard"
                            width={60}
                            height={37}
                            src="/image/usdt.svg"
                        />
                    </div>
                    <div
                        className={`flex flex-1 min-w-0 min-h-0 col-span-1 min-w-min rounded-2xl py-5 px-5 md:px-16 justify-center items-center`}
                        style={backgroundColor}>
                        <Image
                            alt="mastercard"
                            width={60}
                            height={37}
                            src="/image/etherium.svg"
                        />
                    </div>
                </div>
            </section>
        </LayoutViewportSectionFrame>
    );
};

export default WithdrawalMethods;
