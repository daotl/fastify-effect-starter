const fs = require('fs')
module.exports = (dirName, forceTS = false, _project = undefined) => {
  const enableTS = !!dirName && (forceTS || process.env.ESLINT_TS)
  return {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    parserOptions: {
      // https://github.com/typescript-eslint/typescript-eslint/issues/2094
      EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true, // !process.env["TEST_USE_FULL_DIST"] && !process.env["TEST_USE_DIST"],
      enableTS,
      parser: '@typescript-eslint/parser',
      ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
      sourceType: 'module', // Allows for the use of imports
      ...(enableTS
        ? {
            tsconfigRootDir: dirName,
            project: [
              `${dirName}./tsconfig.json`,
              `${dirName}./tsconfig.src.json`,
              `${dirName}./tsconfig.test.json`,
            ].filter(fs.existsSync),
          }
        : undefined),
    },
    plugins: ['@typescript-eslint', 'codegen'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '.',
              message:
                'Please import from the specific file instead. Imports from index in the same directory are almost always wrong (circular).',
            },
            {
              name: './',
              message:
                'Please import from the specific file instead. Imports from index in the same directory are almost always wrong (circular).',
            },
            {
              name: './index',
              message:
                'Please import from the specific file instead. Imports from index in the same directory are almost always wrong (circular).',
            },
          ],
        },
      ],
    },
  }
}
