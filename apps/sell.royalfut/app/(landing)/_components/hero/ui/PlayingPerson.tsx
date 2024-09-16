import Image from "next/image";

const PlayingPerson = () => {
    return (
        <div className="flex justify-center w-full h-full -mt-5 md:-mt-10">
            <div className="aspect-[42/20] -translate-x-5 md:-translate-x-0 relative ml-[calc(100%_*_-1)] mr-[calc(100%_*_-1)] sm:ml-0 sm:mr-0 w-[200%] sm:w-full lg:w-[80%]">
                <Image
                    alt="hero"
                    src="/image/man-playing.png"
                    fill
                    priority
                    loading="eager"
                />
                {/* <ProgressiveImage
                    lowSrc="/image/man-playing-min.png"
                    alt="hero"
                    priority
                    src="/image/man-playing.png"
                    fill
                /> */}
            </div>
        </div>
    );
};

export default PlayingPerson;
