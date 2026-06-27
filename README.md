<div align="center">

<img src="docs/logo.svg" alt="GitDeepSearch Logo" width="80" height="80"/>

# GitDeepSearch

### AI-powered GitHub Search for Repositories & Developers

**Find any codebase or developer on GitHub using plain natural language.**  
Two modes: lightning-fast Quick Search and multi-strategy Deep Search.

<br/>

[![CI](https://github.com/simonmakzon/GitDeepSearch/actions/workflows/ci.yml/badge.svg)](https://github.com/simonmakzon/GitDeepSearch/actions/workflows/ci.yml)
[![Deploy](https://github.com/simonmakzon/GitDeepSearch/actions/workflows/deploy.yml/badge.svg)](https://github.com/simonmakzon/GitDeepSearch/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-4f46e5.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=61dafb)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite)](https://vite.dev)
[![GitHub API](https://img.shields.io/badge/GitHub-Search%20API-181717?logo=github)](https://docs.github.com/en/rest/search)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Stars](https://img.shields.io/github/stars/simonmakzon/GitDeepSearch?style=flat&color=f59e0b)](https://github.com/simonmakzon/GitDeepSearch/stargazers)

<br/>

[**🚀 Live Demo**](https://simonmakzon.github.io/GitDeepSearch) &nbsp;·&nbsp;
[**📖 Docs**](#getting-started) &nbsp;·&nbsp;
[**🐛 Report Bug**](https://github.com/simonmakzon/GitDeepSearch/issues/new?template=bug_report.md) &nbsp;·&nbsp;
[**✨ Request Feature**](https://github.com/simonmakzon/GitDeepSearch/issues/new?template=feature_request.md)

</div>

---

## Demo

### Quick Search — Find repos in seconds

![Quick Search Demo](docs/demo.svg)

### Deep Search — 4-strategy parallel research

![Deep Search Demo](docs/deep-search-demo.svg)

---

## Why GitDeepSearch?

GitHub's native search is powerful — but it requires you to know exact query syntax. GitDeepSearch translates what you mean into what GitHub understands.

| Feature | GitHub Search | GitDeepSearch |
|---|---|---|
| Plain English queries | ❌ | ✅ |
| Auto language detection | ❌ | ✅ |
| Multi-strategy deep search | ❌ | ✅ |
| Result deduplication | ❌ | ✅ |
| Rich result cards | Minimal | ✅ Full detail |
| Zero backend needed | ✅ | ✅ |
| Open source | ❌ | ✅ |

---

## Features

### 🔍 Quick Search
- Type natural language like `"fitness mobile app in Flutter"` — no query syntax needed
- Auto-detects **20+ programming languages** and frameworks (Python, TypeScript, Flutter, React, Next.js, Go, Rust, etc.)
- Search **repositories** or **people** with one click
- Full **pagination** — browse up to 1,000 results
- Rich **repo cards**: stars ⭐, forks 🍴, language, topics, last update
- Rich **person cards**: avatar, bio, followers, public repos, location

### 🔭 Deep Search
- Runs **4 search strategies** in sequence:
  1. Search by relevance
  2. Search by star count
  3. Search by recent activity
  4. Search inside README content
- **Real-time progress tracker** — watch each strategy run
- **Automatic deduplication** — results from all strategies merged and deduplicated
- Results **sorted by stars** for quality-first ranking
- **User enrichment** — People results fetch full GitHub profiles

### ⚡ Zero Backend
- Runs **entirely in the browser** — no server, no database
- Talks directly to the [GitHub Search API](https://docs.github.com/en/rest/search)
- Deploy anywhere: GitHub Pages, Vercel, Netlify, Cloudflare Pages

---

## Getting Started

### Prerequisites

- Node.js 18+ (20 recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/simonmakzon/GitDeepSearch.git
cd GitDeepSearch

# Install dependencies
npm install

# Start development server
npm run dev
```

Open **http://localhost:5173** in your browser.

### Optional: GitHub Token (higher rate limits)

Without a token: **10 requests/minute** (unauthenticated)  
With a token: **30 requests/minute** (authenticated)

```bash
# Create .env file
echo "VITE_GITHUB_TOKEN=your_token_here" > .env
```

Generate a token at: [GitHub → Settings → Developer settings → Personal access tokens](https://github.com/settings/tokens)  
Required scopes: **none** (public read-only access is enough)

### Build for Production

```bash
npm run build      # Output goes to dist/
npm run preview    # Preview the production build locally
```

---

## Deployment

### GitHub Pages (Automatic)

This repo includes a GitHub Actions workflow that auto-deploys on every push to `main`.

1. Go to your repo **Settings → Pages**
2. Set Source to **GitHub Actions**
3. Push to `main` — the workflow handles the rest ✅

### Vercel

```bash
npm install -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Drag the dist/ folder to netlify.com/drop
```

### Docker

```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
```

```bash
docker build -t gitdeepsearch .
docker run -p 8080:80 gitdeepsearch
```

---

## Architecture

```
GitDeepSearch
│
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Mode selection landing page
│   │   ├── QuickSearch.jsx   # Fast single-strategy search
│   │   └── DeepSearch.jsx    # Multi-strategy research mode
│   │
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky navigation with backdrop blur
│   │   ├── RepoCard.jsx      # Repository result card
│   │   └── PersonCard.jsx    # User/developer result card
│   │
│   ├── lib/
│   │   └── github.js         # GitHub API client + NL query engine
│   │                         # ├─ nlToGitHubQuery()    — NL → query string
│   │                         # ├─ searchRepositories() — quick repo search
│   │                         # ├─ searchUsers()        — quick people search
│   │                         # ├─ searchDeepRepositories() — 4-strategy deep
│   │                         # └─ searchDeepUsers()   — deep people research
│   │
│   ├── App.jsx               # React Router setup
│   ├── main.jsx              # React entry point
│   └── index.css             # Design tokens + global styles
│
├── .github/
│   ├── workflows/
│   │   ├── ci.yml            # Build check on PRs (Node 18 + 20)
│   │   └── deploy.yml        # Auto-deploy to GitHub Pages
│   └── ISSUE_TEMPLATE/       # Bug report + feature request templates
│
├── docs/
│   ├── demo.svg              # Animated Quick Search demo
│   └── deep-search-demo.svg  # Animated Deep Search demo
│
└── vite.config.js            # Vite build configuration
```

### Natural Language Query Engine

`nlToGitHubQuery()` maps natural language words to GitHub search qualifiers:

```
"fitness mobile app in Flutter"
    → "fitness mobile app language:dart"

"analytics dashboard with AI in Python"
    → "analytics dashboard with AI language:python"

"Next.js e-commerce with Stripe"
    → "e-commerce with Stripe topic:nextjs"
```

Detected languages/frameworks: Python, JavaScript, TypeScript, Go, Rust, Java, Kotlin, Swift, Flutter/Dart, React, Vue, Angular, Next.js, Node.js

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build tool | Vite 5 |
| Routing | React Router 6 |
| Icons | Lucide React |
| API | GitHub Search API v3 |
| Styling | Plain CSS with design tokens |
| CI/CD | GitHub Actions |
| Hosting | GitHub Pages |

---

## Roadmap

- [x] Quick Search — repos & people
- [x] Deep Search — 4-strategy parallel research
- [x] Pagination
- [x] Natural language query conversion
- [x] GitHub Actions CI + auto-deploy
- [ ] 🔮 Trending repos page (daily / weekly / monthly)
- [ ] 🔮 Search history (localStorage)
- [ ] 🔮 Keyboard shortcut ⌘K to focus search
- [ ] 🔮 Dark mode
- [ ] 🔮 Filter by language, stars range, license
- [ ] 🔮 Compare two repositories side by side
- [ ] 🔮 Export results as CSV / JSON
- [ ] 🔮 AI query rewriting (OpenAI)
- [ ] 🔮 GitHub OAuth sign-in for personalized results

---

## Contributing

Contributions are very welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

```bash
# Fork → Clone → Branch → Commit → PR
git checkout -b feat/your-feature
git commit -m "feat: add your feature"
git push origin feat/your-feature
# Open a Pull Request on GitHub
```

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## License

Distributed under the [MIT License](LICENSE).  
Copyright © 2026 [simonmakzon](https://github.com/simonmakzon)

---

<div align="center">

**If you find this useful, please give it a ⭐ — it helps others discover the project!**

[⭐ Star this repo](https://github.com/simonmakzon/GitDeepSearch) &nbsp;·&nbsp; [🐛 Report a bug](https://github.com/simonmakzon/GitDeepSearch/issues) &nbsp;·&nbsp; [💡 Suggest a feature](https://github.com/simonmakzon/GitDeepSearch/issues)

Made with ❤️ by [simonmakzon](https://github.com/simonmakzon)

</div>
