/**
 * ESLint Configuration
 */
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
    },
  },
  extends: [
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:prettier/recommended',
    'prettier/react',
  ],
  plugins: ['import'],
  rules: {
    // Separate import groups with newline by section
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        'newlines-between': 'always',
      },
    ],
    'no-console': 1, // Warning to reduce console logs used throughout app
    'react/prop-types': 0, // Not using prop-types because we have TypeScript
    'newline-before-return': 1,
    'no-useless-return': 1,
    'prefer-const': 1,
    'no-useless-return': 1,
    'no-unused-vars': 0,
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
