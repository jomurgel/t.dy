module.exports = {
  preset: 'jest-expo',
  moduleFileExtensions: [ 'js', 'jsx', 'json', 'ts', 'tsx' ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  testPathIgnorePatterns: [ '/node_modules/', '/android/', '/ios/' ],
  testMatch: [
    '**/*.test.ts?(x)',
  ],
  testEnvironment: 'node',
}
