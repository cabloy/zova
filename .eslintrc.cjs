module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['./packages-egg-born/egg-born-lint-config/api/eslint.js', 'prettier'],
};
