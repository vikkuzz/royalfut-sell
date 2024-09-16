import React from "react";
import PaymentPageContent from "./paymentPageContent";

export default function PaymentPage({ params }) {
    return (
        <>
            <PaymentPageContent locale={params.locale} />
        </>
    );
}
