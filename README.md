# Traveller RPG utils
This is a work in progress project to create a set of tools to help with the Traveller RPG.

## Install
Run `npm install`

## Start the app
This app has a lambda function backend and a vite frontend. To start the whole app run `npm start`.

## To test the app
Run `npm run test:e2e`

## Linter
This project uses eslint to lint the code. To run the linter run `npm run lint`. To fix the linting errors run `npm run lint:fix`.

## Troubleshooting

### Vscode fails to run the linter
Put this into the `.vscode/settings.json` file:
```json
{
  "eslint.workingDirectories": [
    "app",
    "functions",
  ]
}
```

## LCARS template
 
 Look and feel took from LCARS Inspired Website Template by www.TheLCARS.com and modified.
