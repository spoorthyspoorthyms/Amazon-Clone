// src/pages/CartPage.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import './CartPage.css';

function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem('authUser'));
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

 
  if (!cart.length) {
    return (
      <main className="container mt-5 text-center">
        <h4 className="text-muted">🛒 Your cart is empty</h4>
        <Link to="/" className="btn btn-outline-primary mt-3">
          🚀 Start Shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="container mt-4">
      <h3 className="mb-4">🛍️ Your Cart</h3>

      {cart.map((item) => (
        <div key={item.id} className="d-flex justify-content-between py-2 border-bottom">
          <div>
            <strong>{item.title}</strong>
            <div>₹{item.price} × {item.qty}</div>
          </div>
          <div>
            <input
              type="number"
              min="1"
              value={item.qty}
              onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
              className="form-control form-control-sm"
              style={{ width: '60px' }}
            />
            <button
              className="btn btn-sm btn-outline-danger mt-2"
              onClick={() => removeFromCart(item.id)}
            >
               Remove
            </button>
          </div>
        </div>
      ))}

      <h5 className="text-end mt-4">Total: ₹{total.toFixed(2)}</h5>

     
      <div className="text-end mt-4">
        {user ? (
          <Link to="/checkout" className="btn btn-success">
            ✅ Proceed to Checkout
          </Link>
        ) : (
          <div className="text-center mt-4">
            <p className="text-danger fw-bold">🔐 Please login or register to continue</p>
            <Link to="/login" className="btn btn-primary me-2">Login</Link>
            <Link to="/register" className="btn btn-secondary">Register</Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default CartPage;
