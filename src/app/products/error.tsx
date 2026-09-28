'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto p-6 mt-20 text-center">
      <h2 className="text-xl font-bold text-red-600">Algo salió mal</h2>
      <p className="text-sm text-gray-500 mt-2">{error.message}</p>
      <button onClick={() => reset()} className="mt-4 bg-blue-600 text-white rounded p-2 px-4">
        Reintentar
      </button>
    </div>
  );
}