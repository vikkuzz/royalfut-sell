import Link from "next/link";
import { DividerMenu } from "./Divider";

import styles from "./Divider.module.scss";

const ProfileNav = () => {
    return (
        <div className="flex flex-col mt-10">
            <DividerMenu label="Profile" className={styles.lineMenu} />
            <nav className="flex flex-col space-y-5 mt-6">
                <Link
                    href="/profile/orders"
                    className="text-xl text-center font-semibold transition-colors duration-200 text-white hover:text-white-60">
                    Orders
                </Link>
                <Link
                    href="/profile/settings"
                    className="text-xl text-center font-semibold transition-colors duration-200 text-white hover:text-white-60">
                    Settings
                </Link>
            </nav>
        </div>
    );
};

export default ProfileNav;
