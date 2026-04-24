# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `pnpm dev`
- **Build:** `pnpm build` (runs type-check + vite build in parallel)
- **Lint:** `pnpm lint` (ESLint with auto-fix and caching)
- **Format:** `pnpm format` (Prettier on src/)
- **Type-check only:** `pnpm type-check` (vue-tsc)
- **Run all tests:** `pnpm test:unit`
- **Run a single test:** `pnpm test:unit src/components/__tests__/HelloWorld.spec.ts`

## Architecture

Vue 3 + TypeScript app using Vite 7 for bundling. Package manager is **pnpm**.

- **State management:** Pinia 3 with composition API style stores (`defineStore` with setup function)
- **Routing:** Vue Router 4 with HTML5 history mode; lazy-loaded route chunks for non-home views
- **Path alias:** `@` maps to `src/`
- **Testing:** Vitest with jsdom environment, `@vue/test-utils` for component mounting. Tests live in `__tests__/` directories next to their components.
- **Linting:** ESLint flat config (`eslint.config.ts`) with `eslint-plugin-vue` (essential rules), `@vue/eslint-config-typescript` (recommended), and Prettier integration via skip-formatting config
