import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ProductCard from '@/components/product-card';
import cartReducer from '@/lib/store/cartSlice';
import { expect, it, describe } from "@jest/globals";

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  currency: 'USD',
  image: 'https://example.com/image.jpg',
  rating: 4.5,
};

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  it('truncates long descriptions', () => {
    const longDescription = 'A'.repeat(150);
    const truncatedProduct = { ...mockProduct, description: longDescription };

    render(
      <Provider store={store}>
        <ProductCard product={truncatedProduct} />
      </Provider>
    );

    const displayedDescription = screen.getByText(/A+\.\.\./);
    expect(displayedDescription.textContent?.length).toBeLessThanOrEqual(103); // 100 chars + '...'
  });

  it('adds product to cart when button is clicked', () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    const state = store.getState();
    expect(state.cart.items).toHaveLength(1);
    expect(state.cart.items[0].id).toBe(mockProduct.id);
  });
});