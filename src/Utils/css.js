/**
 * Utils/css.js
 *
 * Utility functions for handling CSS generation
 */

/**
 * tailwindHeightFractions
 * Generate the height variants in fractions for tailwind
 * @returns
 */
const tailwindHeightFractions = () => {
    const numerators = [1, 2, 3, 4, 5, 6];
    const denominators = [2, 3, 4, 5, 6];

    let fractions = [];
    denominators.forEach((denominator) => {
        numerators.forEach((numerator) => {
            if (numerator < denominator) {
                fractions.push({
                    fraction: `${numerator}/${denominator}`,
                    name: `height-${numerator}-${denominator}`,
                    value: `h-${numerator}/${denominator}`,
                });
            }
        });
    });

    return fractions;
};

export { tailwindHeightFractions };
