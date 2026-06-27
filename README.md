# GitDeepSearch

> AI-powered GitHub search for repositories and people — using natural language.

![GitDeepSearch](https://img.shields.io/badge/AI-GitHub%20Search-4f46e5?style=flat-square)
![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)

## Features

- **Quick Search** — Fast natural-language GitHub search for repositories and people
- **Deep Search** — Multi-strategy research that runs 4 parallel search passes to find harder-to-discover repos and developers
- **Natural Language Queries** — Type "fitness mobile app in Flutter" and get relevant results
- **Pagination** — Browse through all results
- **Rich Cards** — Stars, forks, language, topics, update time for repos; followers, bio, location for people
- **Zero backend** — Runs entirely in the browser using the GitHub Search API

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/simonmakzon/GitDeepSearch.git
cd GitDeepSearch
```

### 2. Install dependencies

```bash
npm install
```

### 3. (Optional) Add a GitHub token for higher rate limits

Create a `.env` file:

```env
VITE_GITHUB_TOKEN=your_github_personal_access_token_here
```

Without a token, GitHub allows 10 requests/minute per IP. With a token, you get 30 requests/minute.

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production

```bash
npm run build
```

Output goes to the `dist/` folder — deploy to any static host (Vercel, Netlify, GitHub Pages, etc.).

## How It Works

### Quick Search
Translates your natural-language query into a GitHub search query, detecting programming languages and frameworks from your text, then hits the GitHub Search API.

### Deep Search
Runs 4 different search strategies in sequence:
1. Search by relevance
2. Search by stars
3. Search by recent activity
4. Search in README content

Results are deduplicated and sorted by star count.

## Stack

- **React 18** + **React Router 6**
- **Vite 5**
- **GitHub Search API** (no backend needed)
- **Lucide React** icons

## License

MIT — see [LICENSE](LICENSE) for details.

---

Built by [simonmakzon](https://github.com/simonmakzon)
