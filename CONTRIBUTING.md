# Contributing to GitDeepSearch

First off, thank you for considering contributing to GitDeepSearch! 🎉

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [How to Contribute](#how-to-contribute)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Style Guide](#style-guide)

## Code of Conduct

By participating in this project, you agree to be respectful, inclusive, and constructive. We welcome contributors from all backgrounds and experience levels.

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/GitDeepSearch.git
   cd GitDeepSearch
   ```
3. **Add the upstream remote:**
   ```bash
   git remote add upstream https://github.com/simonmakzon/GitDeepSearch.git
   ```

## Development Setup

### Prerequisites

- Node.js 18+ (20 recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file (optional but recommended):

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token
```

Without a token you get 10 unauthenticated requests/min. With one, you get 30/min.

### Running locally

```bash
npm run dev        # Start dev server at http://localhost:5173
npm run build      # Production build
npm run preview    # Preview production build
```

## How to Contribute

### Reporting Bugs

Use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) when opening a new issue.

### Suggesting Features

Use the [feature request template](.github/ISSUE_TEMPLATE/feature_request.md) for new ideas.

### Good First Issues

Look for issues labeled `good first issue` — these are beginner-friendly tasks.

### Areas for Contribution

- **Search strategies** — new deep search strategies in `src/lib/github.js`
- **UI improvements** — components in `src/components/`
- **New pages** — e.g. a "Trending" page, "Compare repos" page
- **Performance** — caching, debouncing, lazy loading
- **Accessibility** — keyboard navigation, screen reader support
- **Documentation** — improving README, adding examples

## Pull Request Process

1. Create a branch from `main`:
   ```bash
   git checkout -b feat/my-new-feature
   ```

2. Make your changes and commit with a clear message:
   ```bash
   git commit -m "feat: add trending repos page"
   ```

3. Keep your branch updated:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

4. Push and open a PR against `main`

5. Fill out the PR template completely

## Project Structure

```
src/
├── pages/
│   ├── Home.jsx          # Landing page with mode selection
│   ├── QuickSearch.jsx   # Fast search page
│   └── DeepSearch.jsx    # Deep research page
├── components/
│   ├── Navbar.jsx        # Top navigation
│   ├── RepoCard.jsx      # Repository result card
│   └── PersonCard.jsx    # User/developer result card
├── lib/
│   └── github.js         # GitHub API calls + NL query converter
├── App.jsx               # Router setup
├── main.jsx              # React entry point
└── index.css             # Global styles + design tokens
```

## Style Guide

- Use plain CSS (no Tailwind/styled-components) — see `index.css` for design tokens
- Prefer functional React components with hooks
- Keep components small and focused (under 150 lines ideally)
- No TypeScript required, but type-safe JSDoc comments are welcome
- Use Lucide React for icons (already installed)
- Format with Prettier (run `npx prettier --write src/` before committing)

---

Questions? Open a [discussion](https://github.com/simonmakzon/GitDeepSearch/discussions) or drop into an issue thread.
