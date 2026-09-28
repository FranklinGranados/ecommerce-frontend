'use client';

import { useCart } from '@/context/CartContext';
import { checkout } from './actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  async function handleCheckout() {
    setLoading(true);
    try {
      const result = await checkout(
        items.map((i) => ({ product_id: i.product_id, quantity: i.quantity }))
      );
      clearCart();
      router.push(`/checkout/success?orderId=${result.orderId}&amount=${result.amount}`);
    } catch (error: any) {
      alert('Error al procesar la compra: ' + error.message);
    } finally {
      setLoading(false);
    }
  }
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <p>Tu carrito está vacío.</p>
        <Link href="/products" className="text-blue-600 underline">Ver catálogo</Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>

      {items.map((item) => (
        <div key={item.product_id} className="flex justify-between items-center border-b py-3">
          <div>
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-500">Cantidad: {item.quantity} × ${item.price}</p>
          </div>
          <button onClick={() => removeItem(item.product_id)} className="text-red-600 text-sm">
            Quitar
          </button>
        </div>
      ))}

      <p className="mt-4 text-xl font-bold">Total: ${total.toFixed(2)}</p>

      <button onClick={clearCart} className="mt-2 text-sm text-gray-500 underline">
        Vaciar carrito
      </button>

        <button onClick={handleCheckout} disabled={loading} className="mt-4 bg-green-600 text-white rounded p-2 font-semibold w-full">
            {loading ? 'Procesando...' : 'Pagar ahora'}
        </button>
    </div>
  );
}