import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner-border text-primary" role="status"></div>
      <p>Loading...</p>
    </div>
  );
}

export default Loader;
