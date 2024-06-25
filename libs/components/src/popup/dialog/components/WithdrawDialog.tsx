import { usePopupDialogStore } from "@royalfut/store";
import { EUIDialogsNames } from "@royalfut/enums";
import { PrimaryGradientBox, GradientButton, Input } from "@royalfut/ui";
import { CompareArrowsIcon, ArrowChevronRightIcon } from "@royalfut/icons";
import { PaymentMethodsGetCashSets } from "@royalfut/collections";
import { OrderBoxTitle, PaymentMethodChoice } from "../../../funnels";

const WithdrawDialog = () => {
    const { popup } = usePopupDialogStore();

    if (popup !== EUIDialogsNames.WITHDRAW) {
        return null;
    }

    return (
        <div className="center space-y-3 flex flex-col border border-white-20 rounded-xl px-8 py-10 shadow-lg bg-black-shape">
            <div className="flex flex-col justify-center items-center space-y-7 mb-10">
                <PrimaryGradientBox
                    className="w-14 h-14 rounded-full flex shadow justify-center items-center"
                    activeShadow
                    withHover={false}>
                    <CompareArrowsIcon className="text-white h-7 w-7" />
                </PrimaryGradientBox>
                <h5 className="font-bold text-2xl">Withdrawal</h5>
            </div>
            <div className="max-w-sm">
                <OrderBoxTitle>
                    Choose your preferred way to get paid
                </OrderBoxTitle>
                <PaymentMethodChoice
                    className="[--selectable-btn-bg-interactive:var(--color-white-10)]"
                    sets={PaymentMethodsGetCashSets}
                />
            </div>
            <div className="flex flex-col mb-8">
                <OrderBoxTitle>How much to withdraw</OrderBoxTitle>
                <div className="[--input-background:235,_22%,_22%]">
                    <Input
                        required
                        placeholder="0"
                        initialValue={"0"}
                        icon={{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            "<>": props => (
                                <>
                                    {/* @ts-expect-error */}
                                    <button {...props}>Withdraw all</button>
                                </>
                            ),
                            props: {
                                centered: true,
                                className:
                                    "text-white text-xs font-medium right-14 cursor-pointer pointer-events-auto",
                            },
                        }}
                        borderType="box"
                        vtype={"primary"}
                        cnBox="h-14 sm:h-12 w-full relative group inline-flex items-center justify-center z-[1]"
                        type="text"
                        className="text-4xl pl-3 pr-28 font-medium w-96"
                    />
                </div>
                <div>
                    <span className="text-white-40 text-xs font-medium">
                        Available balance: $ 503,20
                    </span>
                </div>
            </div>
            <GradientButton className="group w-full sm:w-full py-4.5">
                <span className="text-xl">Withdraw Now</span>
                <ArrowChevronRightIcon className="text-white w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </GradientButton>
        </div>
    );
};

export default WithdrawDialog;
