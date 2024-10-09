import { PROJECT_PRIVATE_SELLER_ROUTES } from "@royalfut/collections";
import { i18nRedirect } from "@royalfut/hooks";

const ProfilePage = () => {
    i18nRedirect(PROJECT_PRIVATE_SELLER_ROUTES["PROFILE_ORDERS"]);

    return null;
};

export default ProfilePage;
