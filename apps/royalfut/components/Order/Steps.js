import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/legacy/image";
// import { t } from "@lingui/macro";
import { orderStep } from "../../redux/actions/royalfutOrderActions";

import styles from "./Steps.module.scss";
import { useTranslations } from "next-intl";

const Steps = () => {
    const dispatch = useDispatch();
    const t = useTranslations("order");

    const defaultSteps = [
        {
            title: t(`ab93`),
            id: 1,
            active: true,
            selected: false,
            value: "",
        },
        {
            title: t(`ab94_1`),
            id: 2,
            active: false,
            selected: false,
            value: "",
        },
        {
            title: t(`ab95`),
            id: 3,
            active: false,
            selected: false,
            value: "",
        },
    ];

    const stateOrderStep = useSelector(
        state => state.royalfutOrderReducer.order_step
    );

    const [stateStep, setStateStep] = useState(defaultSteps);

    const handleStepClick = e => {
        let t_stateStep = stateStep.filter(el => el.selected);
        if (t_stateStep.length > 0) {
            for (let i = 0; i < t_stateStep.length; i++) {
                if (e.target.dataset.id == t_stateStep[i].id) {
                    dispatch(orderStep(e.target.dataset.id));
                }
            }
        }
    };

    useMemo(() => {
        let t_stateStep = stateStep.map(el => {
            if (el.id == 1) {
                el.title = t(`ab93`);
            }
            if (el.id == 2) {
                el.title = t(`ab94_1`);
            }
            if (el.id == 3) {
                el.title = t(`ab95`);
            }
            if (el.id <= stateOrderStep && el.id != 3) {
                el.selected = true;
            }
            if (el.id == stateOrderStep) {
                el.active = true;
            } else {
                el.active = false;
            }
            return { ...el };
        });

        setStateStep(t_stateStep);
    }, [stateOrderStep]);

    return (
        <div className={`${styles.scroll}`}>
            <div className={`${styles.container_order_options}`}>
                {stateStep.map(el => {
                    return (
                        <button
                            onClick={handleStepClick}
                            className={`${styles.option_slide}`}
                            key={el.id}
                            data-id={el.id}>
                            <div
                                data-id={el.id}
                                className={`${styles.option_id} ${el.active && styles.option_id__active} ${
                                    el.selected && !el.active && styles.done
                                } ${el.failed && styles.payment_failed}`}>
                                {!el.selected ||
                                (el.selected && el.active) ||
                                el.id == 3 ? (
                                    el.id
                                ) : (
                                    <span
                                        className={`${styles.img_wrapper}`}
                                        data-id={el.id}>
                                        <Image
                                            data-id={el.id}
                                            width={20}
                                            height={20}
                                            src={
                                                "/img/checkmark 1.svg"
                                            }></Image>
                                    </span>
                                )}
                            </div>
                            <div
                                data-id={el.id}
                                className={`${styles.option_title} ${
                                    el.active && styles.option_title__active
                                } ${el.value !== "" && styles.color_green} ${el.failed && styles.color_red}`}>
                                {el.title}
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default Steps;
