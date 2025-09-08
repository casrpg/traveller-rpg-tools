# Traveller RPG utils

This is a work in progress project to create a set of tools to help with the Traveller RPG.

## Install

Run `npm install`

## Configuration

### Analytics

This site includes Counterscale.dev analytics integration. To set up analytics:

1. Deploy your own Counterscale instance following the [Counterscale installation guide](https://github.com/benvinegar/counterscale#installation)
2. Configure analytics using environment variables in your Netlify deployment settings:
   - `VITE_COUNTERSCALE_URL`: Your Counterscale deployment URL (e.g., `https://your-counterscale-instance.com/tracker.js`)
   - `VITE_COUNTERSCALE_SITE_ID`: Your site identifier (defaults to `traveller-rpg-api` if not set)

The analytics will be automatically disabled in development mode and when the URL contains `example.com` or is not set.

**Setting up environment variables in Netlify:**

1. Go to your Netlify site dashboard
2. Navigate to Site settings → Environment variables
3. Add the following variables:
   - `VITE_COUNTERSCALE_URL` = `https://your-counterscale-instance.com/tracker.js`
   - `VITE_COUNTERSCALE_SITE_ID` = `your-site-identifier` (optional, defaults to `traveller-rpg-api`)

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
  "eslint.workingDirectories": ["app", "functions"]
}
```

## LCARS template

Look and feel took from LCARS Inspired Website Template by www.TheLCARS.com and modified.
