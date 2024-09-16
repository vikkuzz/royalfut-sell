import React from "react";
import PurchasePageContent from "./purchasePageContent";

export default function PurchasePage({ params }) {
    return (
        <>
            <PurchasePageContent locale={params.locale} />
        </>
    );
}
