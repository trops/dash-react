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
};
