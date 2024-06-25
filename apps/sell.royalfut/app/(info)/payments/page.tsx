import Link from "next/link";

const Index = async () => {
    return (
        <div className="flex flex-row self-center">
            <section className="w-full max-w-viewport min-w-viewport mx-auto px-4 md:px-8 flex flex-col mt-12 gap-3">
                <h1 className="w-80 text-6xl font-bold text-white mb-10">
                    Payment
                </h1>

                <p className="leading-5">
                    <Link href={"https://royalfut.com"}>ROYALFUT.COM</Link>{" "}
                    specializes in purchasing coins from players and promptly
                    sending them their deserved funds. We accept payments in
                    different currencies without any additional fees.
                </p>

                <p className="leading-5">
                    Only registered users can initiate transactions on our
                    platform, which are facilitated through trusted
                    international payment systems.
                </p>

                <p className="leading-5">
                    Please be aware that individuals residing in certain regions
                    are restricted from selling coins to us. These regions
                    include: Afghanistan, American Samoa, Aruba, Bahamas,
                    Botswana, Burundi, Cambodia, Central African Republic,
                    Congo, Democratic Republic of Congo, Crimea and Sevastopol,
                    Cuba, Equatorial Guinea, Eritrea, Ethiopia, Iraq, Lebanon,
                    Libya, Mali, Myanmar, Nicaragua, North Korea, Pakistan,
                    Palestine, Russian Federation, Samoa, Sierra Leone, Somalia,
                    South Sudan, Sudan, Syria, Trinidad and Tobago,
                    Turkmenistan, Uganda, US Virgin Islands, Venezuela, Yemen,
                    Zimbabwe.
                </p>

                <p className="leading-5">
                    Your peace of mind is paramount to us; therefore, we ensure
                    that every transaction you make with us is secure and
                    trustworthy.
                </p>
            </section>
        </div>
    );
};

export default Index;
