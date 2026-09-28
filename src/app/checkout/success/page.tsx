export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; amount?: string }>;
}) {
  const { orderId, amount } = await searchParams;

  return (
    <div className="max-w-md mx-auto p-6 mt-20 text-center border rounded-xl">
      <h1 className="text-2xl font-bold text-green-600">¡Pago exitoso! ✓</h1>
      <p className="mt-4">Orden #{orderId}</p>
      <p className="text-xl font-semibold">Total pagado: ${amount}</p>
      <a href="/history" className="mt-6 inline-block text-blue-600 underline">
        Ver mi historial de compras
      </a>
    </div>
  );
}