module.exports = {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.jsx?$": "babel-jest",
    },
    transformIgnorePatterns: ["/node_modules/"],
    moduleNameMapper: {
        "\\.(css|less|scss)$": "<rootDir>/src/__mocks__/styleMock.js",
        "^@dash/(.*)$": "<rootDir>/src/$1",
    },
    testPathPattern: "src/.*\\.test\\.js$",
    // scripts/ holds node:test suites (scripts/release.test.js, DASH-48),
    // run by scripts/ci.sh with `node --test`, not jest.
    testPathIgnorePatterns: ["/node_modules/", "<rootDir>/scripts/"],
};
