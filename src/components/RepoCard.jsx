import { Star, GitFork, Clock, ExternalLink } from 'lucide-react'
import { formatNumber, timeAgo, LANG_COLORS } from '../lib/github.js'

export default function RepoCard({ repo }) {
  const langColor = LANG_COLORS[repo.language] || '#8b949e'

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer"
      className="repo-card"
      style={{ display: 'block' }}
    >
      <div className="repo-card-header">
        <span className="repo-card-name">
          <ExternalLink size={13} />
          {repo.full_name}
        </span>
        <span className="repo-card-visibility">
          {repo.private ? 'private' : 'public'}
        </span>
      </div>

      {repo.description && (
        <p className="repo-card-desc">{repo.description}</p>
      )}

      <div className="repo-card-meta">
        {repo.language && (
          <span className="repo-meta-item">
            <span className="lang-dot" style={{ background: langColor }} />
            {repo.language}
          </span>
        )}
        <span className="repo-meta-item">
          <Star size={13} />
          {formatNumber(repo.stargazers_count)}
        </span>
        <span className="repo-meta-item">
          <GitFork size={13} />
          {formatNumber(repo.forks_count)}
        </span>
        <span className="repo-meta-item">
          <Clock size={13} />
          {timeAgo(repo.updated_at)}
        </span>
      </div>

      {repo.topics && repo.topics.length > 0 && (
        <div className="repo-topics">
          {repo.topics.slice(0, 5).map(t => (
            <span key={t} className="topic-badge">{t}</span>
          ))}
        </div>
      )}
    </a>
  )
}
