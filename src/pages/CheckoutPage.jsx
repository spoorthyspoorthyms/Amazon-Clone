import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CheckoutPage.css';

function CheckoutPage() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const user = JSON.parse(localStorage.getItem('authUser'));
  const total = cart.reduce((a, i) => a + i.price * i.qty, 0);

  const validate = (fieldValues = form) => {
    const e = {};
    if (!fieldValues.name) e.name = 'Name required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)) e.email = 'Valid email required';
    if (!fieldValues.address) e.address = 'Address required';
    if (!fieldValues.city) e.city = 'City required';
    if (!/^\d{5,6}$/.test(fieldValues.zip)) e.zip = 'ZIP code must be 5 or 6 digits';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    const fieldErrors = validate(updatedForm);
    setErrors(fieldErrors);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const newOrder = {
      email: user?.email,
      billingInfo: form,
      paymentMethod,
      items: cart,
      total,
      status: 'Pending',
      timestamp: Date.now(), 
    };

    localStorage.setItem('orders', JSON.stringify([...allOrders, newOrder]));
    clearCart();
    toast.success('✅ Order placed successfully!');
    setSubmitted(true);
    setTimeout(() => navigate('/my-orders'), 2000);
  };

  if (submitted) {
    return (
      <div className="container mt-5 text-center">
        <h3>🎉 Thank you for your order!</h3>
        <p>Redirecting to <strong>My Orders</strong>...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4 row">
      
      <div className="col-md-6">
        <h3>Billing Info</h3>
        <form onSubmit={onSubmit} noValidate>
          {['name', 'email', 'address', 'city', 'zip'].map((f) => (
            <div className="mb-3" key={f}>
              <input
                name={f}
                type={f === 'email' ? 'email' : 'text'}
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                value={form[f]}
                onChange={handleChange}
                className={`form-control ${errors[f] ? 'is-invalid' : form[f] ? 'is-valid' : ''}`}
              />
              {errors[f] && <div className="invalid-feedback">{errors[f]}</div>}
            </div>
          ))}

          
          <div className="mb-3">
            <label className="form-label">Payment Method</label>
            <select
              className="form-select"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="UPI">UPI</option>
              <option value="Card">Credit/Debit Card</option>
              <option value="COD">Cash on Delivery</option>
            </select>
          </div>

          <button className="btn btn-success w-100">Place Order</button>
        </form>
      </div>

     
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <ul className="list-group">
          {cart.map((i) => (
            <li key={i.id} className="list-group-item d-flex justify-content-between">
              {i.title} × {i.qty} <span>₹{(i.price * i.qty).toFixed(2)}</span>
            </li>
          ))}
          <li className="list-group-item d-flex justify-content-between fw-bold">
            Total <span>₹{total.toFixed(2)}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default CheckoutPage;
