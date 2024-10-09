import {
    LayoutViewportSectionFrame,
    BorderedBox,
    GradientButton,
    Link,
} from "@royalfut/ui";
import { PROJECT_PUBLIC_ROUTES } from "@royalfut/collections";

const NotFoundPage = () => {
    return (
        <LayoutViewportSectionFrame className="flex flex-col">
            <BorderedBox
                design={{ gradient: true }}
                className="[--rounded:1.5rem]"
                cnBox="center p-15">
                <div className="center gap-4 flex-col">
                    <h2 className="text-2xl text-white-5">
                        Sorry, the page you&apos;re looking for doesn&apos;t
                        exist
                    </h2>
                    <span className="font-medium text-base text-white-60 text-center">
                        You may have typed the wrong address, or the page you
                        are trying to reach may have been removed.
                    </span>
                </div>
                <GradientButton asChild vsize="3xl">
                    <Link href={PROJECT_PUBLIC_ROUTES["HOME"]}>
                        Go to homepage
                    </Link>
                </GradientButton>
            </BorderedBox>
        </LayoutViewportSectionFrame>
    );
};

export default NotFoundPage;
