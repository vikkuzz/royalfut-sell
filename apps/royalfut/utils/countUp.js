export default class CountUp {
    constructor(el) {
        this.el = el;
        this.setVars();
        this.init();
    }

    setVars() {
        this.number = this.el.querySelectorAll("[data-countup-number]");
    }

    init() {
        if (this.number.length > 0) {
            this.number.forEach(el => {
                const end = parseFloat(
                    el.dataset.countupNumber.replace(/,/g, "")
                );
                const decimals = this.countDecimals(end);
                this.iterateValue(el, end, decimals);
            });
        }
    }

    iterateValue(el, end, decimals) {
        const start = 0;
        const duration = 2500;
        let startTimestamp = null;

        const step = timestamp => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsedPercent = (timestamp - startTimestamp) / duration;
            const easedProgress = Math.min(
                this.easeOutQuint(elapsedPercent),
                1
            );
            const interimNumber = Math.abs(
                easedProgress * (end - start) + start
            );
            el.innerHTML = this.formatNumber(interimNumber, decimals);
            if (easedProgress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }

    easeOutQuad(x) {
        return 1 - Math.pow(1 - x, 3);
    }

    easeOutQuint(x) {
        return 1 - Math.pow(1 - x, 5);
    }

    countDecimals(val) {
        if (Math.floor(val) === val) return 0;
        return val.toString().split(".")[1].length || 0;
    }

    formatNumber(val, decimals) {
        return val.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    }
}
