const { getJestConfig } = require("@storybook/test-runner");

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
module.exports = {
    // The default configuration from @storybook/test-runner
    ...getJestConfig(),

    /** Add your custom config overrides here
     * Learn more about Jest config at: https://jestjs.io/docs/configuration
     */
    testEnvironmentOptions: {
        "jest-playwright": {
            browsers: ["chromium"],
            launchOptions: {
                headless: true,
            },
            contextOptions: {
                viewport: {
                    width: 1280,
                    height: 720,
                },
                ignoreHTTPSErrors: true,
            },
        },
    },
};
