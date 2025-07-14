import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleLogin = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.match(/.+@.+\..+/)) errs.email = 'Valid email required';
    if (!password) errs.password = 'Password is required';

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('authUser', JSON.stringify(user));
      toast.success('✅ Login successful!');
      navigate('/');
    } else {
      toast.error('❌ Invalid email or password');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <input
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <button className="btn btn-primary w-100" type="submit">
          Login
        </button>

        {/* ✅ Forgot Password Link */}
        <div className="mt-3 text-center">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
