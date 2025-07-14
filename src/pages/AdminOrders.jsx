import React from 'react';

function AdminOrders() {
  const allOrders = JSON.parse(localStorage.getItem('orders')) || [];

  return (
    <div className="container mt-4">
      <h3>Admin Panel – All Orders</h3>
      {allOrders.length === 0 && <p>No orders yet.</p>}

      {allOrders.map((order, idx) => (
        <div key={idx} className="card mb-3">
          <div className="card-body">
            <h5>Order #{idx + 1}</h5>
            <p><strong>Email:</strong> {order.email}</p>
            <p><strong>Date:</strong> {new Date(order.timestamp).toLocaleString()}</p>
            <p><strong>Status:</strong> {order.status || 'Pending'}</p>
            <ul className="list-group mb-2">
              {order.items.map((item) => (
                <li key={item.id} className="list-group-item d-flex justify-content-between">
                  {item.title} × {item.qty} <span>₹{(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p><strong>Total:</strong> ₹{order.total.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminOrders;
