import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import products from '../data/products';
import { CartContext } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const prod = products.find(p => p.id === +id);
  const { addToCart } = useContext(CartContext);
  const [pulsing, setPulsing] = useState(false);

  if (!prod) return <p>Product not found</p>;

  const handleAdd = () => {
    addToCart(prod);
    toast.success('🛒 Added to cart!');
    setPulsing(true);
    setTimeout(() => setPulsing(false), 400);
  };

  const related = products
    .filter(p => p.category === prod.category && p.id !== prod.id)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{prod.title} – My Amazon Clone</title>
        <meta name="description" content={prod.description} />
      </Helmet>

      <div className="container mt-4 row">
        <div className="col-md-6">
          <img
            src={prod.image}
            alt={prod.title}
            className="img-fluid mb-3"
            loading="lazy"
          />
        </div>
        <div className="col-md-6">
          <h3>{prod.title}</h3>
          <div className="mb-2">
            <span className="badge bg-success me-2">In Stock</span>
            <span className="text-warning">⭐ {prod.rating || '4.3'}</span>
          </div>
          <p className="fw-bold fs-5 text-primary">₹{prod.price.toFixed(2)}</p>
          <p>{prod.description}</p>
          <button
            className={`btn btn-primary ${pulsing ? 'pulse' : ''}`}
            onClick={handleAdd}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {related.length > 0 && (
        <div className="container mt-5">
          <h5>🛍 Related Products</h5>
          <div className="row">
            {related.map(p => (
              <div key={p.id} className="col-md-4 mb-3">
                <div className="card h-100 shadow-sm">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="card-img-top"
                    style={{ height: '150px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h6>{p.title}</h6>
                    <p className="mb-1">₹{p.price}</p>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => {
                        addToCart(p);
                        toast.success('🛒 Added to cart!');
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductDetail;
