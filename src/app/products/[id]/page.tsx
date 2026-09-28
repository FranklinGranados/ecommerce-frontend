import { fetchAPI } from '@/lib/api';
import { notFound } from 'next/navigation';
import AddToCartButton from './AddToCartButton';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  is_available: boolean;
  category: string;
  stock: number;
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let product: Product;
  try {
    product = await fetchAPI(`/products/${id}`);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-500">{product.category}</p>
      <p className="mt-4">{product.description}</p>
      <p className="mt-4 text-xl font-semibold">${product.price}</p>
      <p className="text-sm text-gray-400">Stock disponible: {product.stock}</p>

      <AddToCartButton
            productId={product.id}
            name={product.name}
            price={parseFloat(product.price)}
            isAvailable={product.is_available}
            stock={product.stock}
        />
    </div>
  );
}