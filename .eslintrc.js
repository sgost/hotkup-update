module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [2, 'always'],
    'no-unused-vars': 'off',
    'no-useless-escape': 'off',
    'brace-style': 'off',
    'no-unreachable': 'off',
    camelcase: 'off',
    'no-undef': 'off',
    eqeqeq: 'off',
    'prefer-promise-reject-errors': 'off',
    'vue/return-in-computed-property': 'off',
    'vue/valid-v-on': 'off',
    'vue/require-v-for-key': 'off',
    'no-tabs': 'off',
    'no-self-assign': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-mutating-props': 'off',
    'no-prototype-builtins': 'off',
    'no-constant-condition': 'off',
    'vue/no-unused-vars': 'off',
    'no-lone-blocks': 'off',
    'vue/no-mutating-props': 'off',
    'vue/valid-v-for': 'off',
    'no-unexpected-multiline': 'off',
    'no-extend-native': 'off',
    'no-multiple-empty-lines': 'off',
    'no-trailing-spaces': 'off',
    indent: 'off',
    quotes: 'off',
    'padded-blocks': 'off',
    'dot-notation': 'off',
    'space-before-function-paren': 'off'

  }
};
