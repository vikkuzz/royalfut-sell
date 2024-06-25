import {
    MasterCardSecureCodeMonocolorIcon,
    VisaVerifiedMonocolorIcon,
    PaymentVisaMonocolorIcon,
    MasterCardMonocolorIcon,
    // ApplePayMonocolorIcon,
    // GooglePayMonocolorIcon,
} from "@royalfut/icons";

const cnIconBox = "w-12 h-12 justify-center items-center flex";

const PaymentMethods = () => {
    return (
        <div className="h-12 items-start gap-2 inline-flex mr-0 sm:mr-10 justify-center sm:justify-end">
            <div className={cnIconBox}>
                <MasterCardSecureCodeMonocolorIcon className="w-12 relative justify-center text-white-60 flex" />
            </div>
            <div className={cnIconBox}>
                <VisaVerifiedMonocolorIcon className="w-12 relative justify-center text-white-60 flex" />
            </div>
            <div className={cnIconBox}>
                <PaymentVisaMonocolorIcon className="w-12 relative justify-center text-white-60 flex" />
            </div>
            <div className={cnIconBox}>
                <MasterCardMonocolorIcon className="w-12 h-7 relative justify-center text-white-60 flex" />
            </div>
            {/* <div className={cnIconBox}>
                <ApplePayMonocolorIcon className="w-12 h-12 relative justify-center text-white-60 flex" />
            </div>
            <div className={cnIconBox}>
                <GooglePayMonocolorIcon className="w-12 relative justify-center text-white-60 flex" />
            </div> */}
        </div>
    );
};

export default PaymentMethods;
