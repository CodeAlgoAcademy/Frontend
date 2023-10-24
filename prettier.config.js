module.exports = {
  trailingComma: 'all',
  printWidth: 150,
  tabWidth: 3,
  ignore: ['node_modules/**', 'dist/**', '.next/**', '.swc/**'],
  plugins: [require('prettier-plugin-tailwindcss')],
};
