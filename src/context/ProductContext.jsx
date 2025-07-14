import React, { createContext, useState } from 'react';
import productsData from '../data/products'; 


export const ProductContext = createContext();


export function ProductProvider({ children }) {
  const [products, setProducts] = useState(productsData);


  const fetchProducts = () => {
    setProducts(productsData);
  };

  return (
    <ProductContext.Provider value={{ products, fetchProducts }}>
      {children}
    </ProductContext.Provider>
  );
}
