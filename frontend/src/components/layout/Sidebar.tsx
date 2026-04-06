/**
 * ============================================================
 * COMPONENTE SIDEBAR (Barra de Navegación Lateral)
 * ============================================================
 *
 * Muestra el menú de navegación lateral con enlaces a cada sección.
 *
 * FUNCIONAMIENTO:
 *   1. Define un array `navItems` con las rutas y etiquetas del menú
 *   2. Usa `usePathname()` de Next.js para saber la ruta actual
 *   3. Compara cada ruta del menú con la ruta actual para resaltar la activa
 *   4. Aplica clases de Tailwind CSS diferentes según si está activa o no:
 *      - Activa: fondo azul claro + texto azul (bg-blue-50 text-blue-700)
 *      - Inactiva: texto gris + hover gris (text-gray-600 hover:bg-gray-100)
 *
 * DIRECTIVA 'use client':
 *   Es obligatoria porque usePathname() usa APIs del navegador (hooks de React).
 *   Sin 'use client', Next.js intentaría ejecutar esto en el servidor y fallaría.
 *
 * ESTRUCTURA VISUAL:
 *   ┌──────────────────┐
 *   │ Gestión Académica │  ← Título
 *   ├──────────────────┤
 *   │  Dashboard        │
 *   │ ► Estudiantes     │  ← Sección activa (resaltada)
 *   │  Docentes         │
 *   │  Programas        │
 *   │  ...              │
 *   ├──────────────────┤
 *   │ CORHUILA 2026A    │  ← Pie de página
 *   └──────────────────┘
 */
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/estudiantes', label: 'Estudiantes' },
  { href: '/docentes', label: 'Docentes' },
  { href: '/programas', label: 'Programas' },
  { href: '/asignaturas', label: 'Asignaturas' },
  { href: '/periodos', label: 'Períodos' },
  { href: '/asignaciones', label: 'Asignaciones' },
  { href: '/matriculas', label: 'Matrículas' },
  { href: '/calificaciones', label: 'Calificaciones' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex flex-col">
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
          Gestión Académica
        </h2>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-400">
        Programación Web — CORHUILA 2026A
      </div>
    </aside>
  );
}
