function MediaIndicator() {
    if (process.env.NODE_ENV === "production") return null;

    return (
        <div className="font-body fixed bottom-1 left-1 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-white p-3 text-xs text-black-background">
            <div className="block xs:hidden">&empty;</div>
            <div className="hidden xs:block sm:hidden">xs</div>
            <div className="hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
                sm
            </div>
            <div className="hidden md:block lg:hidden xl:hidden 2xl:hidden">
                md
            </div>
            <div className="hidden lg:block xl:hidden 2xl:hidden">lg</div>
            <div className="hidden xl:block 2xl:hidden">xl</div>
            <div className="hidden 2xl:block 3xl:hidden">2xl</div>
            <div className="hidden 3xl:block 4xl:hidden">3xl</div>
            <div className="hidden 4xl:block">4xl</div>
        </div>
    );
}

export default MediaIndicator;
