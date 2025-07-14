import React from 'react';
import './Profile.css';

function Profile() {
  const user = JSON.parse(localStorage.getItem('authUser'));

  if (!user) return <p className="text-center mt-4">User not logged in.</p>;

  return (
    <div className="container mt-4">
      <h3>Welcome, {user.username} 👋</h3>
      <p>Email: {user.email}</p>
      <p>Account Type: Standard User</p>
    </div>
  );
}

export default Profile;
