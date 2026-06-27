import { useNavigate } from 'react-router-dom'
import { Search, Telescope } from 'lucide-react'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="page page-center" style={{ minHeight: 'calc(100vh - 56px)', justifyContent: 'center' }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <span className="badge-ai">✦ AI-Powered</span>
        </div>
        <h1 className="page-title">AI GitHub Search</h1>
        <p className="page-subtitle">
          Find codebases and developers using natural language.<br />
          Choose how you want to search.
        </p>
      </div>

      <div className="home-cards">
        <button className="mode-card" onClick={() => navigate('/quick')}>
          <div className="mode-card-icon">
            <Search size={22} />
          </div>
          <div className="mode-card-title">Quick search</div>
          <div className="mode-card-desc">
            Fast natural-language GitHub search for repositories and people.
          </div>
        </button>

        <button className="mode-card" onClick={() => navigate('/deep')}>
          <div className="mode-card-icon">
            <Telescope size={22} />
          </div>
          <div className="mode-card-title">Deep search</div>
          <div className="mode-card-desc">
            Deeper GitHub research for harder-to-find repositories and people.
          </div>
        </button>
      </div>
    </div>
  )
}
