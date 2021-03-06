# Scraty mobile

This is the [react-native](https://reactnative.dev) application for the open source
project [scraty](https://github.com/mikethebeer/scraty). The project is based on
[expo](https://expo.io).

## Project structure

Inside the components directory, there is a `features` and a `shared` directory. Each
main feature of the app should be located in the features directory. Components that
are shared over the main features should be located in the shared directory.

Components should follow the react recommended structure. This means each component
consists of a folder with the component name, an `index.ts` file to export the usable
component, the `MainFeature.tsx` component itself, and all the other files (styles,
tests, data fetchers) should be placed within the component folder.

```
src
├── features
│   └── MainFeature
│       ├── MainFeature.tsx
│       ├── index.ts
│       └── styles.ts
└── shared
    └── SharedComponent
        ├── SharedComponent.tsx
        ├── index.ts
        └── styles.ts
```

## App store advertiser

Connect and manage several existing Scraty-Boards in one place on your mobile device.
Granting an overview of all stories, their associated tasks and corresponding user.
Freely add, remove and edit stories and tasks on the selected board with a modern
responsive and swipeable interface.

### Features:

- Connect to existing Scraty-Boards
- Add stories and tasks
- Edit stories and tasks
- Remove stories and tasks

## Available commands

```bash
npm install # To install dependencies

npm start # To start the local development server

npm run [ios|android|web] # To run the app on specific platform

npm run lint # To lint the project
```
