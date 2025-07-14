import { render, screen } from '@testing-library/react';
import ProductCard from './ProductCard';
import { BrowserRouter } from 'react-router-dom';

test('renders product card with title and price', () => {
  const prod = { id:1, title:'Test Product', price:100, image:'a.jpg' };
  render(<BrowserRouter><ProductCard product={prod} /></BrowserRouter>);
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  expect(screen.getByText(/\$100/)).toBeInTheDocument();
});
