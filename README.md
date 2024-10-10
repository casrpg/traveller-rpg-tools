# Traveller RPG utils
This is a work in progress project to create a set of tools to help with the Traveller RPG.

## Install
Run `npm install`


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
