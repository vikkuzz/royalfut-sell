export function calculatePercentage(value: number, maxValue: number): number {
    if (maxValue === 0) return 0;
    const percent = (value / maxValue) * 100;
    return Math.min(Math.max(percent, 0), 100);
}
