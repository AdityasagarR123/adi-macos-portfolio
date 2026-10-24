# adi's macOS portfolio

My portfolio as a tiny Mac in the browser: a Notes app for the portfolio itself, plus a Dock full of apps.

**Live:** https://adi-macos-portfolio.vercel.app

## What's inside

- **Notes** — about me, experience, projects, open source, hackathons & wins, tech stack, trek checklist, resume, contact
- **GitHub** — live profile, repos, contribution graph and activity from the GitHub API
- **Terminal** — try `help`, `gh`, `prs`, `activity`, `neofetch`
- **X** — my real posts through X's official embed
- **LinkedIn** — a copy of my LinkedIn profile
- **Messages** — parody chats (not real conversations)
- **Claude** — research chats on RAG, hybrid search and more
- **Music** — my Spotify playlist
- **Photos** — treks and wins
- **Preview** — my resume

Windows drag, resize from any edge, minimize and zoom; the Dock magnifies on hover. It works on phones too.

## Built with

Plain HTML, CSS and JavaScript — no framework, no build step.

## Run locally

```bash
npx http-server . -p 5180
```

Then open http://localhost:5180.

## Editing content

Almost everything (profile, projects, experience, posts, chats, photos) lives in [`data.js`](data.js).
