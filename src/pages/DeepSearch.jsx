import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowLeft, Telescope, CheckCircle, Circle, Loader } from 'lucide-react'
import { searchDeepRepositories, searchDeepUsers, getUserDetails } from '../lib/github.js'
import RepoCard from '../components/RepoCard.jsx'
import PersonCard from '../components/PersonCard.jsx'

const SUGGESTIONS = [
  'Quiz application',
  'Wishlist app',
  'Fitness mobile app',
  'Analytics dashboard with AI',
  'Meditation app in Flutter',
]

export default function DeepSearch() {
  const [query, setQuery] = useState('')
  const [tab, setTab] = useState('repos')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState(null)
  const [progress, setProgress] = useState(null)
  const inputRef = useRef(null)

  async function doSearch(q = query) {
    if (!q.trim()) return
    setLoading(true)
    setError('')
    setResults(null)
    setProgress(null)

    try {
      if (tab === 'repos') {
        const data = await searchDeepRepositories(q, (p) => setProgress(p))
        setResults(data.items || [])
      } else {
        const data = await searchDeepUsers(q, (p) => setProgress(p))

        const enriched = await Promise.all(
          (data.items || []).slice(0, 15).map(async (u) => {
            const detail = await getUserDetails(u.login)
            return detail || u
          })
        )
        setResults(enriched)
      }
    } catch (e) {
      setError(e.message || 'Deep search failed. Try again.')
    } finally {
      setLoading(false)
      setProgress(null)
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    doSearch(query)
  }

  function useSuggestion(s) {
    setQuery(s)
    doSearch(s)
    inputRef.current?.focus()
  }

  const progressSteps = progress
    ? Array.from({ length: progress.total }, (_, i) => ({
        label: i === progress.step
          ? progress.label
          : i < progress.step
            ? 'Done'
            : 'Waiting...',
        state: i < progress.step ? 'done' : i === progress.step ? 'active' : 'pending',
      }))
    : []

  return (
    <div className="search-page">
      <Link to="/" className="back-btn">
        <ArrowLeft size={15} />
        Back
      </Link>

      <div className="search-page-header">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 10 }}>
          <span className="badge-ai">✦ Deep Research Mode</span>
        </div>
        <h1 className="search-page-title">Deep search</h1>
        <p className="search-page-subtitle">
          Multi-strategy GitHub research for harder-to-find repositories and people.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="search-box">
        <div className="search-input-wrap">
          <span className="search-input-icon"><Telescope size={16} /></span>
          <input
            ref={inputRef}
            className="search-input"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Analytics dashboard with AI in Python"
            autoFocus
          />
        </div>
        <button
          type="submit"
          className="search-submit"
          disabled={loading || !query.trim()}
        >
          <Telescope size={15} />
          Deep search
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

      {error && <div className="error-banner">⚠️ {error}</div>}

      {loading && progress && (
        <div className="deep-progress">
          <div className="deep-progress-title">
            <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
            Running deep search...
          </div>
          {progressSteps.map((step, i) => (
            <div key={i} className="deep-step">
              <div className={`deep-step-icon ${step.state}`}>
                {step.state === 'done' ? '✓' : step.state === 'active' ? '◉' : '○'}
              </div>
              <span style={{ color: step.state === 'active' ? 'var(--primary)' : undefined }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {loading && !progress && (
        <div className="loading">
          <div className="spinner" />
          <div className="loading-text">Starting deep search...</div>
        </div>
      )}

      {results && !loading && (
        <>
          <div className="results-meta">
            {results.length > 0
              ? `Found ${results.length} results from multi-strategy deep search`
              : 'No results found'}
          </div>

          {results.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🔭</div>
              <div className="empty-title">Nothing found</div>
              <div className="empty-desc">Try different or broader keywords.</div>
            </div>
          ) : (
            <div className="results">
              {tab === 'repos'
                ? results.map(r => <RepoCard key={r.id} repo={r} />)
                : results.map(u => <PersonCard key={u.id} user={u} />)
              }
            </div>
          )}
        </>
      )}
    </div>
  )
}
