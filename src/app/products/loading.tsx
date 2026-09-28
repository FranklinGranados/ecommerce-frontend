export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="h-8 w-40 bg-gray-200 rounded animate-pulse mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="border rounded-xl p-4 h-32 bg-gray-100 animate-pulse" />
        ))}
      </div>
    </div>
  );
}
