import { Suspense } from 'react';
import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  is_available: boolean;
  category: string;
  stock: number;
}

async function ProductList() {
  const products: Product[] = await fetchAPI('/products');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="border rounded-xl p-4 hover:shadow-md transition"
        >
          <h2 className="font-bold text-lg">{product.name}</h2>
          <p className="text-sm text-gray-500">{product.category}</p>
          <p className="mt-2 font-semibold">${product.price}</p>
          <p className="text-xs text-gray-400">Stock: {product.stock}</p>
        </Link>
      ))}
    </div>
  );
}

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="border rounded-xl p-4 h-32 bg-gray-100 animate-pulse" />
      ))}
    </div>
  );
}

export default function ProductsPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Catálogo</h1>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
}