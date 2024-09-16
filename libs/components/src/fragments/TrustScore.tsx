import Image from "next/image";

const TrustScore = () => {
    const stateStockRate = 4.6;

    return (
        <div
            className={`flex items-center gap-2.5 pt-6 z-30 bg-transparent md:p-5`}
        >
            <div className={`w-[30px] h-[30px]`}>
                <Image alt="star icon" src={"/img/truststar.svg"} width={30} height={30} className={`w-[30px] h-[30px]`}/>
            </div>
            <span>TrustScore {stateStockRate}</span>
        </div>
    );
};

export default TrustScore;
