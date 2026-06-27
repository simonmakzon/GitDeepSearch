import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowLeft, Repo, User } from 'lucide-react'
import { searchRepositories, searchUsers } from '../lib/github.js'
import RepoCard from '../components/RepoCard.jsx'
import PersonCard from '../components/PersonCard.jsx'

const SUGGESTIONS = [
  'Quiz application',
  'Wishlist app',
  'Fitness mobile app',
  'Analytics dashboard with AI',
  'Meditation app in Flutter',
  'E-commerce with Next.js',
  'Chat app with WebSocket',
  'REST API boilerplate',
]

const PER_PAGE = 10

export default function QuickSearch() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('repos')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const inputRef = useRef(null)

  async function doSearch(q = query, p = 1) {
    if (!q.trim()) return
    setLoading(true)
    setError('')
    setResults(null)
    setPage(p)
    try {
      const data = tab === 'repos'
        ? await searchRepositories(q, p, PER_PAGE)
        : await searchUsers(q, p, PER_PAGE)
      setResults(data.items || [])
      setTotalCount(data.total_count || 0)
    } catch (e) {
      setError(e.message || 'Search failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    doSearch(query, 1)
  }

  function useSuggestion(s) {
    setQuery(s)
    doSearch(s, 1)
    inputRef.current?.focus()
  }

  async function changePage(p) {
    await doSearch(query, p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const totalPages = Math.min(Math.ceil(totalCount / PER_PAGE), 100)

  return (
    <div className="search-page">
      <Link to="/" className="back-btn">
        <ArrowLeft size={15} />
        Back
      </Link>

      <div className="search-page-header">
        <h1 className="search-page-title">Quick search</h1>
        <p className="search-page-subtitle">
          Fast natural-language GitHub search for repositories and people.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search-box">
        <div className="search-input-wrap">
          <span className="search-input-icon"><Search size={16} /></span>
          <input
            ref={inputRef}
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="A simple Next.js todo app that uses Tailwind CSS"
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="search-submit"
          disabled={loading || !query.trim()}
        >
          <Search size={15} />
          Search
        </button>
      </form>

      <div className="search-tabs">
        <button
          className={`search-tab ${tab === 'repos' ? 'active' : ''}`}
          onClick={() => { setTab('repos'); setResults(null) }}
        >
          <Search size={13} />
          Repositories
        </button>
        <button
          className={`search-tab ${tab === 'people' ? 'active' : ''}`}
          onClick={() => { setTab('people'); setResults(null) }}
        >
          <span style={{ fontSize: 13 }}>👤</span>
          People
        </button>
      </div>

      {!results && !loading && (
        <div className="suggestions">
          <div className="suggestions-label">Try a search</div>
          <div className="suggestions-list">
            {SUGGESTIONS.map(s => (
              <button key={s} className="suggestion-chip" onClick={() => useSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="error-banner">⚠️ {error}</div>
      )}

      {loading && (
        <div className="loading">
          <div className="spinner" />
          <div className="loading-text">Searching GitHub...</div>
        </div>
      )}

      {results && !loading && (
        <>
          <div className="results-meta">
            {totalCount > 0
              ? `About ${totalCount.toLocaleString()} results — page ${page} of ${totalPages}`
              : 'No results found'}
          </div>

          {results.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🔍</div>
              <div className="empty-title">No results</div>
              <div className="empty-desc">Try different keywords or check your spelling.</div>
            </div>
          ) : (
            <>
              <div className="results">
                {tab === 'repos'
                  ? results.map(r => <RepoCard key={r.id} repo={r} />)
                  : results.map(u => <PersonCard key={u.id} user={u} />)
                }
              </div>

              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-btn"
                    onClick={() => changePage(page - 1)}
                    disabled={page === 1}
                  >
                    ← Prev
                  </button>
                  <span className="page-info">Page {page} / {totalPages}</span>
                  <button
                    className="page-btn"
                    onClick={() => changePage(page + 1)}
                    disabled={page >= totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
