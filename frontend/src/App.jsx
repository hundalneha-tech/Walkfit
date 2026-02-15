import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios'

// Pages
import AuthScreen from './pages/AuthScreen'
import HomeScreen from './pages/HomeScreen'
import StoreScreen from './pages/StoreScreen'
import RewardsScreen from './pages/RewardsScreen'
import ProfileScreen from './pages/ProfileScreen'

// Services
import { APIClient } from './services/api'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('jwt_token')
    if (token) {
      // Verify token is valid
      APIClient.get('/user/profile')
        .then(response => {
          setUser(response.data)
          setIsAuthenticated(true)
        })
        .catch(() => {
          localStorage.removeItem('jwt_token')
          setIsAuthenticated(false)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const handleLogin = (token, userData) => {
    localStorage.setItem('jwt_token', token)
    APIClient.setAuthToken(token)
    setUser(userData)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('jwt_token')
    APIClient.setAuthToken(null)
    setUser(null)
    setIsAuthenticated(false)
  }

  if (loading) {
    return (
      <div className="splash-screen">
        <div className="loading-logo">🚶</div>
        <div className="loading-text">WalkFit</div>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <Router>
      {!isAuthenticated ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <Routes>
          <Route path="/" element={<HomeScreen user={user} />} />
          <Route path="/store" element={<StoreScreen user={user} />} />
          <Route path="/rewards" element={<RewardsScreen user={user} />} />
          <Route path="/profile" element={<ProfileScreen user={user} onLogout={handleLogout} />} />
        </Routes>
      )}
    </Router>
  )
}

export default App
