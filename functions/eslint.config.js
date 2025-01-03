/* eslint @typescript-eslint/no-unsafe-member-access: "off" */
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import love from 'eslint-config-love'

export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ...love,
    files: ['**/*.js', '**/*.ts'],
  },
  {rules: {
    '@typescript-eslint/init-declarations': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // Temporary disabled until fixing the pipeline
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-import-type-side-effects': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/prefer-destructuring': 'off',
  }},
  {ignores: ['**/npc-gen-client']}
];
