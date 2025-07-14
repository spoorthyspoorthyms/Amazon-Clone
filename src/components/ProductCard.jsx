
import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ product }) {
  return (
    <div className="card product-card h-100">
      <img
        src={product.image}
        alt={product.title}
        className="product-image"
      />
      <div className="product-info">
        <h6 className="product-title">{product.title}</h6>
        <p className="product-price">₹{product.price}</p>
        <Link to={`/product/${product.id}`} className="view-button">
          View
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
