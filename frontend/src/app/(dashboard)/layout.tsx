/**
 * ============================================================
 * LAYOUT DEL DASHBOARD (Grupo de rutas)
 * ============================================================
 *
 * Este layout envuelve TODAS las páginas dentro de la carpeta (dashboard)/.
 * La carpeta (dashboard) usa paréntesis → es un "Route Group" de Next.js.
 * Esto significa que NO agrega "/dashboard" a la URL, solo agrupa el layout.
 *
 * ESTRUCTURA:
 *   ┌──────────────────────────────────────────┐
 *   │  Sidebar  │         Main Content         │
 *   │  (240px)  │  (flex-1, scroll vertical)   │
 *   │           │                              │
 *   │ Dashboard │  Aquí se renderizan las      │
 *   │ Estudiant.│  páginas de cada sección      │
 *   │ Docentes  │  (children)                  │
 *   │ ...       │                              │
 *   └──────────────────────────────────────────┘
 *
 * - flex h-screen: Ocupa toda la pantalla, layout horizontal
 * - Sidebar: Componente fijo a la izquierda (w-60 = 240px)
 * - main flex-1: Ocupa todo el espacio restante
 * - overflow-y-auto: Scroll vertical si el contenido es muy largo
 */
import type { Metadata } from 'next';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'Sistema de Gestión Académica',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
