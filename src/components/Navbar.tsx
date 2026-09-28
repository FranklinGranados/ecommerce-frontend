'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="flex justify-between items-center p-4 border-b">
      <Link href="/products" className="font-bold text-lg">
        Mi Tienda
      </Link>
      <div className="flex gap-4 items-center">
        <Link href="/products">Catálogo</Link>
        <Link href="/history">Historial</Link>
        <Link href="/cart" className="relative">
          Carrito
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </Link>
        <Link href="/login">Login</Link>
      </div>
    </nav>
  );
}