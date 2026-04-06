/**
 * ============================================================
 * UTILIDADES DE API — Cliente HTTP del Frontend
 * ============================================================
 *
 * Este archivo centraliza TODAS las llamadas HTTP al backend.
 * Cada función corresponde a un método HTTP (GET, POST, PUT, DELETE).
 *
 * ¿POR QUÉ CENTRALIZAR?
 *   1. Evita repetir la URL base en cada componente
 *   2. Maneja el formato de respuesta en un solo lugar
 *   3. Facilita agregar headers (como tokens JWT en el futuro)
 *
 * FORMATO DE RESPUESTA DEL BACKEND:
 *   El backend SIEMPRE retorna: { statusCode, message, data }
 *   Estas funciones extraen solo el campo `data` (json.data)
 *   para que los componentes trabajen directamente con los datos.
 *
 * FLUJO DE UNA LLAMADA:
 *   1. El componente llama al Service     → estudiantesService.findAll()
 *   2. El Service llama a apiGet          → apiGet<Estudiante[]>('/estudiantes')
 *   3. apiGet hace fetch al backend       → GET http://localhost:3001/api/v1/estudiantes
 *   4. El backend retorna JSON            → { statusCode: 200, data: [...] }
 *   5. apiGet extrae json.data            → retorna el array de estudiantes
 *   6. El componente recibe los datos     → setEstudiantes(data)
 *
 * VARIABLE DE ENTORNO:
 *   NEXT_PUBLIC_API_URL = http://localhost:3001  (definida en docker-compose.yml)
 *   Se usa para que el frontend sepa dónde está el backend.
 */

// URL base del backend (sin /api/v1, se agrega en cada función)
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

/**
 * GET: Obtener datos del backend.
 * @param path - Ruta del endpoint (ej: '/estudiantes', '/docentes/1')
 * @returns Los datos extraídos del campo `data` de la respuesta
 *
 * Ejemplo: const estudiantes = await apiGet<Estudiante[]>('/estudiantes');
 */
export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  const json = await res.json();
  return json.data as T;  // Extrae solo el campo "data" de { statusCode, message, data }
}

/**
 * POST: Crear un nuevo recurso en el backend.
 * @param path - Ruta del endpoint (ej: '/estudiantes')
 * @param body - Datos a enviar (se serializan a JSON automáticamente)
 *
 * Ejemplo: const nuevo = await apiPost<Estudiante>('/estudiantes', { nombres: 'Juan', ... });
 */
export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}` , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },  // Indica que enviamos JSON
    body: JSON.stringify(body),                        // Convierte el objeto JS a string JSON
  });
  if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

/**
 * PUT: Actualizar un recurso existente.
 * @param path - Ruta con ID (ej: '/estudiantes/1')
 * @param body - Datos a actualizar (puede ser parcial)
 *
 * Ejemplo: await apiPut<Estudiante>('/estudiantes/1', { nombres: 'Juan Carlos' });
 */
export async function apiPut<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}` , {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PUT ${path} failed: ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

/**
 * DELETE: Eliminar un recurso.
 * @param path - Ruta con ID (ej: '/estudiantes/1')
 *
 * Ejemplo: await apiDelete('/estudiantes/1');
 */
export async function apiDelete<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/api/v1${path}`, { method: 'DELETE' });
  if (!res.ok) throw new Error(`DELETE ${path} failed: ${res.status}`);
  const json = await res.json();
  return json.data as T;
}
