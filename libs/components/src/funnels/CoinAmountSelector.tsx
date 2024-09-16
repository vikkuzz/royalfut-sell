import CryptoSellAmountInput from "./CryptoSellAmountInput";
import { OrderBoxTitle } from "./TradeSummary.client";

const CoinAmountSelector = () => {
    return (
        <div className="flex flex-col">
            <OrderBoxTitle>Specify the amount of coins for sale</OrderBoxTitle>
            <CryptoSellAmountInput />
        </div>
    );
};

export default CoinAmountSelector;
