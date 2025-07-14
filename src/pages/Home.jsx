import { useEffect, useState, useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';

function Home() {
  const { products, fetchProducts } = useContext(ProductContext);
  const { cart } = useContext(CartContext);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 5000]);

  const maxPrice = Math.max(...products.map((p) => p.price), 1000);
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  useEffect(() => {
    fetchProducts();
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const filteredProducts = products.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === 'All' || p.category === category;
    const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchSearch && matchCategory && matchPrice;
  });

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Banner />

      {/* 👇👇 Add id="products" here 👇👇 */}
      <div id="products" className="container mt-4">
        <h3 className="mb-4">📦 Featured Products</h3>

        {/* 🔍 Filters */}
        <div className="row mb-3">
          <div className="col-md-4 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="priceRange" className="form-label">
              Price: ₹{priceRange[0]} – ₹{priceRange[1]}
            </label>
            <input
              type="range"
              min="0"
              max={maxPrice}
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
              className="form-range"
              id="priceRange"
            />
          </div>
        </div>

        {/* 🛍 Product Grid */}
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="col-md-4 col-sm-6 mb-4">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p>No products match your criteria.</p>
          )}
        </div>

        {/* 🛒 Floating Cart Button */}
        <Link to="/cart" className="floating-cart btn btn-warning shadow">
          🛒 {cart.length}
        </Link>
      </div>
    </>
  );
}

export default Home;
