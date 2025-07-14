import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const getStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { label: 'Weak', color: 'danger' };
    if (score === 2) return { label: 'Fair', color: 'warning' };
    if (score >= 3) return { label: 'Strong', color: 'success' };
    return { label: '', color: '' };
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const errs = {};
    if (!email.match(/.+@.+\..+/)) errs.email = 'Valid email required';
    if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (!name) errs.name = 'Name is required';

    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
      toast.error('Email already exists!');
      return;
    }

    const newUser = { email, password, name };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    toast.success('✅ Registered successfully! Please login.');
    navigate('/login');
  };

  const strength = getStrength(password);

  return (
    <div className="container mt-4" style={{ maxWidth: '500px' }}>
      <h3>Register</h3>
      <form onSubmit={handleRegister}>
        <div className="mb-3">
          <input
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

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
          {password && (
            <div className={`mt-1 text-${strength.color}`}>
              Password Strength: {strength.label}
            </div>
          )}
        </div>

        <button className="btn btn-success w-100" type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
