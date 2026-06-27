import { Users, BookOpen, MapPin, ExternalLink } from 'lucide-react'
import { formatNumber } from '../lib/github.js'

export default function PersonCard({ user }) {
  return (
    <a
      href={user.html_url}
      target="_blank"
      rel="noreferrer"
      className="person-card"
    >
      <div className="person-avatar">
        <img
          src={user.avatar_url}
          alt={user.login}
          loading="lazy"
        />
      </div>
      <div className="person-info">
        <div className="person-name">
          {user.name || user.login}
          <ExternalLink size={12} style={{ marginLeft: 4 }} />
        </div>
        <div className="person-login">@{user.login}</div>
        {user.bio && <div className="person-bio">{user.bio}</div>}
        <div className="person-meta">
          {user.followers != null && (
            <span className="person-meta-item">
              <Users size={12} />
              {formatNumber(user.followers)} followers
            </span>
          )}
          {user.public_repos != null && (
            <span className="person-meta-item">
              <BookOpen size={12} />
              {user.public_repos} repos
            </span>
          )}
          {user.location && (
            <span className="person-meta-item">
              <MapPin size={12} />
              {user.location}
            </span>
          )}
        </div>
      </div>
    </a>
  )
}
