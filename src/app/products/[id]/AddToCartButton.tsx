'use client';

import { useCart } from '@/context/CartContext';
import { useState } from 'react';

interface Props {
  productId: number;
  name: string;
  price: number;
  isAvailable: boolean;
  stock: number;
}

export default function AddToCartButton({ productId, name, price, isAvailable, stock }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleClick() {
    addItem({ product_id: productId, name, price });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <button
      onClick={handleClick}
      disabled={!isAvailable || stock === 0}
      className="mt-6 bg-blue-600 text-white rounded p-2 font-semibold disabled:bg-gray-300"
    >
      {added ? '¡Agregado! ✓' : 'Agregar al carrito'}
    </button>
  );
}