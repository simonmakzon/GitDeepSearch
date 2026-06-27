# Changelog

All notable changes to GitDeepSearch are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] — 2026-06-27

### Added

- **Home page** — mode selection between Quick Search and Deep Search
- **Quick Search** — fast natural-language GitHub search for repositories and people
  - Natural language to GitHub query converter (auto-detects languages and frameworks)
  - Repositories tab with rich repo cards (stars, forks, language, topics, update time)
  - People tab with user cards (avatar, bio, followers, public repos, location)
  - Pagination — browse through all results (up to 1000 GitHub Search results)
- **Deep Search** — multi-strategy research mode
  - 4 sequential search strategies: relevance, stars, recent activity, README content
  - Real-time progress tracker showing each search step
  - Automatic deduplication and sorting by star count
  - User enrichment — fetches full profile details for People results
- **UI Design**
  - Indigo/violet color palette with soft blue-tinted background
  - Smooth hover transitions on all cards and buttons
  - Responsive layout (mobile and desktop)
  - Sticky nav with backdrop blur
  - Language dot colors for 20+ programming languages
- **Developer experience**
  - Zero backend — runs entirely in the browser via GitHub Search API
  - Optional `VITE_GITHUB_TOKEN` env var for higher API rate limits
  - Vite 5 build system with React 18

### Infrastructure

- GitHub Actions CI — builds on Node 18 and 20 for every push and PR
- GitHub Actions deploy — auto-deploys to GitHub Pages on every push to `main`
- Issue templates for bug reports and feature requests
- PR template for streamlined contributions
- MIT License

---

## Roadmap

### [1.1.0] — Planned

- [ ] Trending repositories page (daily/weekly/monthly)
- [ ] Search history (localStorage)
- [ ] Keyboard shortcuts (⌘K to focus search)
- [ ] Dark mode
- [ ] Copy shareable search link

### [1.2.0] — Planned

- [ ] Compare two repositories side by side
- [ ] Export results as CSV/JSON
- [ ] Filter by language, stars range, license
- [ ] Organisation search mode

### [2.0.0] — Future

- [ ] AI-powered query rewriting (OpenAI)
- [ ] Repository content search (search inside code)
- [ ] Saved searches and collections
- [ ] GitHub OAuth sign-in for personalised results
