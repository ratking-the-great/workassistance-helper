# WorkassistanceHelper

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Deploy to GitHub Pages

This repo contains a GitHub Actions workflow to automatically build and deploy the app to GitHub Pages on push to `main`.

Manual steps (optionally):

1) Build for GitHub Pages (replace `REPO_NAME` with your repository name):

```bash
ng build --configuration production --base-href /REPO_NAME/
```

2) Deploy using `angular-cli-ghpages` (npx):

```bash
npx angular-cli-ghpages --dir=dist/Workassistance-Helper
```

3) (Convenience) Use the provided npm scripts:

```bash
npm run build:ghpages  # builds using package name placeholder for base-href
npm run deploy:ghpages  # deploys using angular-cli-ghpages
```

Notes:
- The GitHub Action sets an appropriate `base-href` automatically:
	- `/${{ github.event.repository.name }}/` for project pages
	- `/` for `username.github.io` user pages
- Ensure your repo name is correct for project pages (e.g., if repo is `user/repo`, project pages will be at `https://user.github.io/repo/`).

Troubleshooting GitHub Pages 404s
- If you see a 404 page from GitHub Pages, verify the following:
	1) The GitHub Actions workflow completed successfully and deployed to the `gh-pages` branch (check Actions tab & Branches).
	2) The `gh-pages` branch contains the `index.html` file at the repo root.
	3) Pages is configured for `gh-pages` (or `main`) branch in GitHub repository Settings → Pages.
	4) If you host at `username.github.io`, make sure base-href was `/` and not `/${repo}/`.
	5) If you host at `https://user.github.io/repo/`, make sure base-href is `/${repo}/`.
	6) After deployment, give GitHub a minute to publish; if still 404, click "Pages" in repo settings and re-save the settings.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
