/**
 * @file programas/page.tsx
 * @description Página CRUD para gestión de programas académicos.
 *
 * Campos del formulario:
 *   - nombre             → nombre del programa (ej. "Ingeniería de Sistemas")
 *   - codigo             → código único del programa (ej. "ISI-001")
 *   - facultad           → facultad a la que pertenece
 *   - duracionSemestres  → número entero de semestres
 *
 * Sigue el mismo patrón CRUD que estudiantes/page.tsx.
 * @see {@link programasService} para las llamadas HTTP.
 */
'use client';

import { useEffect, useState } from 'react';
import { programasService } from '@/services/programas.service';
import type { ProgramaAcademico } from '@/interfaces/programa-academico.interface';

export default function ProgramasPage() {
  const [programas, setProgramas] = useState<ProgramaAcademico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ nombre: '', codigo: '', facultad: '', duracionSemestres: 1 });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      setProgramas(await programasService.findAll());
    } catch { setError('Error al cargar programas'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ nombre: '', codigo: '', facultad: '', duracionSemestres: 1 });
    setEditingId(null);
    setShowForm(false);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await programasService.update(editingId, form);
      } else {
        await programasService.create(form);
      }
      resetForm();
      load();
    } catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleEdit = (p: ProgramaAcademico) => {
    setForm({ nombre: p.nombre, codigo: p.codigo, facultad: p.facultad, duracionSemestres: p.duracionSemestres });
    setEditingId(p.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este programa?')) return;
    try { await programasService.remove(id); load(); }
    catch (err: any) { setError(err.message || 'Error al eliminar'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Programas Académicos</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Nuevo Programa
        </button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
          <input required placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Código" value={form.codigo} onChange={e => setForm({ ...form, codigo: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Facultad" value={form.facultad} onChange={e => setForm({ ...form, facultad: e.target.value })} className="border rounded p-2" />
          <input required type="number" min={1} placeholder="Duración (semestres)" value={form.duracionSemestres} onChange={e => setForm({ ...form, duracionSemestres: +e.target.value })} className="border rounded p-2" />
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
              <th className="text-left p-3">Facultad</th>
              <th className="text-left p-3">Semestres</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {programas.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.nombre}</td>
                <td className="p-3">{p.codigo}</td>
                <td className="p-3">{p.facultad}</td>
                <td className="p-3">{p.duracionSemestres}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {programas.length === 0 && <tr><td colSpan={6} className="p-3 text-center text-gray-500">No hay programas registrados</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
