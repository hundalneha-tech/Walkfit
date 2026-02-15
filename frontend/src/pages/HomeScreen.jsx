import { useState, useEffect } from 'react'
import { APIClient } from '../services/api'
import '../styles/home.css'

export default function HomeScreen({ user }) {
  const [todayStats, setTodayStats] = useState({
    steps: 7250,
    calories: 320,
    activeMinutes: 45,
    distance: 3.6
  })

  return (
    <div className="app-screen">
      <div className="app-header">
        <h1>WalkFit</h1>
        <div className="header-icons">
          <button className="icon-btn">🔔</button>
          <button className="icon-btn">⚙️</button>
        </div>
      </div>

      <div className="app-content">
        {/* Daily Stats Card */}
        <div className="stats-card">
          <div className="big-stat">{todayStats.steps.toLocaleString()}</div>
          <div className="stat-label">Steps Today</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{width: `${(todayStats.steps / 10000) * 100}%`}}></div>
          </div>
          <div className="stat-label">Goal: 10,000 steps</div>
        </div>

        {/* Quick Stats Grid */}
        <div className="quick-stats">
          <div className="quick-stat">
            <div className="quick-stat-icon">🔥</div>
            <div className="quick-stat-value">{todayStats.calories}</div>
            <div className="quick-stat-label">Calories</div>
          </div>
          <div className="quick-stat">
            <div className="quick-stat-icon">⏱️</div>
            <div className="quick-stat-value">{todayStats.activeMinutes}</div>
            <div className="quick-stat-label">Active Min</div>
          </div>
          <div className="quick-stat">
            <div className="quick-stat-icon">📍</div>
            <div className="quick-stat-value">{todayStats.distance}</div>
            <div className="quick-stat-label">Distance (km)</div>
          </div>
          <div className="quick-stat">
            <div className="quick-stat-icon">🏆</div>
            <div className="quick-stat-value">500</div>
            <div className="quick-stat-label">Points</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="section-header">
          <h3>Quick Actions</h3>
        </div>
        <div className="action-buttons-grid">
          <button className="action-btn">
            <div className="action-btn-icon">▶️</div>
            <div className="action-btn-text">Start Walk</div>
          </button>
          <button className="action-btn">
            <div className="action-btn-icon">🎯</div>
            <div className="action-btn-text">View Goals</div>
          </button>
        </div>

        {/* Recent Activity */}
        <div className="section-header">
          <h3>Recent Activity</h3>
          <a href="#" className="section-link">View All</a>
        </div>
        
        <div className="activity-history-card">
          <div className="activity-history-icon">🚶</div>
          <div className="activity-history-details">
            <div className="activity-history-title">Morning Walk</div>
            <div className="activity-history-meta">2.3 km • 3,100 steps</div>
          </div>
        </div>

        <div className="activity-history-card">
          <div className="activity-history-icon">🏃</div>
          <div className="activity-history-details">
            <div className="activity-history-title">Evening Run</div>
            <div className="activity-history-meta">5.2 km • 7,000 steps</div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-nav">
        <div className="nav-item active">
          <div className="nav-icon">🏠</div>
          <div className="nav-label">Home</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">📊</div>
          <div className="nav-label">Stats</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🛍️</div>
          <div className="nav-label">Store</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🎁</div>
          <div className="nav-label">Rewards</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">👤</div>
          <div className="nav-label">Profile</div>
        </div>
      </div>
    </div>
  )
}
