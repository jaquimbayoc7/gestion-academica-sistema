/**
 * @file periodos/page.tsx
 * @description Página CRUD para gestión de períodos académicos.
 *
 * Diferencias clave:
 *   - Campos de fecha: fechaInicio y fechaFin (input type="date").
 *   - Checkbox "activo": al activar un período, el backend desactiva
 *     automáticamente todos los demás (solo uno activo a la vez).
 *   - Badge visual: muestra "Activo" (verde) o "Inactivo" (rojo) en la tabla.
 *
 * Campos: nombre, fechaInicio, fechaFin, activo (boolean).
 * @see {@link periodosService}
 */
'use client';

import { useEffect, useState } from 'react';
import { periodosService } from '@/services/periodos.service';
import type { PeriodoAcademico } from '@/interfaces/periodo-academico.interface';

export default function PeriodosPage() {
  const [periodos, setPeriodos] = useState<PeriodoAcademico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ nombre: '', fechaInicio: '', fechaFin: '', activo: false });
  const [error, setError] = useState('');

  const load = async () => {
    try { setLoading(true); setPeriodos(await periodosService.findAll()); }
    catch { setError('Error al cargar períodos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ nombre: '', fechaInicio: '', fechaFin: '', activo: false }); setEditingId(null); setShowForm(false); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      if (editingId) await periodosService.update(editingId, form);
      else await periodosService.create(form);
      resetForm(); load();
    } catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleEdit = (p: PeriodoAcademico) => {
    setForm({ nombre: p.nombre, fechaInicio: p.fechaInicio.split('T')[0], fechaFin: p.fechaFin.split('T')[0], activo: p.activo });
    setEditingId(p.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este período?')) return;
    try { await periodosService.remove(id); load(); }
    catch (err: any) { setError(err.message || 'Error al eliminar'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Períodos Académicos</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Nuevo Período</button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
          <input required placeholder="Nombre (ej: 2026-1)" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} className="border rounded p-2" />
          <label className="flex items-center gap-2 p-2">
            <input type="checkbox" checked={form.activo} onChange={e => setForm({ ...form, activo: e.target.checked })} />
            Activo
          </label>
          <input required type="date" value={form.fechaInicio} onChange={e => setForm({ ...form, fechaInicio: e.target.value })} className="border rounded p-2" />
          <input required type="date" value={form.fechaFin} onChange={e => setForm({ ...form, fechaFin: e.target.value })} className="border rounded p-2" />
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
              <th className="text-left p-3">Inicio</th>
              <th className="text-left p-3">Fin</th>
              <th className="text-left p-3">Estado</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {periodos.map(p => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.id}</td>
                <td className="p-3">{p.nombre}</td>
                <td className="p-3">{new Date(p.fechaInicio).toLocaleDateString()}</td>
                <td className="p-3">{new Date(p.fechaFin).toLocaleDateString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${p.activo ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {p.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {periodos.length === 0 && <tr><td colSpan={6} className="p-3 text-center text-gray-500">No hay períodos registrados</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
