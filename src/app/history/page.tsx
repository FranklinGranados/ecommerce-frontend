import { fetchAPI } from '@/lib/api';

interface OrderItem {
  id: number;
  product_id: number;
  amount: number;
  unit_price: string;
  subtotal: string;
  product: { name: string };
}

interface Order {
  id: number;
  total: string;
  status: string;
  created_at: string;
  orderItems: OrderItem[];
}

export default async function HistoryPage() {
  const orders: Order[] = await fetchAPI('/orders/history');

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Historial de compras</h1>

      {orders.length === 0 && <p>Todavía no tenés compras.</p>}

      {orders.map((order) => (
        <div key={order.id} className="border rounded-xl p-4 mb-4">
          <div className="flex justify-between">
            <p className="font-semibold">Orden #{order.id}</p>
            <span
              className={`text-sm px-2 py-1 rounded ${
                order.status === 'completed'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-yellow-100 text-yellow-700'
              }`}
            >
              {order.status}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleDateString()}
          </p>
          <ul className="mt-2 text-sm">
            {order.orderItems?.map((item) => (
              <li key={item.id}>
                {item.product?.name} x{item.amount} — ${item.subtotal}
              </li>
            ))}
          </ul>
          <p className="mt-2 font-bold">Total: ${order.total}</p>
        </div>
      ))}
    </div>
  );
}