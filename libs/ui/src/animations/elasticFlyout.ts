import {
    getRandomNumber,
    weightedRandom,
    calculateElasticPosition,
} from "@royalfut/utils";

const probabilities = [
    { number: 0, weight: 3 }, // probability 3/3
    { number: 1, weight: 1 }, // probability 1/3
    { number: 2, weight: 3 }, // probability 3/3
];

const sides = ["left", "center", "right"];

const elasticFlyoutWrapper = () => {
    let dotPosition = 0;
    const velocity = getRandomNumber(2, 2.5);
    const speed = getRandomNumber(0.008, 0.025);

    const randInt = weightedRandom(probabilities);
    const FRAME_PERIOD = 2300 * getRandomNumber(0.6, 1); // Time in milliseconds
    const randomScaleFactorial = getRandomNumber(0, 0.3); // Time in milliseconds
    const randomFactorial = getRandomNumber(0.02, 0.08); // 0.04
    const randomChangerFactorial = randomFactorial * 0.1; // 0.04
    let randomScale = getRandomNumber(0.5, 1);
    let opacity = getRandomNumber(0.6, 2);
    let nextStep: number;
    const side = sides[randInt]; // left, right, center

    return function elastic(el: HTMLElement, cb: () => void) {
        const startTime = performance.now(); // Record start time
        let inoutpos = 0;

        const topfactorial = 2.5;

        return function animate(time: number) {
            const elapsedTime = time - startTime; // Calculate elapsed time
            let elasticPosition = calculateElasticPosition(
                dotPosition,
                velocity
            );

            if (
                elapsedTime >= FRAME_PERIOD * 0.13 &&
                elapsedTime <= FRAME_PERIOD * 0.34
            ) {
                if (side === "right") {
                    inoutpos -= randomFactorial;
                } else if (side === "left") {
                    inoutpos += randomFactorial;
                }
            } else if (
                elapsedTime > FRAME_PERIOD * 0.34 &&
                elapsedTime <= FRAME_PERIOD * 0.78
            ) {
                if (side === "right") {
                    inoutpos += randomFactorial;
                } else if (side === "left") {
                    inoutpos -= randomFactorial;
                }
            } else if (
                elapsedTime > FRAME_PERIOD * 0.78 &&
                elapsedTime < FRAME_PERIOD
            ) {
                if (side === "right") {
                    inoutpos -= randomFactorial;
                } else if (side === "left") {
                    inoutpos += randomFactorial;
                }
            }

            if (elapsedTime > FRAME_PERIOD * 0.52) {
                if (randomScale > 0) {
                    randomScale -= randomChangerFactorial;
                }
                opacity -= speed;
                dotPosition -= speed;

                if (opacity > 1) opacity = 1;
            } else {
                dotPosition += speed;
            }
            elasticPosition -= randomScaleFactorial;

            if (elapsedTime >= FRAME_PERIOD) {
                randomScale = 0;
                opacity = 0;
            }

            //  --ratio-scale: ${dotValue};
            el.style.cssText = `
                --ratio-scale: ${elasticPosition <= 0 ? 0 : elasticPosition >= 2 ? 2 : elasticPosition};
                --ratio-offset-x: ${1 + inoutpos};
                --opacity: ${opacity};
                --ratio-offset-y: ${1.6 + (elapsedTime / 1000) * topfactorial};
            `;

            if (elapsedTime <= FRAME_PERIOD) {
                nextStep = requestAnimationFrame(time => animate(time));
            } else {
                cb && cb();
                cancelAnimationFrame(nextStep);
            }
        };
    };
};

export const runElasticFlyout = (el: HTMLElement, cb: () => void) => {
    const func = elasticFlyoutWrapper();
    func(el, cb)(0);
};
