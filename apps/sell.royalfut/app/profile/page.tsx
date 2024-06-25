import { redirect } from "next/navigation";

const ProfilePage = () => {
    redirect("/profile/orders");

    return null;
};

export default ProfilePage;
