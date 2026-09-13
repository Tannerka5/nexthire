# NextHire

NextHire helps college students track job and internship applications in one organized place — replacing the DIY spreadsheet. Log applications, track status, note references who work at the company, log follow-up attempts, and see exactly what needs attention next.

This is a frontend-only interactive prototype: no backend, no login, mock data held in memory for the session.

## Screens

- **Dashboard** (`/`) — the affordance screen. One headline states the product's value (confidence and control) before anything else, backed by an at-a-glance status overview.
- **Applications** (`/applications`) — every application grouped into columns by status (Applied → Phone Screen → Interview → Offer / Rejected), with source, reference, and next-step info per card. Status is changeable inline.
- **Priorities** (`/priorities`) — every open next step, grouped by urgency (Overdue / Due Soon / Upcoming), with a one-click way to mark a follow-up done.

## Stack

- Vite + React + TypeScript
- React Router (standard `BrowserRouter`, no hash routing)
- CSS Modules, no UI framework
- Mock data in `src/data/mockApplications.ts`, held in a React Context (`src/context/ApplicationsContext.tsx`) so status changes and completed follow-ups persist across screens for the session

## Development

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check and build for production
npm run preview  # preview the production build locally
```
