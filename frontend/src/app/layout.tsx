/**
 * ============================================================
 * LAYOUT RAÍZ DE LA APLICACIÓN (Root Layout)
 * ============================================================
 *
 * Este es el layout principal de Next.js. TODAS las páginas se
 * renderizan dentro de este componente.
 *
 * ESTRUCTURA HTML:
 *   <html lang="es">     → Idioma español para accesibilidad
 *   <body>               → Estilos globales (fondo gris, texto oscuro)
 *     {children}         → Aquí se insertan las páginas
 *   </body>
 *   </html>
 *
 * metadata: Define el título y descripción que aparecen en la pestaña del navegador.
 */
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Sistema de Gestión Académica',
  description: 'Administración académica — CORHUILA',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
