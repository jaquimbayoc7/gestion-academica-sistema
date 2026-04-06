/**
 * PÁGINA DE INICIO (/)
 *
 * Cuando el usuario accede a la raíz del sitio (http://localhost:3000),
 * se redirige automáticamente al dashboard.
 *
 * redirect() es una función de Next.js que hace una redirección del lado del servidor
 * (HTTP 307), sin que el usuario vea un flash de página vacía.
 */
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/dashboard');
}
