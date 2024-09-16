import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/legacy/image";
import { loginModal } from "../../redux/actions/royalfutActions";

import styles from "../../styles/Menu.module.scss";
import { useTranslations } from "next-intl";

let counter = 0;

const Menu = ({ children, title, menuItems }) => {
    let stateBuyOff = useSelector(state => state.royalfutReducer.buy_of);
    const dispatch = useDispatch();
    const t = useTranslations("loginModal");

    return (
        <div className={`${styles.menu_container}`}>
            <div className={`${styles.title_wrapper}`}>
                <div className={`${styles.divider_wrapper}`}>
                    <div className={`${styles.divider}`}></div>
                </div>
                <div className={`${styles.title}`}>{title}</div>
                <div className={`${styles.divider_wrapper}`}>
                    <div className={`${styles.divider}`}></div>
                </div>
            </div>
            <menu className={`${styles.menu} ${stateBuyOff && "disabled"}`}>
                {children}

                {menuItems &&
                    menuItems.map(el => (
                        <Link
                            key={(counter += 1)}
                            href={el.url}
                            rel="nofollow"
                            onClick={() => dispatch(loginModal(false))}
                            className={`${styles.option_btn}`}>
                            {/* {translations[router.locale][
                                el.name.toLowerCase()
                            ] || el.name} */}
                            {t(`${el.key}`)}
                            {el?.img && (
                                <div className={`${styles.wrapper_img}`}>
                                    <Image
                                        width={24}
                                        height={24}
                                        src={el.img}
                                    />
                                </div>
                            )}
                        </Link>
                    ))}
            </menu>
        </div>
    );
};

export default Menu;
