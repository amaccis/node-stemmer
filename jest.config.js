/** @type {import('jest').Config} */
export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "^(..?/.+).js?$": "$1"
  },
  transformIgnorePatterns: ['node_modules'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      useESM: true
    }]
  }
};