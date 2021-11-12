module.exports = {
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/src/**'],
    testTimeout: 30000,
    projects: [
        {
            testEnvironment: 'node',
            testMatch: ['<rootDir>/test/spec/compiler/*.spec.js'],
        },
        {
            testEnvironment: 'jsdom',
            testMatch: ['<rootDir>/test/spec/runtime/**/*.spec.js'],
            setupFilesAfterEnv: [
                '<rootDir>/test/helpers/wait-for-update.js',
            ],
        },
    ],
};
