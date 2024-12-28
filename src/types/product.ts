export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  rating: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
}