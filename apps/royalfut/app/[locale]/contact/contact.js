import { useTranslations } from "next-intl";
import ContactsContent from "../../../components/ContactsContent";

import styles from "../../../styles/App.module.scss";

const Contacts = () => {
    const t = useTranslations("home.footer");

    return (
        <div className={`${styles.app_main} ${styles.app_contact_main}`}>
            <h2 className={`${styles.app_h1} ${styles.faq_h2}`}>
                {t("contact")}
            </h2>
            <ContactsContent />
        </div>
    );
};

export default Contacts;
