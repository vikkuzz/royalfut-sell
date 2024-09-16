interface INumberWeight {
    number: number;
    weight: number;
}

export function weightedRandom(args: Array<INumberWeight>): number {
    // Calculate total weight
    const totalWeight = args.reduce((acc, { weight }) => acc + weight, 0);

    // Generate a random number within the range of total weight
    const randomValue = Math.random() * totalWeight;

    // Iterate through the arguments and select a number based on its weight
    let cumulativeWeight = 0;
    for (const { number, weight } of args) {
        cumulativeWeight += weight;
        if (randomValue <= cumulativeWeight) {
            return number;
        }
    }

    // This line should never be reached, but TypeScript needs a return statement
    return -1;
}

export function getRandomNumber(min: number, max: number) {
    return Math.random() * (max - min) + min;
}

export function getRandomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateUniqueId() {
    return Math.random().toString(36).substring(2, 5);
}
