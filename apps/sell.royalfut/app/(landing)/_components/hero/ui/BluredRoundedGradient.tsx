const BluredRoundedGradient = () => {
    return (
        <>
            <div
                style={{
                    background:
                        "radial-gradient(circle, rgba(251,158,225,.4) 26%, rgba(251,158,225,0) 100%)",
                }}
                className="absolute h-[70%] top-[5%] left-0 w-[50%] sm:top-[25%] sm:left-[10%] sm:w-[70%] translate-y-0 sm:h-full z-[-2] blur-[56px]"
            />
            <div
                style={{
                    background:
                        "radial-gradient(circle, rgba(247,188,74,.5) 20%, rgba(247,188,74,0) 100%)",
                }}
                className="absolute h-[70%] top-[5%] right-[6%] w-[20%] sm:top-[25%] sm:right-[20%] sm:w-[20%] translate-y-0 sm:h-full z-[-2] blur-[56px]"
            />
            <div
                style={{
                    background:
                        "radial-gradient(circle, rgba(153,69,240,.8) 20%, rgba(102,120,233,0) 100%)",
                }}
                className="absolute h-[60%] top-[10%] left-[45%] w-[30%] sm:top-[35%] sm:left-[40%] sm:w-[30%] translate-y-0 sm:h-full z-[-2] blur-[56px]"
            />
            {/* <Image
                    src="/image/blured-radial-gradient.png"
                    alt="gradient"
                    fill
                    priority
                    loading="eager"
                    className="opacity-10 absolute translate-y-10 scale-150 !h-[70%] sm:!h-full sm:translate-y-0 sm:scale-100 z-[-2]"
                /> */}
        </>
    );
};

export default BluredRoundedGradient;
