module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.tsx?$': ['babel-jest'],
  },
  testPathIgnorePatterns: [ '/node_modules/', '/android/', '/ios/' ],
  testEnvironment: 'jsdom',
  moduleFileExtensions: [ 'js', 'jsx', 'ts', 'tsx' ],
}
