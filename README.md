# Vistegra Test Frontend application

This application is React project.

### Hierarchy

- `README.md` - project description
- `.git` - git repository
- `package.json` - the main project configuration with all dependencies, scripts and pathes
- `yarn.lock` - automatically generated file by yarn package manager
- `tsconfig.json` - file with typescrypt configuration
- `src` - directory with all project files
  - `src/navigation` - directory with navigation component. `in this project it doesn't need`
  - `src/pages` - directory with all pages. `in this project it doesn't need`
  - `src/UI` - directory with all custom UI components
  - `src/widgets` - directory with separated entityies (modules)
    - `${Entity}` - for example `User`
      - `components` - directory with all components
      - `service.ts` - file with all interactions with backend (for this entity)
      - `state.ts` - file with state for this entity
      - `types.ts` - file with types for this entity
      - `index.ts` - file for connect all in this entity
  - `src/shared` - directory with all other services, types, hooks, states and etc.
  - `src/store.js` - the main Redux (store) file
  - `src/index.js` - the main file

### How do I get set up it locally in DEV mode?

- Install the last versions of `node` and `yarn` to your OS
- Install all dependencies via `yarn`
- Run the project via `yarn start`
