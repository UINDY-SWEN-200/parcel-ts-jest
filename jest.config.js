module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	testMatch: ["**/*.steps.ts","**/*.spec.ts"],
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	testEnvironment: 'jsdom'
};
