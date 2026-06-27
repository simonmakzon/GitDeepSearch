import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav className="nav">
      <Link to="/" className="nav-logo">
        GitDeepSearch
      </Link>
      <div className="nav-actions">
        {!isHome && (
          <>
            <Link to="/quick" className={`btn btn-ghost ${location.pathname === '/quick' ? 'active' : ''}`}>
              Quick
            </Link>
            <Link to="/deep" className={`btn btn-ghost ${location.pathname === '/deep' ? 'active' : ''}`}>
              Deep
            </Link>
          </>
        )}
        <a
          href="https://github.com/simonmakzon/GitDeepSearch"
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline"
        >
          GitHub
        </a>
      </div>
    </nav>
  )
}
