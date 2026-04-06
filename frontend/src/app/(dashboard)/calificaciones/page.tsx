/**
 * @file calificaciones/page.tsx
 * @description Página CRUD para gestión de calificaciones.
 *
 * Diferencias clave:
 *   - Select dinámico de matrículas (muestra "Estudiante – Asignatura").
 *   - Tres campos numéricos: nota1, nota2, nota3 (rango 0.0 – 5.0).
 *   - El backend calcula automáticamente:
 *       notaFinal = nota1 × 0.30 + nota2 × 0.30 + nota3 × 0.40
 *   - La tabla muestra la nota final con color:
 *       verde (≥ 3.0 = aprobado) o rojo (< 3.0 = reprobado).
 *   - Incluye badge "Aprobado" / "Reprobado".
 *
 * @see {@link calificacionesService}, {@link matriculasService}
 */
'use client';

import { useEffect, useState } from 'react';
import { calificacionesService } from '@/services/calificaciones.service';
import { matriculasService } from '@/services/matriculas.service';
import type { Calificacion } from '@/interfaces/calificacion.interface';
import type { Matricula } from '@/interfaces/matricula.interface';

export default function CalificacionesPage() {
  const [calificaciones, setCalificaciones] = useState<Calificacion[]>([]);
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ matriculaId: 0, nota1: '', nota2: '', nota3: '' });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const [c, m] = await Promise.all([calificacionesService.findAll(), matriculasService.findAll()]);
      setCalificaciones(c); setMatriculas(m);
    } catch { setError('Error al cargar datos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ matriculaId: 0, nota1: '', nota2: '', nota3: '' }); setEditingId(null); setShowForm(false); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const data: any = {};
    if (!editingId) data.matriculaId = form.matriculaId;
    if (form.nota1 !== '') data.nota1 = +form.nota1;
    if (form.nota2 !== '') data.nota2 = +form.nota2;
    if (form.nota3 !== '') data.nota3 = +form.nota3;
    try {
      if (editingId) await calificacionesService.update(editingId, data);
      else await calificacionesService.create(data);
      resetForm(); load();
    } catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleEdit = (c: Calificacion) => {
    setForm({ matriculaId: c.matriculaId, nota1: c.nota1?.toString() ?? '', nota2: c.nota2?.toString() ?? '', nota3: c.nota3?.toString() ?? '' });
    setEditingId(c.id); setShowForm(true);
  };

  // Matrículas sin calificación (para crear nuevas)
  const matriculasSinCalf = matriculas.filter(m => !calificaciones.some(c => c.matriculaId === m.id));

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Calificaciones</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Nueva Calificación</button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-4 gap-4">
          {!editingId && (
            <select required value={form.matriculaId} onChange={e => setForm({ ...form, matriculaId: +e.target.value })} className="border rounded p-2 col-span-4">
              <option value={0} disabled>Seleccionar Matrícula</option>
              {matriculasSinCalf.map(m => (
                <option key={m.id} value={m.id}>
                  {m.estudiante ? `${m.estudiante.nombres} ${m.estudiante.apellidos}` : `Matrícula #${m.id}`}
                  {m.asignacionDocente?.asignatura ? ` — ${m.asignacionDocente.asignatura.nombre}` : ''}
                </option>
              ))}
            </select>
          )}
          <input type="number" step="0.01" min="0" max="5" placeholder="Nota 1 (30%)" value={form.nota1} onChange={e => setForm({ ...form, nota1: e.target.value })} className="border rounded p-2" />
          <input type="number" step="0.01" min="0" max="5" placeholder="Nota 2 (30%)" value={form.nota2} onChange={e => setForm({ ...form, nota2: e.target.value })} className="border rounded p-2" />
          <input type="number" step="0.01" min="0" max="5" placeholder="Nota 3 (40%)" value={form.nota3} onChange={e => setForm({ ...form, nota3: e.target.value })} className="border rounded p-2" />
          <div className="flex gap-2 items-start">
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
                <th className="text-left p-3">Estudiante</th>
                <th className="text-left p-3">Asignatura</th>
                <th className="text-left p-3">Nota 1 (30%)</th>
                <th className="text-left p-3">Nota 2 (30%)</th>
                <th className="text-left p-3">Nota 3 (40%)</th>
                <th className="text-left p-3">Definitiva</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {calificaciones.map(c => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.matricula?.estudiante ? `${c.matricula.estudiante.nombres} ${c.matricula.estudiante.apellidos}` : '-'}</td>
                  <td className="p-3">{c.matricula?.asignacionDocente?.asignatura?.nombre || '-'}</td>
                  <td className="p-3">{c.nota1 ?? '-'}</td>
                  <td className="p-3">{c.nota2 ?? '-'}</td>
                  <td className="p-3">{c.nota3 ?? '-'}</td>
                  <td className="p-3">
                    {c.notaDefinitiva != null ? (
                      <span className={`font-bold ${c.notaDefinitiva >= 3 ? 'text-green-600' : 'text-red-600'}`}>
                        {c.notaDefinitiva}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(c)} className="text-blue-600 hover:underline">Editar</button>
                  </td>
                </tr>
              ))}
              {calificaciones.length === 0 && <tr><td colSpan={8} className="p-3 text-center text-gray-500">No hay calificaciones registradas</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
