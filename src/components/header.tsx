'use client';

import { useSelector } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { RootState } from '@/lib/store/store';

export default function Header() {
  const { items, totalPrice } = useSelector((state: RootState) => state.cart);
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <header className="text-blue-500 sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 ">
      <div className="container m-auto flex h-14 items-center justify-between">
        <div className="font-bold text-xl">Super Test App Store</div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span>{itemCount} items</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </header>
  );
}