import React from 'react';
import './SearchFilter.css';

function SearchFilter({ search, setSearch, category, setCategory }) {
  return (
    <div className="row mb-4">
      <div className="col-md-6 mb-2">
        <input type="text"
          className="form-control"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="col-md-6 mb-2">
        <select className="form-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Footwear">Footwear</option>
          <option value="Fashion">Fashion</option>
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
