module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-key': ['error'],
    'react/jsx-max-props-per-line': [1, { maximum: 1, when: 'always' }],
    'react/jsx-no-bind': ['error', { ignoreDOMComponents: true }],
    'react/default-props-match-prop-types': 'off',
    'implicit-arrow-linebreak': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'max-len': 'off',
    'no-plusplus': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'all', argsIgnorePattern: '^_' }],
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'react/jsx-filename-extension': 'off',
      },
    },
    {
      files: ['private/jest/*.js'],
      env: { jest: true },
    },
    {
      files: ['src/**/*.test.tsx', 'src/**/*.test.ts'],
      rules: {
        'global-require': 'off',
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};
