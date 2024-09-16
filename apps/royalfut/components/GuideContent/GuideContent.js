import React from "react";

import styles from "./GuideContent.module.scss";
import StickyCoupon from "./StickyCoupon";
import ReviewsGallery from "../ReviewsGallery/ReviewsGallery";

const GuideContent = ({ reviews }) => {
    return (
        <div className={`${styles.wparrer_column}`}>
            <div className={`${styles.container}`}>
                <div className={`${styles.text_content}`}>
                    <p>
                        In EA FC 25, mastering controller buttons is crucial for
                        effective defending. In this guide we provide insights
                        into the best personalized tactics for EA Sports FC 25.
                    </p>
                    <p>
                        Below you can find recommended setups for different
                        formations:
                    </p>
                    <p>
                        <strong>4-2-3-1 Formation</strong>
                    </p>
                    <p>
                        This scheme is very balanced. Due to the fact that both
                        CDM and the outfield defenders do not run away to
                        attack, it becomes incredibly difficult for opponents to
                        even try to carry out a counterattack.
                    </p>
                    <p>
                        <span>Defensive Style: Balanced </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            35, Depth: 55
                        </span>
                        <span>Offensive Tactics: Balanced, Direct Passes </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            40, In the Box: 5/10, Corners: 2/5, Free Kicks: 2/5
                        </span>

                        <span>Instructions: </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>LB and
                            RB: Stay behind when attacking{" "}
                        </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>CDM 1:
                            Close the center, Stay behind when attacking{" "}
                        </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>CDM 2:
                            Close the center, Balanced Attack{" "}
                        </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>
                            CAM: Get ahead of yourself, Close the canopies in
                            the penalty area{" "}
                        </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>ST: Get
                            ahead of yourself, Get back on the defensive
                        </span>
                    </p>
                    <p>
                        <strong>4-3-3 Formation</strong>
                    </p>
                    <p>
                        <span>Defensive Style: Balanced </span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>Depth:
                            50
                        </span>
                        <span>Offensive Tactics: Long Ball, Direct Passes</span>
                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            40, In the Box: 5/10, Corners: 2/5, Free Kicks: 2/5{" "}
                        </span>
                        <span>Instructions: </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Stay
                            Behind in Attack for backs, Cover the Center for
                            midfielders, Stay in Front for attacking midfielder
                            and wingers, Stay in Front for striker
                        </span>
                    </p>
                    <p>
                        <strong>5-2-2-1 Formation</strong>
                    </p>
                    <p>
                        <span>Defensive Style: Balanced </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            45, Depth: 40{" "}
                        </span>

                        <span>
                            Offensive Tactics: Long Ball, Direct Passes{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            55, In the Box: 5/10, Corners: 2/5, Free Kicks: 2/5{" "}
                        </span>

                        <span>Instructions: </span>

                        <span>
                            {" "}
                            <span className={`${styles.marker}`}>•</span>Join
                            the Attack for backs, Cover the Center for defensive
                            midfielders, Stay in Front for attacking
                            midfielders, Stay in Front for striker
                        </span>
                    </p>
                    <p>
                        <strong>4-1-2-1-2 Formation</strong>
                    </p>
                    <p>
                        <span>Defensive Style: Balanced </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            35, Depth: 55{" "}
                        </span>

                        <span>Offensive Tactics: Balanced, Push Forward </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            40, In the Box: 7/10, Corners: 2/5, Free Kicks: 2/5{" "}
                        </span>

                        <span>Instructions: </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>LB and
                            RB: Stay behind when attacking{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>CDM:
                            Close the center, Stay behind when attacking{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>CM:
                            Close the canopies in the penalty area, Get ahead of
                            yourself{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>CAM:
                            Getting ahead of yourself{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>ST:
                            Stay ahead, Get back on the defensive
                        </span>
                    </p>
                    <p>
                        <strong>3-4-2-1 Formation</strong>
                    </p>
                    <p>
                        In this tactic, it is important to keep the left and
                        right midfielders on the defensive, otherwise the enemy
                        will be able to easily catch your team on the
                        counterattacks.
                    </p>
                    <p>
                        <span>Defensive Style: Balanced </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            35, Depth: 55{" "}
                        </span>

                        <span>Offensive Tactics: Balanced, Direct Passes </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            50, In the Box: 6/10, Players in Box: 6, Corners:
                            3/5, Free Kicks: 2/5
                        </span>

                        <span>Instructions: </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>LM and
                            RM: Return to the defense, Play on the flank, Wait
                            for the canopy at the borders of the penalty area{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>both
                            CM: Close the center, Stay behind when attacking,
                            Wait for the canopy at the borders of the penalty
                            area{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>ST,
                            both FWD: Run ahead, Run behind the defenders, Stay
                            ahead
                        </span>
                    </p>
                    <p>
                        <strong>5-4-1 Formation</strong>
                    </p>
                    <p>
                        This tactic is a good option for high-level matches and
                        is not very suitable for those players who like to play
                        through the middle of the field. The task in attack is
                        to use extreme midfielders and extreme defenders to run
                        along the flanks and create dangerous moments in the
                        penalty area with the help of canopies.
                    </p>
                    <p>
                        <span>Defensive Style: Balanced </span>

                        <span>
                            {" "}
                            <span className={`${styles.marker}`}>•</span>Width:
                            35, Depth: 50{" "}
                        </span>

                        <span>
                            Offensive Tactics: Long Ball, Direct Passes{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>Width:
                            50, In the Box: 8/10, Corners: 3/5, Free Kicks: 2/5{" "}
                        </span>

                        <span>Instructions: </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>LWB and
                            RWB: Join the Attack, Running{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>CM 1:
                            Close the center, Stay behind when attacking
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>CM 2:
                            Close the center, Balanced attack{" "}
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>LM and
                            RM: Return to the defense, Wait for the canopy at
                            the edge of the penalty area
                        </span>

                        <span>
                            <span className={`${styles.marker}`}>•</span>ST:
                            Stay in the center, Run behind the defenders, Stay
                            in front
                        </span>
                    </p>
                    <p>
                        Remember, these are just suggestions, and future game
                        updates may impact the tactics' effectiveness.
                        Adjustments can be made based on personal playstyle.
                    </p>
                </div>
                <div className={`${styles.sticky_block}`}>
                    <StickyCoupon />
                </div>
            </div>
            <ReviewsGallery reviews={reviews} />
        </div>
    );
};

export default GuideContent;
