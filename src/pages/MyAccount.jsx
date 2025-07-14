// src/pages/MyAccount.jsx
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function MyAccount() {
  const user = JSON.parse(localStorage.getItem('authUser')) || {};
  const [profile, setProfile] = useState({
    name: user.name || '',
    email: user.email || '',
    number: '',
    image: null,
    imageURL: '',
  });

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (savedProfile) {
      setProfile(savedProfile);
      setSaved(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfile((prev) => ({ ...prev, image: file, imageURL: reader.result }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    toast.success('✅ Profile saved successfully!');
    setSaved(true);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-3">👤 My Account</h3>

      {!saved ? (
        <div className="row">
          <div className="col-md-6">
            <label className="form-label">Name</label>
            <input type="text" name="name" className="form-control" value={profile.name} onChange={handleChange} />

            <label className="form-label mt-3">Email</label>
            <input type="email" name="email" className="form-control" value={profile.email} onChange={handleChange} />

            <label className="form-label mt-3">Phone Number</label>
            <input type="text" name="number" className="form-control" value={profile.number} onChange={handleChange} />

            <label className="form-label mt-3">Upload Profile Picture</label>
            <input type="file" className="form-control" onChange={handleImageChange} />

            <button className="btn btn-success mt-4" onClick={handleSave}>💾 Save Changes</button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          {profile.imageURL && (
            <img
              src={profile.imageURL}
              alt="Profile"
              className="rounded-circle mb-3"
              width="150"
              height="150"
              style={{ objectFit: 'cover' }}
            />
          )}
          <h5 className="mb-1">{profile.name}</h5>
          <p className="mb-1">{profile.email}</p>
          <p>{profile.number}</p>
          <button className="btn btn-secondary" onClick={() => setSaved(false)}>✏️ Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default MyAccount;
