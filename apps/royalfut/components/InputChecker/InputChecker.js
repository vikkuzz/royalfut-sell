import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { useRouter } from 'next/router';
// import { Trans } from '@lingui/macro';
import { undisabled } from "../../redux/actions/royalfutActions";

import styles from "./InputChecker.module.scss";
import { useTranslations } from "next-intl";

const InputChecker = ({ classStyle }) => {
    const t = useTranslations("modal");
    // const router = useRouter();
    const dispatch = useDispatch();
    const [checked, setChecked] = useState({
        firstCheck: false,
        secondCheck: false,
        thirdCheck: false,
    });

    const checked3 = () => {
        const currCheck = { ...checked };
        if (currCheck.thirdCheck) {
            setChecked({
                firstCheck: false,
                secondCheck: false,
                thirdCheck: false,
            });
            localStorage.setItem("showModal", true);
        } else if (!currCheck.thirdCheck) {
            setChecked({
                firstCheck: true,
                secondCheck: true,
                thirdCheck: true,
            });
            localStorage.setItem("showModal", false);
        }
    };
    const checked2 = () => {
        const currCheck = { ...checked };
        if (currCheck.secondCheck) {
            setChecked(prevState => {
                return { ...prevState, secondCheck: false };
            });
        } else if (!currCheck.secondCheck) {
            setChecked(prevState => {
                return { ...prevState, secondCheck: true };
            });
        }
    };
    const checked1 = () => {
        const currCheck = { ...checked };
        if (currCheck.firstCheck) {
            setChecked({ ...currCheck, firstCheck: false });
        } else if (!currCheck.firstCheck) {
            setChecked({ ...currCheck, firstCheck: true });
        }
    };

    useEffect(() => {
        if (checked.firstCheck && checked.secondCheck) {
            dispatch(undisabled(true));
        } else {
            dispatch(undisabled(false));
        }
    }, [checked]);

    return (
        <div className={`${styles[`${classStyle}_wrapper`]}`}>
            <button
                type="button"
                name="button"
                className={`${styles[`${classStyle}_input_btn`]}`}>
                <fieldset className={`${styles[`${classStyle}_fieldset`]}`}>
                    <label className={`${styles[`${classStyle}_label`]}`}>
                        <input
                            onChange={checked1}
                            className={`${styles[`${classStyle}_checkbox`]}`}
                            type={"checkbox"}
                            checked={checked.firstCheck}></input>
                        <div
                            className={`${styles[`${classStyle}_fake_input`]}`}></div>
                        <span
                            className={`${styles[`${classStyle}_text_input`]}`}>
                            {/* <Trans>seo105</Trans> */}
                            {t("seo105")}
                        </span>
                    </label>
                </fieldset>
            </button>
            <button
                type="button"
                name="button"
                className={`${styles[`${classStyle}_input_btn_2`]}`}>
                <fieldset className={`${styles[`${classStyle}_fieldset`]}`}>
                    <label className={`${styles[`${classStyle}_label`]}`}>
                        <input
                            onChange={checked2}
                            className={`${styles[`${classStyle}_checkbox`]}`}
                            type={"checkbox"}
                            checked={checked.secondCheck}></input>
                        <div
                            className={`${styles[`${classStyle}_fake_input`]}`}></div>
                        <span
                            className={`${styles[`${classStyle}_text_input`]}`}>
                            {/* <Trans>seo106</Trans> */}
                            {t("seo106")}
                        </span>
                    </label>
                </fieldset>
            </button>
            <button
                type="button"
                name="button"
                className={`${styles[`${classStyle}_input_btn_3`]}`}>
                <fieldset className={`${styles[`${classStyle}_fieldset`]}`}>
                    <label className={`${styles[`${classStyle}_label`]}`}>
                        <input
                            onChange={checked3}
                            className={`${styles[`${classStyle}_checkbox`]}`}
                            type={"checkbox"}
                            checked={checked.thirdCheck}></input>
                        <div
                            className={`${styles[`${classStyle}_fake_input`]}`}></div>
                        <span
                            className={`${styles[`${classStyle}_text_input`]} ${
                                styles[`${classStyle}_text_input_color`]
                            }`}>
                            {/* <Trans>seo107</Trans> */}
                            {t("seo107")}
                        </span>
                    </label>
                </fieldset>
            </button>
        </div>
    );
};

export default InputChecker;
