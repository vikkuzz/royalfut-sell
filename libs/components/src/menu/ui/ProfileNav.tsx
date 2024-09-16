import { DividerMenu } from "./Divider";
import { useUIGlobalStore } from "@royalfut/store";
import { SheetNavigationItems } from "../../layout";

import styles from "./Divider.module.scss";

const ProfileNav = () => {
    const menu = useUIGlobalStore(state => state.menu.root);

    return (
        <div className="flex flex-col mt-10 gap-10">
            {menu.map(item => (
                <div key={item.section.label}>
                    <DividerMenu
                        label={item.section.label}
                        className={styles.lineMenu}
                    />
                    <SheetNavigationItems className="mt-6" links={item.nav} />
                </div>
            ))}
        </div>
    );
};

export default ProfileNav;
