import Image from "next/image";

const H1WithBackImg = ({ img, text }: { img: string; text: string }) => {
    return (
        <div className="flex bg-transparent justify-center relative py-12 w-full h-auto">
            <Image
                quality={100}
                className="absolute bg-transparent"
                alt="cover head"
                src={img}
                fill
                objectFit="cover"
            />
            <h1 className="block w-auto h-auto bg-transparent text-[28px] md:text-[52px] md:leading-[52px] max-w-xl font-bold text-center leading-normal z-[2]">
                {text}
            </h1>
        </div>
    );
};

export default H1WithBackImg;
