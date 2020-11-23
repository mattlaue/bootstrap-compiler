module.exports = {
    plugins: ['jest'],
    env: {
        node: true,
        es6: true
    },
    extends: [ 'eslint:recommended', 'plugin:jest/recommended' ],
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module',
        allowImportExportEverywhere: true
    },
    rules: {
        indent: ['error', 4],
        quotes: ['error', 'single', { avoidEscape: true }],
        semi: ['error', 'always'],
        'linebreak-style': ['error', 'unix']
    }
};