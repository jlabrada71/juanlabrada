module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/unit/**/?(*.)+(spec|test).+(ts|tsx|js)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
}
