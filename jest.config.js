/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    "@src/(.*)": "<rootDir>/src/$1",
    "^(..?/.+).js?$": "$1"
  },
  transformIgnorePatterns: ['node_modules'],
  globals: { 
    'ts-jest': { 
      useESM: true 
    } 
  }
};