module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transform: {
    '^.+\\.tsx?$': [ 'ts-jest', {
      jsx: 'react',
      module: 'commonjs',
      target: 'es6',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      types: [ 'jest', 'node' ],
    } ],
  },
  testPathIgnorePatterns: [ '/node_modules/', '/android/', '/ios/' ],
  testEnvironment: 'node',
}
