module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      'files': ['**/*.spec.ts', '**/*.test.ts'],
      'parserOptions': {
        'project': './functions/tsconfig.tests.json'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./functions/tsconfig.json', './functions/tsconfig.tests.json']
  },
  ignorePatterns: ['node_modules'],
  rules: {
  }
}
