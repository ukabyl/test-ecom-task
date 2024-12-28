import { Metadata } from 'next';
import ProductList from '@/components/product-list';
import { ProductsResponse } from '@/types/product';

export const metadata: Metadata = {
  title: 'Test',
  description: 'Test description',
};

async function getProducts(): Promise<ProductsResponse> {
  const res = await fetch('http://localhost:5000/db', {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

export default async function Home() {
  const { products } = await getProducts();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Our Products</h1>
      <ProductList initialProducts={products} />
    </div>
  );
}