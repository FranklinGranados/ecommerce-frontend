# Ecommerce Frontend - Modulo 4

Frontend en Next.js 16 (App Router) + TypeScript que consume la API REST de e-commerce
(Laravel 12 + JWT + Stripe): https://github.com/FranklinGranados/ecommerce-api

## Requisitos previos

- Node.js 20+
- La API de Laravel corriendo (Docker: `laravel_app`, `laravel_nginx` en puerto 8000, `mysql-kodigo`)

## Configuracion

1. Clonar este repo y entrar a la carpeta
2. `npm install`
3. Copiar `.env.example` a `.env.local` y ajustar si es necesario:
API_URL=http://localhost:8000/api
4. `npm run dev`
5. Abrir `http://localhost:3000`

## Rutas implementadas

| Ruta | Descripcion | Protegida |
|---|---|---|
| `/login` | Login y registro | No |
| `/products` | Catalogo de productos (con Suspense) | No |
| `/products/[id]` | Detalle de producto + agregar al carrito | No |
| `/cart` | Carrito de compras | No |
| `/checkout/success` | Confirmacion de pago | No |
| `/history` | Historial de compras | Si (requiere login) |

## Flujo de autenticacion

El token JWT de Laravel se guarda en una cookie httpOnly (`auth_token`), manejada
por Server Actions (`src/app/login/actions.ts`). El navegador nunca llama directo
a la API de Laravel - todas las peticiones pasan por el servidor de Next.js
(`src/lib/api.ts`), que lee la cookie y agrega el header `Authorization: Bearer <token>`.

## Rendimiento y resiliencia

- `Suspense` en `/products` para streaming de la lista de productos
- `loading.tsx` en `/products` y `/history`
- `error.tsx` en `/products`, `/history` y `/checkout`
- `revalidatePath('/history')` tras crear una orden y procesar el pago
- Middleware (`src/middleware.ts`) protege `/history`

## Evidencia

Ver carpeta `/screenshots`: capturas de Swagger,
flujo completo de compra, y reporte de Lighthouse.