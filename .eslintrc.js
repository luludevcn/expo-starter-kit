module.exports = {
    root: true,
    extends: ['expo'],
    plugins: ['@typescript-eslint'],
    rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'react-hooks/exhaustive-deps': 'warn',
    },
};
