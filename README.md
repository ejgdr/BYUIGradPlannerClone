# BYU-Idaho Grad Planner — Clone

A functional clone of [BYU-Idaho's Grad Planner](https://iplan.byui.edu/grad_planner), built for the Week 8 Greenfield Interview assignment.

Built with the **lightest possible stack**: plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step, no server, no dependencies. It runs by opening a single file and deploys for free on GitHub Pages.

## Features

- **Header stats bar** - live Registered (Completed) / Planned / Total credit counts that update as you edit the plan.
- **Color-coded cards** - **blue = already registered** (courses the student has taken) and **green = planned**. Double-click any card to toggle it between the two.
- **My Plan** - collapsible calendar years; the current year expands into Winter / Spring / Fall semester columns with per-semester credit totals and on-track / flex-track labels.
- **Drag and drop** - drag course cards between semesters. Newly added courses come in **green (planned)**. Dropping a course into a term where it isn't offered is rejected with a warning.
- **No double counting** - adding a course that is already in the plan is blocked with a warning (the program rule "No double counting of courses").
- **Requirements & Courses** - General Ed / Degree / Electives tabs, each with sub-requirements, progress bars (registered vs. planned vs. unplanned), and course lists. Use the **+** button to add a course, or drag a requirement course straight onto the plan.
- **See Details page** - the top-right "SEE DETAILS" button opens an overview: My Info (major/certificate), My Progress cards, University Requirements circles (total / residency / upper-division credits), a GPA bar, a Plan Requirement Summary, and the projected graduation term - all computed live from the plan.
- **My Plans page** - the top-left "MY PLANS" button opens a plans overview with a Declared Plan and an Alternate Plan. "VIEW PLAN" on the declared plan opens the planner; the alternate is a demo placeholder.
- **Alerts / Errors & Warnings** - the Alerts badge shows a live count of issues. Clicking Alerts (or Validate) opens an Errors/Warnings panel; the clean 120-credit plan shows no errors and one friendly warning reminding the student to apply for graduation in their final semester.
- **Remove by dragging** - drag a course card onto the Requirements panel to drop it from the plan (same as the X button, with the drag effect).
- **Search Courses modal** - search by code or title, filter by department, instructional method, course type, and credits, with "Load More" paging. Courses already in the plan show "In plan" instead of an Add button.
- **Course offering rules** - every course is offered only in specific terms; the planner enforces this on drop, on add, and during validation.
- **Validate** - checks the whole plan for off-term courses, credit overloads, and duplicate (double-counted) courses.
- **Add Calendar Year**, **Reset My Plan**, and **auto-save** to the browser via `localStorage`.

## Tech stack

| Part | Choice |
|------|--------|
| Markup | HTML5 |
| Styling | Hand-written CSS (no framework) |
| Logic | Vanilla JavaScript (ES2020) |
| Drag & drop | Native HTML5 Drag and Drop API |
| Persistence | `localStorage` |
| Data | Seed catalog of ~90 real BYU-I Software Engineering BS courses (no real student data) |

## Files

- `index.html` — markup and styles
- `data.js` — course catalog, requirement groups, and the initial plan
- `app.js` — rendering, drag-and-drop, search, validation, persistence

## Run locally

Just open `index.html` in any modern browser. No install needed.

Or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Publishing to GitHub (local-first)

This is the "code first, repo second" flow: you build and commit locally, then create the
GitHub repo from your machine - no need to make the empty repo on the website first.

The `.gitignore` in this folder keeps the private screenshots (`*.png`) out of the commit, so
only `index.html`, `app.js`, `data.js`, and `README.md` are published.

**Easiest - GitHub CLI (`gh`):** (one-time setup: install from https://cli.github.com then run `gh auth login`)

```bash
cd "Cloning BYUI Grad Planner"
git init                 # turn this folder into a git repo
git add .                # stage everything not ignored
git commit -m "BYU-I Grad Planner clone"
gh repo create byui-grad-planner --public --source=. --remote=origin --push
```

That last command creates the remote repo AND pushes in one step. Done.

**Without the CLI:** create an empty repo on github.com (no README/.gitignore), then:

```bash
cd "Cloning BYUI Grad Planner"
git init
git add .
git commit -m "BYU-I Grad Planner clone"
git branch -M main
git remote add origin https://github.com/<your-username>/byui-grad-planner.git
git push -u origin main
```

Verify only the four code files were pushed (no screenshots): `git ls-files`.

### Then turn on GitHub Pages (optional, free hosting)

In the repo: **Settings -> Pages -> Build and deployment -> Source: Deploy from a branch**,
pick `main` / root. Your planner goes live at `https://<your-username>.github.io/byui-grad-planner/`.

## Sample plan: Fall 2023 start, ~12 credits/semester

The planner ships pre-loaded with a generic full-time student's plan built from the real BYU-Idaho Software Engineering BS requirements (General Education 39 cr, First Year Core 14, Core 16, Specialty 14, Experiential 5, Senior Project 3, Elective Major 6, Unspecified Electives 23 - **120 credits total**, the graduation minimum).

Taking **about 12 credits every semester** (Fall / Winter / Spring, year-round) starting **Fall 2023**, with the **final semester a full-time internship** (CSE 398 - 3 credits, the Software Engineering max; the full-time enrollment status is handled behind the scenes), the 120 credits land like this:

| Semester | Credits | Cumulative |
|---|---|---|
| Fall 2023 | 13 | 13 |
| Winter 2024 | 13 | 26 |
| Spring 2024 | 12 | 38 |
| Fall 2024 | 13 | 51 |
| Winter 2025 | 13 | 64 |
| Spring 2025 | 14 | 78 |
| Fall 2025 | 14 | 92 |
| Winter 2026 | 12 | 104 |
| Spring 2026 | 13 | 117 |
| **Fall 2026 - internship** | 3 | **120 -> graduate** |

So a year-round student at ~12 credits a term finishes in **10 semesters**, with a full-time internship in the last term, graduating at the end of **Fall 2026** (~December 2026) - roughly 3.3 calendar years. Course order respects prerequisites (e.g. CSE 110 -> 111 -> 210 -> 212 -> 310). The Specialty path chosen is the Full Stack Web Development module (one of four options); the others are in the catalog and can be swapped in by dragging.

## Notes

Course data is modeled on the real BYU-I Software Engineering BS curriculum. Term offerings are plausible assignments (the source catalog doesn't list them). No real grades or personal data are used - this is a generic full-time schedule, not anyone's actual plan.
