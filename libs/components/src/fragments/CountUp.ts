class CountUp {
    private countupElements: NodeListOf<HTMLElement> | null = null;
    private intersectionObserver!: IntersectionObserver;
    private observerOptions: IntersectionObserverInit = {
        root: null,
        rootMargin: "0px 0px",
        threshold: 0.3,
    };
    private animatedElements: Set<HTMLElement>;

    constructor(private containerElement: HTMLElement) {
        this.animatedElements = new Set();
        this.setVariables();
        this.initializeObserver();
    }

    private setVariables(): void {
        this.countupElements =
            this.containerElement.querySelectorAll<HTMLElement>(
                "[data-countup-number]"
            );
        this.intersectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                const targetElement = entry.target as HTMLElement;
                if (
                    entry.isIntersecting &&
                    !this.animatedElements.has(targetElement)
                ) {
                    const targetNumber = parseFloat(
                        targetElement.dataset.countupNumber?.replace(
                            /,/g,
                            ""
                        ) || "0"
                    );
                    const decimalPlaces = this.getDecimalPlaces(targetNumber);
                    this.animateValue(
                        targetElement,
                        targetNumber,
                        decimalPlaces
                    );
                    this.animatedElements.add(targetElement);
                }
            });
        }, this.observerOptions);
    }

    private initializeObserver(): void {
        if (this.countupElements && this.countupElements.length > 0) {
            this.countupElements.forEach(element => {
                this.intersectionObserver.observe(element);
            });
        }
    }

    private animateValue(
        element: HTMLElement,
        endValue: number,
        decimalPlaces: number
    ): void {
        const startValue = 0;
        const animationDuration = 1000;
        let startTime: number | null = null;

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / animationDuration;
            const easedProgress = Math.min(this.easeOutQuint(progress), 1);
            const currentValue = Math.abs(
                easedProgress * (endValue - startValue) + startValue
            );
            element.innerHTML = this.formatNumber(currentValue, decimalPlaces);
            if (easedProgress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    private easeOutQuint(progress: number): number {
        return 1 - Math.pow(1 - progress, 5);
    }

    private getDecimalPlaces(value: number): number {
        if (Math.floor(value) === value) return 0;
        return value.toString().split(".")[1]?.length || 0;
    }

    private formatNumber(value: number, decimalPlaces: number): string {
        return value.toLocaleString("en-US", {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
        });
    }
}

export default CountUp;
