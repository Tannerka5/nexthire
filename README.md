# NextHire

NextHire is a web app that helps college students track job and internship applications in one organized place — replacing the DIY spreadsheet. It lets students log applications, track status, note references who work at the company, log follow-up attempts, and record how they discovered the job. The core payoff is knowing exactly what needs attention next, so mental energy goes toward applying and networking, not spreadsheet upkeep.

This is a frontend-only interactive prototype: no backend, no login, mock data held in memory for the session.

## Need, Persona, Capability, Value

**Need**
College students juggling many job/internship applications lose track of where they stand and fall back on a DIY spreadsheet that becomes its own source of stress and abandonment.

**Persona**
A student in high-volume application mode (20–50+ applications), tracking things solo in scattered moments — evenings, between classes, on their phone.

**Capability**
Log a job application and track its current status.

**Fundamental Value** (lead with this)
Confidence — trusting nothing is falling through the cracks, so time and mental energy go toward applying and networking, not spreadsheet maintenance.

## The Three Screens

Status categories used throughout: Applied → Phone Screen → Interview → Offer / Rejected.

| Screen | Route | Its one job | Why it earned a slot | Design question it answers |
|---|---|---|---|---|
| **Dashboard** (landing) | `/` | Signal confidence/control and the tracking capability at a glance, backed by an at-a-glance status overview. | The first impression has to say "you're on top of this" — not a login screen or a marketing pitch. | Does the landing screen communicate confidence/control before the user reads anything closely? |
| **Application List/Board** | `/applications` | Show every application and its status at once, grouped into columns, with source, reference, and next-step per card; status changeable inline. | Proves the breadth half of the value — nothing falls through the cracks — by making the whole pipeline visible in one view. | Do the visual groupings (by status) let someone read progress without needing the columns explained? |
| **Prioritized Action List** | `/priorities` | Surface what needs attention next — follow-ups due, next steps — grouped by urgency (Overdue / Due Soon / Upcoming), one-click to mark done. | Proves the payoff directly: focus goes toward what matters, not busywork of re-scanning the whole list. | Does the priority ordering feel obviously actionable — would a user know what to click first? |

## Feedback Question Plan

*(Written as I'd actually say them to a student persona, with a prediction and what it rests on.)*

**Need**
> "Tell me about the last time you were applying to jobs or internships — how did you keep track of where each one stood?"
Prediction: most will mention starting a spreadsheet and then admit they stopped updating it after a few weeks — supporting the "becomes its own source of stress and abandonment" part of the Need. If people say they kept the spreadsheet current the whole time, the abandonment half of the Need claim weakens even if the tracking-workaround half holds.

**Value**
> "If you always knew exactly where every application stood and what to do next, without a spreadsheet, what's one word for how that would feel?"
Prediction: answers cluster around "relieved," "in control," or "less stressed" — supporting "confidence and control" as the intended value. This rests on the Dashboard headline and status overview reading as reassurance rather than as just another to-do list.

**Persona**
> "How many places are you applying to right now, and what's it like keeping them all straight?"
Prediction: given the persona targets high-volume applicants, most will report 20+ applications and describe tracking them in scattered moments (phone, between classes, at night) rather than one sit-down session. If most people report just a handful of applications tracked in one sitting, the "high-volume, scattered moments" persona needs narrowing.

**Capability**
> "I'm going to show you the Applications screen for five seconds, then hide it. What did this screen let you do?"
Prediction: most will say something general like "track applications" rather than the more precise "see what stage each one is at and what's due" — meaning the stage columns and next-step text may need a stronger visual cue to register in five seconds. This rests on how legible the status labels are at a glance.

## Design Justification and First Read

**Does the landing screen signal the primary capability and value at first glance, before reading closely?**
Yes — the headline communicates confidence/control before anything else needs to be read.

**Does every element on the landing screen earn its place, or does anything compete with the primary job?**
Not entirely. The status/progress overview was meant to reinforce the headline, but on a first look it competes with it instead: the headline delivers the value in a sentence, while the status overview asks the visitor to interpret application data to arrive at the same feeling. For a brand-new visitor with no applications logged yet, that overview has nothing to show and becomes dead weight rather than support. The landing screen would likely signal faster with no application-specific data on it at all — just the value statement and the primary capability — leaving all the progress/status detail to the Application List/Board screen where it belongs.

**What information and actions belong together on each screen, and which Gestalt principle communicates that?**
On Applications, cards are grouped into status columns — this is **proximity** (and **common region**, since each column functions as its own container) doing the work of saying "these cards are in the same pipeline stage." On Priorities, cards are grouped by urgency band (Overdue/Due Soon/Upcoming) instead of by status — same data, different grouping principle, answering a different question ("what's late" instead of "what stage is it in").

**Do screens 2 and 3 stay on mission, and can you return to the landing screen from everywhere?**
Confirmed — the navigation bar lives in the shared layout that wraps all three routes, so it renders identically on Dashboard, Applications, and Priorities, at both desktop and mobile widths. The Dashboard is always one click away from either screen.

**What did the AI initially get wrong, skip, or oversimplify, and what did you change?**
The AI's first pass on the Applications and Priorities screens packed elements close together with minimal spacing, and the cards on the Applications board weren't clearly separated into their status groups — everything read as one dense block rather than a pipeline. I increased the whitespace both between individual cards and around each status column, and made the cards within a column visually consistent. That's two Gestalt principles doing the work: **proximity** — more space between columns and less space within a column signals which cards belong together — and **similarity** — consistent card formatting signals "these are all the same kind of object, just at different stages." That directly served the value: the brief calls for a "calm, organized... non-cluttered" feel, and a crowded, ungrouped screen undercut "confidence" before the user read a single word.

**Which design question or grouping/signaling decision motivated each important change?**
The Applications/Priorities spacing and card-organization change was motivated by the design question for the Application List/Board: "Do the visual groupings (by status) let someone read progress without needing the columns explained?" The first pass answered "no" — with everything crowded together, status groups didn't read as groups. Adding proximity (space) and similarity (consistent card formatting) made the answer "yes."

## Before / After Example

**Before:** [`af37a22` — Initial NextHire prototype](https://github.com/Tannerka5/nexthire/commit/af37a22c44b0e1334b9ec7175c095bbafe2f4cdc) — cards on the Applications and Priorities screens sat close together with minimal spacing, and the status columns weren't visually distinct from one another.

**After:** [`9d670c0` — Make dashboard story-driven and ease density on board/priorities](https://github.com/Tannerka5/nexthire/commit/9d670c0cc2af7bc09689322f6116d955f0816aff) — added spacing between status columns and around individual cards, and made card formatting consistent within each column.

The first pass didn't separate the pipeline into groups a user could read at a glance; the fix used proximity (more space between columns, less within one) and similarity (consistent card formatting) so the status groupings become legible without an explanation.

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
