import { login, register } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="max-w-sm mx-auto mt-20 p-6 border rounded-xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Mi Tienda</h1>

      {params.error && <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{params.error}</p>}
      {params.message && <p className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm">{params.message}</p>}

      <form className="flex flex-col gap-3">
        <input type="text" name="name" placeholder="Nombre (solo para registro)" className="border rounded p-2" />
        <input type="email" name="email" placeholder="Correo electronico" required className="border rounded p-2" />
        <input type="password" name="password" placeholder="Contrasena" required className="border rounded p-2" />

        <button formAction={login} className="bg-blue-600 text-white rounded p-2 font-semibold">
          Iniciar sesion
        </button>
        <button formAction={register} className="bg-gray-200 text-orange-500 rounded p-2 font-semibold">
          Registrarme
        </button>
      </form>
    </div>
  );
}