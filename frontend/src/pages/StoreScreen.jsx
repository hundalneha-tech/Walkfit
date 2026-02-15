import { useState, useEffect } from 'react'
import { APIClient } from '../services/api'
import '../styles/store.css'

export default function StoreScreen({ user }) {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [showCart, setShowCart] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Fetch products from API
    setLoading(true)
    APIClient.get('/shopify/products?first=20')
      .then(response => {
        // Transform Shopify products
        const transformed = response.data.edges.map(edge => ({
          id: edge.node.id,
          title: edge.node.title,
          price: edge.node.priceRange.minVariantPrice.amount,
          image: '👟',
          icon: '👟'
        }))
        setProducts(transformed)
      })
      .catch(err => console.error('Failed to fetch products:', err))
      .finally(() => setLoading(false))
  }, [])

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id)
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
    alert(`✅ ${product.title} added to cart!`)
  }

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <div className="app-screen">
      <div className="store-header">
        <h2>WalkFit Store</h2>
        <p>Premium fitness gear delivered to your door</p>
      </div>

      <div className="app-content">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">{product.icon}</div>
                <div className="product-info">
                  <h3 className="product-name">{product.title}</h3>
                  <p className="product-price">${product.price}</p>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    🛒
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Button */}
      <button
        className="cart-icon"
        onClick={() => setShowCart(true)}
        style={{
          position: 'fixed',
          bottom: 100,
          right: 20,
          zIndex: 100,
          fontSize: '32px',
          background: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 60,
          height: 60,
          cursor: 'pointer'
        }}
      >
        🛒
        {cart.length > 0 && (
          <span style={{
            position: 'absolute',
            top: -5,
            right: -5,
            background: '#f5576c',
            color: 'white',
            borderRadius: '50%',
            width: 24,
            height: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 'bold'
          }}>
            {cart.length}
          </span>
        )}
      </button>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="modal-overlay" onClick={() => setShowCart(false)}>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Shopping Cart</h2>
              <button
                className="modal-close"
                onClick={() => setShowCart(false)}
              >
                ✕
              </button>
            </div>

            {cart.length > 0 ? (
              <>
                {cart.map(item => (
                  <div key={item.id} className="cart-item" style={{
                    padding: '12px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div>
                      <h4>{item.title}</h4>
                      <p>${item.price} × {item.quantity}</p>
                    </div>
                    <p style={{fontWeight: 'bold'}}>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
                <div style={{padding: '16px', borderTop: '2px solid #eee'}}>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                    <span>Subtotal:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '12px'}}>
                    <span>Shipping:</span>
                    <span>FREE</span>
                  </div>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 'bold'}}>
                    <span>Total:</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <button className="btn-primary" style={{width: '100%', marginTop: 16}}>
                  Proceed to Checkout
                </button>
              </>
            ) : (
              <p style={{textAlign: 'center', padding: '40px 20px'}}>Your cart is empty</p>
            )}
          </div>
        </div>
      )}

      <div className="bottom-nav">
        <div className="nav-item">
          <div className="nav-icon">🏠</div>
          <div className="nav-label">Home</div>
        </div>
        <div className="nav-item">
          <div className="nav-icon">📊</div>
          <div className="nav-label">Stats</div>
        </div>
        <div className="nav-item active">
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
