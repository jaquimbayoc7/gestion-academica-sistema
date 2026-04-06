/**
 * @file dashboard/page.tsx
 * @description Página principal del dashboard. Es un Server Component
 * (no tiene 'use client') porque no necesita interactividad del lado
 * del cliente. Muestra un mensaje de bienvenida estático.
 *
 * Ruta: /dashboard (ruta por defecto dentro del grupo (dashboard)).
 */
export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-500">Bienvenido al Sistema de Gestión Académica.</p>
      {/* TODO: Sprint 4 — tarjetas de resumen */}
    </div>
  );
}
