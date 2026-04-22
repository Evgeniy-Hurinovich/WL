# Project index

## Purpose

`westline-audit-defense` is a one-screen presentation app built on Next.js App Router.
Primary goal: present AS-IS audit results through horizontal scenes with drilldown details.

## Top-level structure

- `app/` - Next.js routes, page shell, global styles
- `components/` - reusable UI blocks and scene interactions
- `lib/` - centralized content model
- `docs/` - project context and source indexing docs
- `public/` - static assets
- config files: `package.json`, `tsconfig.json`, `next.config.ts`

## App entry points

- `app/layout.tsx` - global app layout wrapper
- `app/page.tsx` - main route page
- `app/globals.css` - global styles and visual baseline
- `components/audit-defense-app.tsx` - main composition container for scenes

## UI component index

- `components/section-frame.tsx` - section/screen frame wrapper
- `components/rail-navigation.tsx` - rail navigation between scenes
- `components/detail-drawer.tsx` - drilldown drawer for detailed cards
- `components/cards.tsx` - cards used inside scenes and drawer

## Content and data model

- `lib/audit-content.ts` - single source of truth for narrative, cards, risks, and roadmap data

## Existing documentation

- `docs/project-context.md` - narrative and product positioning context
- `docs/source-index.md` - indexed source interview materials
- `README.md` - local run, build, and deployment notes

## Dev commands

- install: `npm install`
- run locally: `npm run dev`
- build: `npm run build`
- start prod build: `npm run start`
- lint: `npm run lint` (requires explicit ESLint setup in this project state)

