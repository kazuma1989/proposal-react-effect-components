module.exports = {
  testMatch: [
    '<rootDir>/examples/**/*.test.{ts,tsx}',
    '<rootDir>/examples/**/test.{ts,tsx}',
    '<rootDir>/examples/**/__tests__/**/*.{ts,tsx}',
  ],

  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
