export default [
    {
        ignores: [
            'node_modules/',
            '.next/',
            'out/',
            'public/',
            'dist/',
            'build/',
            '.git/'
        ]
    },
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2024,
            sourceType: 'module',
            parserOptions: {
                ecmaFeatures: {
                    jsx: true
                }
            },
            globals: {
                React: 'readonly',
                JSX: 'readonly',
                global: 'readonly',
                console: 'readonly',
                process: 'readonly'
            }
        },
        rules: {
            'no-unused-vars': [
                'warn',
                {
                    varsIgnorePattern: '^_|^[A-Z]',
                    argsIgnorePattern: '^_|^[A-Z]',
                    caughtErrorsIgnorePattern: '^_'
                }
            ],
            'no-console': ['warn', { allow: ['warn', 'error'] }],
            'no-duplicate-imports': 'error',
            'no-self-assign': 'error'
        }
    }
]
