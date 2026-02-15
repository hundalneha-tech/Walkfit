import { useState, useEffect } from 'react'
import { APIClient } from '../services/api'
import '../styles/rewards.css'

export default function RewardsScreen({ user }) {
  const [balance, setBalance] = useState({
    totalPoints: 0,
    availablePoints: 0,
    tier: 'Bronze'
  })
  const [rewards, setRewards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch rewards data
    Promise.all([
      APIClient.get('/rewards/balance'),
      APIClient.get('/rewards/catalog')
    ])
    .then(([balanceRes, rewardsRes]) => {
      setBalance(balanceRes.data)
      setRewards(rewardsRes.data.products)
    })
    .catch(err => console.error('Failed to fetch rewards:', err))
    .finally(() => setLoading(false))
  }, [])

  const redeemReward = async (reward) => {
    try {
      const response = await APIClient.post('/rewards/redeem', {
        rewardId: reward.id
      })
      alert('Reward redeemed successfully!')
    } catch (err) {
      alert('Failed to redeem reward')
    }
  }

  return (
    <div className="app-screen">
      <div className="reward-card">
        <h2>{balance.availablePoints.toLocaleString()}</h2>
        <p>Available Points</p>
        <p className="tier-badge">{balance.tier} Tier</p>
      </div>

      <div className="app-content">
        <div className="section-header">
          <h3>Available Rewards</h3>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="rewards-grid" style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12}}>
            {rewards.map(reward => (
              <div key={reward.id} className="reward-item" style={{
                background: 'white',
                padding: 16,
                borderRadius: 12,
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}>
                <h4>{reward.name}</h4>
                <p style={{color: '#028090', fontWeight: 'bold', margin: '8px 0'}}>
                  {reward.pointsRequired} points
                </p>
                <button
                  className="btn-primary"
                  style={{width: '100%'}}
                  onClick={() => redeemReward(reward)}
                  disabled={balance.availablePoints < reward.pointsRequired}
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        )}
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
        <div className="nav-item active">
          <div className="nav-icon">🎁</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">👤</div>
        </div>
      </div>
    </div>
  )
}
