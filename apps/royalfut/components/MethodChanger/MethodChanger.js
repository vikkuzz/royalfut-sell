import { useDispatch, useSelector } from "react-redux";
import { Trans } from "@lingui/macro";
import { changeMethod } from "../../redux/actions/royalfutActions";

import styles from "../../styles/MethodChanger.module.scss";

const MethodChanger = () => {
    const method = useSelector(state => state.royalfutReducer.method);

    const dispatch = useDispatch();

    const userChangeMethod = e => {
        dispatch(changeMethod(e.target.dataset.id));
    };

    return (
        <div className={`${styles.method}`}>
            <div className={`${styles.wrapper_radiogroup}`}>
                <label
                    data-id={"easy"}
                    className={`${styles.method_label} ${
                        method.easy
                            ? styles.label_checked
                            : styles.label_not_checked
                    }`}>
                    <input
                        onChange={userChangeMethod}
                        data-id={"easy"}
                        className={`${styles.method_radio}`}
                        type={"radio"}
                        name="method"
                        value="easy"
                        checked={method.easy ? true : false}></input>
                    <div data-id={"easy"} className={`${styles.method_check}`}>
                        <div
                            className={`${
                                method.manual
                                    ? styles.fake_input_false
                                    : styles.fake_input_true
                            }`}></div>
                    </div>
                    <span data-id={"easy"}>
                        <Trans>locales.comfortMethodName</Trans>
                    </span>
                </label>
                <label
                    data-id={"manual"}
                    className={`${styles.method_label} ${
                        !method.easy
                            ? styles.label_checked
                            : styles.label_not_checked
                    }`}>
                    <input
                        onChange={userChangeMethod}
                        data-id={"manual"}
                        className={`${styles.method_radio}`}
                        type={"radio"}
                        name="method"
                        value="manual"
                        checked={!method.easy ? true : false}></input>
                    <div
                        data-id={"manual"}
                        className={`${styles.method_check}`}>
                        <div
                            className={`${
                                !method.manual
                                    ? styles.fake_input_false
                                    : styles.fake_input_true
                            }`}></div>
                    </div>
                    <span data-id={"manual"}>
                        <Trans>locales.marketMethodName</Trans>
                    </span>
                </label>
            </div>
        </div>
    );
};

export default MethodChanger;
