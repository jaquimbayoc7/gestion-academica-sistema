/**
 * @file asignaturas/page.tsx
 * @description Página CRUD para gestión de asignaturas.
 *
 * Diferencia clave con otras páginas:
 *   - Tiene un <select> dinámico que lista los programas académicos
 *     cargados desde programasService.getAll().
 *   - El campo programaAcademicoId vincula la asignatura a un programa.
 *
 * Campos: nombre, codigo, creditos, semestre, programaAcademicoId (select).
 * @see {@link asignaturasService} y {@link programasService}
 */
'use client';

import { useEffect, useState } from 'react';
import { asignaturasService } from '@/services/asignaturas.service';
import { programasService } from '@/services/programas.service';
import type { Asignatura } from '@/interfaces/asignatura.interface';
import type { ProgramaAcademico } from '@/interfaces/programa-academico.interface';

export default function AsignaturasPage() {
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [programas, setProgramas] = useState<ProgramaAcademico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ nombre: '', codigo: '', creditos: 1, programaAcademicoId: 0 });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const [a, p] = await Promise.all([asignaturasService.findAll(), programasService.findAll()]);
      setAsignaturas(a); setProgramas(p);
    } catch { setError('Error al cargar datos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ nombre: '', codigo: '', creditos: 1, programaAcademicoId: 0 }); setEditingId(null); setShowForm(false); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      if (editingId) await asignaturasService.update(editingId, form);
      else await asignaturasService.create(form);
      resetForm(); load();
    } catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleEdit = (a: Asignatura) => {
    setForm({ nombre: a.nombre, codigo: a.codigo, creditos: a.creditos, programaAcademicoId: a.programaAcademicoId });
    setEditingId(a.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta asignatura?')) return;
    try { await asignaturasService.remove(id); load(); }
    catch (err: any) { setError(err.message || 'Error al eliminar'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asignaturas</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Nueva Asignatura</button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
          <input required placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Código" value={form.codigo} onChange={e => setForm({ ...form, codigo: e.target.value })} className="border rounded p-2" />
          <input required type="number" min={1} placeholder="Créditos" value={form.creditos} onChange={e => setForm({ ...form, creditos: +e.target.value })} className="border rounded p-2" />
          <select required value={form.programaAcademicoId} onChange={e => setForm({ ...form, programaAcademicoId: +e.target.value })} className="border rounded p-2">
            <option value={0} disabled>Seleccionar Programa</option>
            {programas.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">{editingId ? 'Actualizar' : 'Crear'}</button>
            <button type="button" onClick={resetForm} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">Cancelar</button>
          </div>
        </form>
      )}

      {loading ? <p>Cargando...</p> : (
        <table className="w-full bg-white rounded shadow">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Nombre</th>
              <th className="text-left p-3">Código</th>
              <th className="text-left p-3">Créditos</th>
              <th className="text-left p-3">Programa</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaturas.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.id}</td>
                <td className="p-3">{a.nombre}</td>
                <td className="p-3">{a.codigo}</td>
                <td className="p-3">{a.creditos}</td>
                <td className="p-3">{a.programaAcademico?.nombre || '-'}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(a)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {asignaturas.length === 0 && <tr><td colSpan={6} className="p-3 text-center text-gray-500">No hay asignaturas registradas</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
