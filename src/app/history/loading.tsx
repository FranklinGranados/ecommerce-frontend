export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="h-8 w-56 bg-gray-200 rounded animate-pulse mb-6" />
      {[...Array(3)].map((_, i) => (
        <div key={i} className="border rounded-xl p-4 h-24 bg-gray-100 animate-pulse mb-4" />
      ))}
    </div>
  );
}
