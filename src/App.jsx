import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import QuickSearch from './pages/QuickSearch.jsx'
import DeepSearch from './pages/DeepSearch.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quick" element={<QuickSearch />} />
        <Route path="/deep" element={<DeepSearch />} />
      </Routes>
      <footer className="footer">
        <p>
          GitDeepSearch — AI-powered GitHub search &nbsp;·&nbsp;{' '}
          <a href="https://github.com/simonmakzon/GitDeepSearch" target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </>
  )
}
