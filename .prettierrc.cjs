/** @type {import('prettier').Config} */
module.exports = {
	semi: false,
	tabWidth: 2,
	useTabs: true,
	printWidth: 120,
	endOfLine: 'auto',
	singleQuote: true,
	proseWrap: 'never',
	jsxSingleQuote: true,
	arrowParens: 'avoid',
	singleAttributePerLine: true,
	plugins: [require.resolve('prettier-plugin-solidity')],
	overrides: [
		{
			files: '*.sol',
			options: {
				printWidth: 80,
				useTabs: false,
				tabWidth: 4,
			},
		},
	],
}
