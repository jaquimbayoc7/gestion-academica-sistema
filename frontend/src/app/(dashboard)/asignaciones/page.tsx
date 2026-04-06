'use client';

import { useEffect, useState } from 'react';
import { asignacionesDocenteService } from '@/services/asignaciones-docente.service';
import { docentesService } from '@/services/docentes.service';
import { asignaturasService } from '@/services/asignaturas.service';
import { periodosService } from '@/services/periodos.service';
import type { AsignacionDocente } from '@/interfaces/asignacion-docente.interface';
import type { Docente } from '@/interfaces/docente.interface';
import type { Asignatura } from '@/interfaces/asignatura.interface';
import type { PeriodoAcademico } from '@/interfaces/periodo-academico.interface';

export default function AsignacionesPage() {
  const [asignaciones, setAsignaciones] = useState<AsignacionDocente[]>([]);
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [asignaturas, setAsignaturas] = useState<Asignatura[]>([]);
  const [periodos, setPeriodos] = useState<PeriodoAcademico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ docenteId: 0, asignaturaId: 0, periodoAcademicoId: 0 });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const [a, d, asig, p] = await Promise.all([
        asignacionesDocenteService.findAll(), docentesService.findAll(),
        asignaturasService.findAll(), periodosService.findAll(),
      ]);
      setAsignaciones(a); setDocentes(d); setAsignaturas(asig); setPeriodos(p);
    } catch { setError('Error al cargar datos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ docenteId: 0, asignaturaId: 0, periodoAcademicoId: 0 }); setEditingId(null); setShowForm(false); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try {
      if (editingId) await asignacionesDocenteService.update(editingId, form);
      else await asignacionesDocenteService.create(form);
      resetForm(); load();
    } catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleEdit = (a: AsignacionDocente) => {
    setForm({ docenteId: a.docenteId, asignaturaId: a.asignaturaId, periodoAcademicoId: a.periodoAcademicoId });
    setEditingId(a.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta asignación?')) return;
    try { await asignacionesDocenteService.remove(id); load(); }
    catch (err: any) { setError(err.message || 'Error al eliminar'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Asignaciones Docente</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Nueva Asignación</button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-3 gap-4">
          <select required value={form.docenteId} onChange={e => setForm({ ...form, docenteId: +e.target.value })} className="border rounded p-2">
            <option value={0} disabled>Seleccionar Docente</option>
            {docentes.map(d => <option key={d.id} value={d.id}>{d.nombres} {d.apellidos}</option>)}
          </select>
          <select required value={form.asignaturaId} onChange={e => setForm({ ...form, asignaturaId: +e.target.value })} className="border rounded p-2">
            <option value={0} disabled>Seleccionar Asignatura</option>
            {asignaturas.map(a => <option key={a.id} value={a.id}>{a.nombre} ({a.codigo})</option>)}
          </select>
          <select required value={form.periodoAcademicoId} onChange={e => setForm({ ...form, periodoAcademicoId: +e.target.value })} className="border rounded p-2">
            <option value={0} disabled>Seleccionar Período</option>
            {periodos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
          <div className="col-span-3 flex gap-2">
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
              <th className="text-left p-3">Docente</th>
              <th className="text-left p-3">Asignatura</th>
              <th className="text-left p-3">Período</th>
              <th className="text-left p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {asignaciones.map(a => (
              <tr key={a.id} className="border-t">
                <td className="p-3">{a.id}</td>
                <td className="p-3">{a.docente ? `${a.docente.nombres} ${a.docente.apellidos}` : '-'}</td>
                <td className="p-3">{a.asignatura ? `${a.asignatura.nombre} (${a.asignatura.codigo})` : '-'}</td>
                <td className="p-3">{a.periodoAcademico?.nombre || '-'}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => handleEdit(a)} className="text-blue-600 hover:underline">Editar</button>
                  <button onClick={() => handleDelete(a.id)} className="text-red-600 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
            {asignaciones.length === 0 && <tr><td colSpan={5} className="p-3 text-center text-gray-500">No hay asignaciones registradas</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  );
}
