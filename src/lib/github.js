const GITHUB_API = 'https://api.github.com';

function getHeaders() {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers = {
    'Accept': 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

export function nlToGitHubQuery(naturalQuery, type = 'repos') {
  let q = naturalQuery.trim();

  const langMap = {
    'python': 'language:python', 'javascript': 'language:javascript',
    'typescript': 'language:typescript', 'rust': 'language:rust',
    'go': 'language:go', 'java': 'language:java', 'kotlin': 'language:kotlin',
    'swift': 'language:swift', 'flutter': 'language:dart', 'dart': 'language:dart',
    'react': 'topic:react', 'vue': 'topic:vue', 'angular': 'topic:angular',
    'nextjs': 'topic:nextjs', 'next.js': 'topic:nextjs',
    'node': 'language:javascript topic:nodejs', 'nodejs': 'language:javascript topic:nodejs',
  };

  const langParts = [];
  const cleanWords = [];
  const words = q.split(/\s+/);

  for (const word of words) {
    const lower = word.toLowerCase().replace(/[^a-z0-9.]/g, '');
    if (langMap[lower]) {
      langParts.push(langMap[lower]);
    } else {
      cleanWords.push(word);
    }
  }

  const baseQuery = cleanWords.join(' ');
  const finalParts = [baseQuery, ...langParts].filter(Boolean);
  return finalParts.join(' ');
}

export async function searchRepositories(query, page = 1, perPage = 10) {
  const q = nlToGitHubQuery(query, 'repos');
  const url = new URL(`${GITHUB_API}/search/repositories`);
  url.searchParams.set('q', q);
  url.searchParams.set('sort', 'stars');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));

  const res = await fetch(url.toString(), { headers: getHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }
  return res.json();
}

export async function searchUsers(query, page = 1, perPage = 10) {
  const url = new URL(`${GITHUB_API}/search/users`);
  url.searchParams.set('q', query);
  url.searchParams.set('sort', 'followers');
  url.searchParams.set('order', 'desc');
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));

  const res = await fetch(url.toString(), { headers: getHeaders() });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `GitHub API error: ${res.status}`);
  }
  return res.json();
}

export async function getUserDetails(login) {
  const res = await fetch(`${GITHUB_API}/users/${login}`, { headers: getHeaders() });
  if (!res.ok) return null;
  return res.json();
}

export async function searchDeepRepositories(query, onProgress) {
  const strategies = [
    { label: 'Searching by relevance...', sort: 'best-match', q: nlToGitHubQuery(query) },
    { label: 'Searching by stars...', sort: 'stars', q: nlToGitHubQuery(query) },
    { label: 'Searching by recent activity...', sort: 'updated', q: nlToGitHubQuery(query) },
    { label: 'Searching related topics...', sort: 'stars', q: query + ' in:readme' },
  ];

  const seen = new Set();
  const allItems = [];

  for (let i = 0; i < strategies.length; i++) {
    const s = strategies[i];
    onProgress && onProgress({ step: i, label: s.label, total: strategies.length });

    try {
      const url = new URL(`${GITHUB_API}/search/repositories`);
      url.searchParams.set('q', s.q);
      url.searchParams.set('sort', s.sort === 'best-match' ? '' : s.sort);
      url.searchParams.set('order', 'desc');
      url.searchParams.set('per_page', '10');
      url.searchParams.set('page', '1');

      const res = await fetch(url.toString(), { headers: getHeaders() });
      if (!res.ok) continue;

      const data = await res.json();
      for (const item of (data.items || [])) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          allItems.push(item);
        }
      }
    } catch (_) {}

    await new Promise(r => setTimeout(r, 300));
  }

  onProgress && onProgress({ step: strategies.length, label: 'Done!', total: strategies.length });

  allItems.sort((a, b) => (b.stargazers_count - a.stargazers_count));
  return { items: allItems, total_count: allItems.length };
}

export async function searchDeepUsers(query, onProgress) {
  const strategies = [
    { label: 'Searching users by name...', q: query + ' in:login' },
    { label: 'Searching users by bio...', q: query + ' in:bio' },
    { label: 'Searching by location...', q: query + ' type:user' },
  ];

  const seen = new Set();
  const allItems = [];

  for (let i = 0; i < strategies.length; i++) {
    const s = strategies[i];
    onProgress && onProgress({ step: i, label: s.label, total: strategies.length });

    try {
      const url = new URL(`${GITHUB_API}/search/users`);
      url.searchParams.set('q', s.q);
      url.searchParams.set('sort', 'followers');
      url.searchParams.set('order', 'desc');
      url.searchParams.set('per_page', '10');

      const res = await fetch(url.toString(), { headers: getHeaders() });
      if (!res.ok) continue;

      const data = await res.json();
      for (const item of (data.items || [])) {
        if (!seen.has(item.id)) {
          seen.add(item.id);
          allItems.push(item);
        }
      }
    } catch (_) {}

    await new Promise(r => setTimeout(r, 300));
  }

  onProgress && onProgress({ step: strategies.length, label: 'Done!', total: strategies.length });
  return { items: allItems, total_count: allItems.length };
}

export function formatNumber(n) {
  if (!n) return '0';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return String(n);
}

export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  if (diff < 2592000) return Math.floor(diff / 86400) + 'd ago';
  if (diff < 31536000) return Math.floor(diff / 2592000) + 'mo ago';
  return Math.floor(diff / 31536000) + 'y ago';
}

export const LANG_COLORS = {
  JavaScript: '#f1e05a', TypeScript: '#3178c6', Python: '#3572A5',
  Java: '#b07219', Go: '#00ADD8', Rust: '#dea584', Ruby: '#701516',
  PHP: '#4F5D95', C: '#555555', 'C++': '#f34b7d', 'C#': '#178600',
  Swift: '#F05138', Kotlin: '#A97BFF', Dart: '#00B4AB', HTML: '#e34c26',
  CSS: '#563d7c', Shell: '#89e051', Vue: '#41B883', Scala: '#c22d40',
  Elixir: '#6e4a7e', Haskell: '#5e5086', Lua: '#000080',
};
