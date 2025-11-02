## Technologies Used

- React
- TypeScript
- MUI
- Zustand
- React Hook Form
- date-fns (for dates)
- Vite
- PNPM
- Jest
- RTL

## Setup

If you do not have `pnpm` installed first run

```bash
npm install -g pnpm
```

### Install dependencies

```bash
pnpm install
```

### Start the development server

after you can start the development server

```bash
pnpm dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Technology Choices Explanation

MUI – A ready-to-use UI component library that helps save development time.

Zustand – A lightweight state manager with built-in persistence; Redux would be overkill for a project of this size.

React Hook Form – A popular React library that's also highly optimized.

date-fns – My personal choice; a lighter library could have been used for this particular project.

## Architecture

This project follows a modular architecture. I guess it's a perfect solution for projects of this size.

### Structure

App -> modules-> components -> shared

In case of need for more than one page I would add _pages_ folder

## Decisions

### Zustand Store — `tasksStore.ts`

tasksStore.ts serves as the single entry point for the task store.

It re-exports:

- all related types (e.g. Task, TaskStatus);

- custom atomic hooks such as useGetTaskById, etc.

These hooks are implemented to avoid unnecessary re-renders, following a pattern similar to createSelector in Redux.

### tasks-module

The `tasks-module` only exports components that are intended to be used higher in the hierarchy, such as in App.

External layers (e.g. pages, layouts) interact only with the module’s UI components and are unaware of its internal logic or state management.

This ensures encapsulation of business logic and improves the scalability and maintainability of the application.
