
import React from 'react';
import './Banner.css';

function Banner() {
  return (
    <div className="custom-banner d-flex align-items-center justify-content-center text-center text-white">
      <div className="banner-content">
        <h1 className="animate-heading">Welcome to <span className="highlight">Amazon Clone</span> 🛍️</h1>
        <p className="animate-subtext">Discover top deals & the best products today!</p>
        <a href="#products" className="btn btn-warning px-4 py-2 mt-3 shadow">
  Start Shopping
</a>

      </div>
    </div>
  );
}

export default Banner;
