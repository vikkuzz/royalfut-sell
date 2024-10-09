/**
 * Calculate the elastic position based on the dot value and velocity.
 * @param dotPosition - The dot position used in the calculation.
 * @param velocity - The velocity used in the calculation.
 * @returns The calculated elastic position.
 */
export function calculateElasticPosition(
    dotPosition: number,
    velocity: number
): number {
    /**
     * Calculates the elastic position using the given dot position and velocity.
     * @param dotPosition - The dot position used in the calculation.
     * @param velocity - The velocity used in the calculation.
     * @returns The calculated elastic position.
     */
    return (
        Math.pow(2, -10 * dotPosition) *
            Math.sin((dotPosition * 10 - 0.75) * velocity) +
        1
    );
}
