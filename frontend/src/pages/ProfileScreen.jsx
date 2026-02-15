import { useState, useEffect } from 'react'
import { APIClient } from '../services/api'
import '../styles/profile.css'

export default function ProfileScreen({ user, onLogout }) {
  const [profileData, setProfileData] = useState(user || {})
  const [isEditing, setIsEditing] = useState(false)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      onLogout()
    }
  }

  return (
    <div className="app-screen">
      <div className="profile-header">
        <div className="profile-avatar">
          {profileData.firstName?.[0]}{profileData.lastName?.[0]}
        </div>
        <h2 className="profile-name">{profileData.firstName} {profileData.lastName}</h2>
        <p className="profile-email">{profileData.email}</p>
      </div>

      <div className="app-content">
        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-label">Email</div>
            <span>{profileData.email}</span>
          </div>
          <div className="settings-item">
            <div className="settings-label">Daily Goal</div>
            <span>{profileData.preferences?.dailyGoal || 10000} steps</span>
          </div>
          <div className="settings-item">
            <div className="settings-label">Notifications</div>
            <span>{'Enabled'}</span>
          </div>
          <div className="settings-item">
            <div className="settings-label">Account Tier</div>
            <span>{profileData.rewards?.tier || 'Bronze'}</span>
          </div>
        </div>

        <button
          className="btn-danger"
          onClick={handleLogout}
          style={{width: '100%', marginTop: 24}}
        >
          Logout
        </button>
      </div>

      <div className="bottom-nav">
        <div className="nav-item">
          <div className="nav-icon">🏠</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">📊</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🛍️</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🎁</div>
        </div>
        <div className="nav-item active">
          <div className="nav-icon">👤</div>
        </div>
      </div>
    </div>
  )
}
