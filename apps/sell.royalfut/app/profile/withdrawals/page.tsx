import Tabs from "../_components/Tabs";
import WithdrawPageContent from "./WithdrawPageContent/WithdrawPageContent";

const ProfileWithdrawalsPage = () => {
    return (
        <div className="flex flex-col gap-8">
            <Tabs page="withdrawals" />
            <WithdrawPageContent />
        </div>
    );
};

export default ProfileWithdrawalsPage;
