'use client';

import { useDispatch } from 'react-redux';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { Product } from '@/types/product';
import { addToCart } from '@/lib/store/cartSlice';
import { Button } from './ui/button';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const truncateDescription = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price);
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-muted-foreground">
          {truncateDescription(product.description)}
        </p>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            {product.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">
            {formatPrice(product.price, product.currency)}
          </span>
          <Button
            onClick={() => dispatch(addToCart(product))}
            size="sm"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}