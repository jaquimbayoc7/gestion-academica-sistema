/**
 * ============================================================
 * PÁGINA CRUD DE ESTUDIANTES (/estudiantes)
 * ============================================================
 *
 * Esta página es el ejemplo más completo del patrón CRUD en el frontend.
 * TODAS las demás páginas (docentes, programas, etc.) siguen el mismo patrón.
 *
 * ¿QUÉ HACE?
 *   Permite Crear, Leer, Actualizar y Eliminar estudiantes desde el navegador.
 *   Se comunica con el backend via HTTP usando el servicio estudiantesService.
 *
 * ARQUITECTURA DEL COMPONENTE:
 *   ┌─────────────────────────────────────────────────────┐
 *   │  ESTADOS (useState)                                 │
 *   │   estudiantes[]  → Lista de estudiantes del backend │
 *   │   programas[]    → Lista de programas (para select) │
 *   │   loading        → Indicador de carga               │
 *   │   showForm       → Mostrar/ocultar formulario       │
 *   │   editingId      → ID del estudiante en edición     │
 *   │   form           → Datos del formulario             │
 *   │   error          → Mensaje de error (si hay)        │
 *   └─────────────────────────────────────────────────────┘
 *
 * FLUJO DE OPERACIONES:
 *
 *   CARGAR (al montar el componente):
 *     useEffect → load() → estudiantesService.findAll() → setEstudiantes(data)
 *
 *   CREAR:
 *     1. Click "Nuevo" → setShowForm(true) → muestra formulario vacío
 *     2. Llenar campos → cambios van a `form` via onChange
 *     3. Click "Crear" → handleSubmit() → estudiantesService.create(form)
 *     4. Si OK → resetForm() + load() → recarga la tabla
 *     5. Si error → setError(mensaje) → muestra alerta roja
 *
 *   EDITAR:
 *     1. Click "Editar" → handleEdit(e) → carga datos en el form + setEditingId
 *     2. Modificar campos → cambios en `form`
 *     3. Click "Actualizar" → handleSubmit() detecta editingId → usa update()
 *     4. Si OK → resetForm() + load()
 *
 *   ELIMINAR:
 *     1. Click "Eliminar" → confirm() → si acepta, handleDelete(id)
 *     2. estudiantesService.remove(id) → si OK, recarga tabla
 *     3. Si tiene matrículas, el backend retorna error y se muestra en rojo
 *
 * DIRECTIVA 'use client':
 *   Necesaria porque usamos useState, useEffect (hooks de React).
 *   Next.js ejecuta este componente en el navegador, no en el servidor.
 *
 * PATRÓN DE FORMULARIO DUAL (crear/editar):
 *   El mismo formulario se usa para crear Y editar.
 *   La diferencia la determina `editingId`:
 *     - editingId === null → Modo crear (POST)
 *     - editingId === 5    → Modo editar (PUT /estudiantes/5)
 */
'use client';

import { useEffect, useState } from 'react';
import { estudiantesService } from '@/services/estudiantes.service';
import { programasService } from '@/services/programas.service';
import type { Estudiante } from '@/interfaces/estudiante.interface';
import type { ProgramaAcademico } from '@/interfaces/programa-academico.interface';

export default function EstudiantesPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [programas, setProgramas] = useState<ProgramaAcademico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    nombres: '', apellidos: '', codigoEstudiantil: '', documentoIdentidad: '',
    correoInstitucional: '', fechaNacimiento: '', programaAcademicoId: 0,
  });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const [est, prog] = await Promise.all([estudiantesService.findAll(), programasService.findAll()]);
      setEstudiantes(est);
      setProgramas(prog);
    } catch { setError('Error al cargar datos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ nombres: '', apellidos: '', codigoEstudiantil: '', documentoIdentidad: '', correoInstitucional: '', fechaNacimiento: '', programaAcademicoId: 0 });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await estudiantesService.update(editingId, form);
      } else {
        await estudiantesService.create(form);
      }
      resetForm();
      load();
    } catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleEdit = (e: Estudiante) => {
    setForm({
      nombres: e.nombres, apellidos: e.apellidos, codigoEstudiantil: e.codigoEstudiantil,
      documentoIdentidad: e.documentoIdentidad, correoInstitucional: e.correoInstitucional,
      fechaNacimiento: e.fechaNacimiento.split('T')[0], programaAcademicoId: e.programaAcademicoId,
    });
    setEditingId(e.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este estudiante?')) return;
    try { await estudiantesService.remove(id); load(); }
    catch (err: any) { setError(err.message || 'Error al eliminar'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Estudiantes</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Nuevo Estudiante</button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
          <input required placeholder="Nombres" value={form.nombres} onChange={e => setForm({ ...form, nombres: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Apellidos" value={form.apellidos} onChange={e => setForm({ ...form, apellidos: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Código Estudiantil" value={form.codigoEstudiantil} onChange={e => setForm({ ...form, codigoEstudiantil: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Documento de Identidad" value={form.documentoIdentidad} onChange={e => setForm({ ...form, documentoIdentidad: e.target.value })} className="border rounded p-2" />
          <input required type="email" placeholder="Correo Institucional" value={form.correoInstitucional} onChange={e => setForm({ ...form, correoInstitucional: e.target.value })} className="border rounded p-2" />
          <input required type="date" placeholder="Fecha Nacimiento" value={form.fechaNacimiento} onChange={e => setForm({ ...form, fechaNacimiento: e.target.value })} className="border rounded p-2" />
          <select required value={form.programaAcademicoId} onChange={e => setForm({ ...form, programaAcademicoId: +e.target.value })} className="border rounded p-2 col-span-2">
            <option value={0} disabled>Seleccionar Programa</option>
            {programas.map(p => <option key={p.id} value={p.id}>{p.nombre} ({p.codigo})</option>)}
          </select>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editingId ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
          </div>
        </form>
      )}

      {loading ? <p>Cargando...</p> : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded shadow">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Nombres</th>
                <th className="text-left p-3">Apellidos</th>
                <th className="text-left p-3">Código</th>
                <th className="text-left p-3">Documento</th>
                <th className="text-left p-3">Correo</th>
                <th className="text-left p-3">Programa</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {estudiantes.map(e => (
                <tr key={e.id} className="border-t">
                  <td className="p-3">{e.id}</td>
                  <td className="p-3">{e.nombres}</td>
                  <td className="p-3">{e.apellidos}</td>
                  <td className="p-3">{e.codigoEstudiantil}</td>
                  <td className="p-3">{e.documentoIdentidad}</td>
                  <td className="p-3">{e.correoInstitucional}</td>
                  <td className="p-3">{e.programaAcademico?.nombre || '-'}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(e)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(e.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
              {estudiantes.length === 0 && <tr><td colSpan={8} className="p-3 text-center text-gray-500">No hay estudiantes registrados</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
