import Image from "next/image";
import {
    Link,
    LayoutViewportSectionFrame,
    BorderedBox,
    GradientButton,
} from "@royalfut/ui";
import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";

const NotFoundPage = () => {
    return (
        <LayoutViewportSectionFrame className="flex flex-col">
            <BorderedBox
                design={{ gradient: true, subtract: { isEnable: true } }}
                className="[--rounded:1.5rem] [--color-illusion-linear-bg:theme(colors.white.5)]"
                cnBox="center flex-col p-15 gap-10">
                <div className="relative w-96 h-auto aspect-[5/3]">
                    <Image
                        fill
                        src="/image/404.png"
                        alt="404"
                        className="object-contain"
                    />
                </div>
                <div className="flex center flex-col gap-9">
                    <div className="center gap-4 flex-col">
                        <h2 className="text-2xl text-white text-center font-bold">
                            Sorry, the page you&apos;re looking for doesn&apos;t
                            exist
                        </h2>
                        <span className="font-medium text-base text-white-60 text-center">
                            You may have typed the wrong address, or the page
                            you are trying to reach may have been removed.
                        </span>
                    </div>
                    <GradientButton asChild vsize="3xl">
                        <Link href={PROJECT_PUBLIC_ROUTES["HOME"]}>
                            Go to homepage
                        </Link>
                    </GradientButton>
                </div>
            </BorderedBox>
        </LayoutViewportSectionFrame>
    );
};

export default NotFoundPage;
