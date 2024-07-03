/* eslint-disable */
"use client"
import React from "react";
import { usePopupDialogStore, useTransferSelectorStore, useWithdrawStore } from "@royalfut/store";
import { EUIDialogsNames } from "@royalfut/enums";
import { PrimaryGradientBox, GradientButton, Input } from "@royalfut/ui";
import { CompareArrowsIcon, ArrowChevronRightIcon } from "@royalfut/icons";
import { PaymentMethodsGetCashSets } from "@royalfut/collections";
import { OrderBoxTitle, PaymentMethodChoice } from "../../../funnels";
import { useEffect, useState } from "react";
import { sendWalletAddress, withdrawRequest } from "@royalfut/actions";
import { useRouter } from "next/navigation";

const WithdrawDialog = () => {
    const { popup, clear } = usePopupDialogStore();
    const { wallet } = useWithdrawStore(state => ({ wallet: state.wallet }))
    const token = null;
    const router = useRouter()

    const selectedPayment = useTransferSelectorStore.use.payment();

    const[value, setValue] = useState("")
    const[walletValue, setValueWallet] = useState("")
    const [sendReq, setSendReq] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    if (popup !== EUIDialogsNames.WITHDRAW) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, cb: (value: string) => void) => {
        if (e.target.id === "crypto") {
            cb(e.target.value)
        } else {
            const regex = /^[0-9]*$/;
            const inputValue = e.target.value;
            if (!regex.test(inputValue)) {
                e.target.value = inputValue.slice(0, -1);
            }
            if (wallet) {           
                if (+inputValue > wallet?.balance) {
                    e.target.value = String(wallet?.balance)
                }
            }
            cb(e.target.value)
        }
    }

    useEffect(() => {
        async function withdrawNow (token: any | null | undefined, walletAddress: any, value: number, method: any) {
            
            if (method === 'sixth') {
                await sendWalletAddress(token, walletAddress)
                await withdrawRequest(token, value, method)
                    .then(res => {
                        if (res) {
                            clear();
                            router.push('/profile/withdrawals/payment-confirmed')
                        }  
                    })
            } else if (method === 'first') {
                await withdrawRequest(token, value, method)
                    .then(res => {
                        if (res) {
                            window.open(`${res}`, '_blank')
                            clear();
                            // router.push('/profile/withdrawals/payment-confirmed')
                        }                        
                    })
            }            
        }
        if (sendReq === true) {
            setSendReq(false)
            withdrawNow(token, walletValue, Number(value), selectedPayment).then(res=>console.log(res))
            
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sendReq, token, walletValue, value, selectedPayment])

    useEffect(() => {
        if (selectedPayment === "first") {
            if (value.length <= 0) {
                setIsDisabled(true)
            } else {
                setIsDisabled(false)
            }
        } else if (selectedPayment === "sixth") {
            if (value.length <= 0 || walletValue.length <= 0) {
                setIsDisabled(true)
            } else {
                setIsDisabled(false)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value, walletValue, selectedPayment])

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
                        initialValue={""}
                        value={value}
                        onChange={(e)=>handleChange(e,setValue)}
                        icon={{
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            "<>": props => (
                                <>
                                    {/* @ts-expect-error */}
                                    <button onClick={()=>setValue(wallet?.balance)} {...props}>Withdraw all</button>
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
                        Available balance: ${' '}
                        {wallet?.balance}
                    </span>
                </div>
            </div>
            {
                selectedPayment === 'sixth' && 
                <div className="flex flex-col mb-8">
                    <OrderBoxTitle>Crypto Wallet</OrderBoxTitle>
                    <div className="[--input-background:235,_22%,_22%]">
                            <Input
                                id="crypto"
                                onChange={(e)=>handleChange(e,setValueWallet)}
                                required
                                placeholder="Address"
                                initialValue={""}
                                value={walletValue}
                                borderType="box"
                                vtype={"primary"}
                                cnBox="h-14 sm:h-12 w-full relative group inline-flex items-center justify-center z-[1]"
                                type="text"
                                className="text-4xl pl-3 pr-28 font-medium w-96"
                            />
                    </div>
                </div>
            }
            <GradientButton onClick={()=>setSendReq(true)} className={`group w-full sm:w-full py-4.5`} disabled={isDisabled}>
                <span className="text-xl">Withdraw Now</span>
                <ArrowChevronRightIcon className="text-white w-6 h-6 group-hover:animate-shake-r-sm group-hover:animate-infinite group-hover:animate-duration-[1300ms] group-hover:animate-ease-linear" />
            </GradientButton>
        </div>
    );
};

export default WithdrawDialog;
