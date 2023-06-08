/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		warnOnUnsupportedTypeScriptVersion: true,
	},
	env: { node: true, browser: true },
	reportUnusedDisableDirectives: true,
	extends: ['eslint:recommended', 'plugin:unicorn/all', 'plugin:@typescript-eslint/recommended', 'prettier'],
	plugins: ['@typescript-eslint', 'prettier'],
	settings: {},
	overrides: [],
	rules: {
		'unicorn/no-unused-properties': ['off'],
		'prettier/prettier': [
			'warn',
			{},
			{
				usePrettierrc: true,
				fileInfoOptions: {
					withNodeModules: true,
				},
			},
		],
		'unicorn/prefer-top-level-await': ['off'],
		'array-element-newline': ['error', 'consistent'],
		'object-curly-spacing': ['error', 'always'],
		'@typescript-eslint/no-unused-vars': ['off'],
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				prefer: 'type-imports',
				fixStyle: 'inline-type-imports',
			},
		],

		'unicorn/filename-case': ['off'],
		'unicorn/prefer-event-target': ['off'],
		'unicorn/prevent-abbreviations': [
			'error',
			{
				allowList: {
					ProcessEnv: true,
				},
				checkFilenames: false,
			},
		],
		'no-mixed-operators': ['off'],
		'no-multiple-empty-lines': ['off'],
		'no-unexpected-multiline': ['off'],
		'@typescript-eslint/ban-ts-comment': ['off'],
		'@typescript-eslint/no-empty-interface': [
			'error',
			{
				allowSingleExtends: false,
			},
		],
		'@typescript-eslint/ban-types': [
			'warn',
			{
				types: {
					String: {
						message: 'Use string instead',
						fixWith: 'string',
					},

					'{}': {
						message: 'Use object instead',
						fixWith: 'object',
					},
				},
			},
		],
	},
}
