import { useCallback, useState } from "react";
import VerificationInput from "react-verification-input";
import {
    useMagicLinkStore,
    useAuthStore,
    useUserStore,
    resetMagicLinkStore,
    useUISheetStore,
} from "@royalfut/store";
import { cn } from "@royalfut/utils";
import { useAuthListener } from "@royalfut/hooks";
import { handleFastLogin } from "@royalfut/actions";
import SendCodeAgain from "./SendCodeAgain";

const MAGIC_LINK_CODE_COUNT = 6;

const CodeVerification = () => {
    const [isValid, setIsValid] = useState<"unknown" | "valid" | "invalid">(
        "unknown"
    );
    const [isValidating, setIsValidating] = useState(false);
    const { loginListener } = useAuthListener();
    const setIsLogged = useAuthStore(state => state.setIsLogged);
    const setUser = useUserStore(store => store.setUser);
    const setOpen = useUISheetStore(state => state.setOpen);
    const [value, setValue] = useState("");
    const { email } = useMagicLinkStore();

    const onComplete = useCallback(
        async (value: string) => {
            try {
                setIsValidating(true);
                const profile = await handleFastLogin({
                    code: value,
                    email: email!,
                });
                setIsValid("valid");
                setIsValidating(false);
                setIsLogged(true);
                setUser(profile);
                loginListener(profile);
                resetMagicLinkStore();
                setOpen(false);
                return true;
            } catch (e) {
                setIsValid("invalid");
                setIsValidating(false);
                console.log(e);
            }
        },
        [email, loginListener, setIsLogged, setOpen, setUser]
    );

    const onClear = useCallback(() => {
        setIsValid("unknown");
        setValue("");
        setIsValidating(false);
    }, []);

    const onChange = useCallback((value: string) => {
        if (value.length < MAGIC_LINK_CODE_COUNT) {
            setIsValid("unknown");
        }
        setValue(value);
    }, []);

    return (
        <>
            <div className="flex flex-col mt-8 mb-6">
                <VerificationInput
                    placeholder="_"
                    validChars="0-9"
                    inputProps={{
                        inputMode: "numeric",
                        autoComplete: "one-time-code",
                        disabled: isValidating,
                    }}
                    length={MAGIC_LINK_CODE_COUNT}
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    value={value}
                    onChange={onChange}
                    onComplete={onComplete}
                    classNames={{
                        container: cn(
                            "w-full h-16 justify-between items-start inline-flex",
                            { "animate-pulse": isValidating }
                        ),
                        character: cn(
                            "grow shrink basis-0 h-16 bg-transparent p-2 rounded-xl border border-white border-opacity-60 justify-center items-center inline-flex text-center text-white text-4xl font-bold leading-normal focus-visible:outline-none",
                            {
                                "border-system-success": isValid === "valid",
                                "border-system-error": isValid === "invalid",
                                "opacity-50 cursor-not-allowed pointer-events-none bg-black-background/80":
                                    isValidating,
                            }
                        ),
                        characterInactive:
                            "text-white-60 border-white-60 outline-none",
                        characterSelected: cn("border outline-none", {
                            "!border-primary": value.length !== 6,
                        }),
                    }}
                />
                <span
                    className={cn(
                        "block will-change-[height] text-system-error text-xs transition-all duration-300",
                        {
                            "opacity-100 h-3.5 pt-1.5": isValid === "invalid",
                            "opacity-0 h-0 pt-0": isValid !== "invalid",
                        }
                    )}>
                    Code is not valid, try again!
                </span>
            </div>
            <SendCodeAgain onClear={onClear} />
        </>
    );
};

export default CodeVerification;
