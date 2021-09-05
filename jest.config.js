module.exports = {
	testEnvironment: 'node',
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	moduleFileExtensions: ['ts', 'js', 'json', 'node'],
	testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(ts|js)x?$',
	coverageDirectory: 'coverage',
	collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'],
	setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
	testEnvironment: 'jsdom'
};
