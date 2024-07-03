import { usePopupDialogStore } from "@royalfut/store";
import { PrimaryGradientBox, GradientButton } from "@royalfut/ui";
import { CompareArrowsIcon } from "@royalfut/icons";

const FiledNotice = () => {
    const { clear } = usePopupDialogStore();

    return (
        <div className="center flex flex-col border border-white-20 rounded-xl px-8 py-10 shadow-lg bg-black-shape">
            <div className="flex flex-col justify-center items-center space-y-7 mb-10">
                <PrimaryGradientBox
                    className="w-14 h-14 rounded-full flex shadow justify-center items-center"
                    activeShadow
                    withHover={false}>
                    <CompareArrowsIcon className="text-white h-7 w-7" />
                </PrimaryGradientBox>
                <h5 className="font-bold text-2xl">Cancelled</h5>
            </div>
            <div className="text-base text-white/40 pb-4">
                Withdrawal cancelled at your request
            </div>
            
            <GradientButton onClick={()=>clear()} className={`group w-full sm:w-full py-4.5`}>
                <span className="text-xl">Contact Us</span>
            </GradientButton>
        </div>
    );
};

export default FiledNotice;
