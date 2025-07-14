import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function MyOrders() {
  const user = JSON.parse(localStorage.getItem('authUser'));
  const [status, setStatus] = useState('All');
  const [orders, setOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    const userOrders = storedOrders.filter((o) => o.email === user?.email);
    setAllOrders(storedOrders);
    setOrders(userOrders);
  }, [user]);

  const updateAndSyncOrders = (updatedOrders) => {
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setAllOrders(updatedOrders);
    const userOrders = updatedOrders.filter((o) => o.email === user?.email);
    setOrders(userOrders);
  };

  const handleStatusChange = (idx, newStatus) => {
    const updatedOrders = [...allOrders];
    const target = orders[idx];
    const orderIndex = allOrders.findIndex(
      (o) => o.timestamp === target.timestamp && o.email === target.email
    );

    if (orderIndex !== -1) {
      updatedOrders[orderIndex].status = newStatus;
      updateAndSyncOrders(updatedOrders);
      toast.success(`Status updated to ${newStatus}`);
    }
  };

  const handleCancelOrder = (idx) => {
    const updatedOrders = [...allOrders];
    const target = orders[idx];
    const orderIndex = allOrders.findIndex(
      (o) => o.timestamp === target.timestamp && o.email === target.email
    );

    if (orderIndex !== -1) {
      updatedOrders.splice(orderIndex, 1);
      updateAndSyncOrders(updatedOrders);
      toast.warning(`Order #${idx + 1} cancelled.`);
    }
  };

  const filtered = orders.filter(
    (o) => status === 'All' || o.status === status
  );

  return (
    <div className="container mt-4">
      <h3 className="mb-3">🧾 My Orders</h3>

      <div className="mb-4 row align-items-center">
        <label className="col-sm-2 col-form-label">Filter by Status:</label>
        <div className="col-sm-4">
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="alert alert-warning">No orders match this status.</div>
      )}

      {filtered.map((order, idx) => (
        <div key={idx} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Order #{idx + 1}</h5>
              <span className="badge bg-secondary">
                {new Date(order.timestamp).toLocaleString()}
              </span>
            </div>

            <p><strong>Payment Method:</strong> {order.paymentMethod || 'N/A'}</p>

            <div className="d-flex align-items-center mb-2">
              <strong className="me-2">Status:</strong>
              <select
                className="form-select form-select-sm w-auto"
                value={order.status || 'Pending'}
                onChange={(e) => handleStatusChange(idx, e.target.value)}
              >
                <option value="Pending">Pending</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>

            <ul className="list-group mb-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{item.title} × {item.qty}</span>
                  <span>₹{(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center">
              <strong>Total: ₹{order.total.toFixed(2)}</strong>
              {order.status === 'Pending' && (
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleCancelOrder(idx)}
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
