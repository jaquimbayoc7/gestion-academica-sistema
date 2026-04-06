'use client';

import { useEffect, useState } from 'react';
import { matriculasService } from '@/services/matriculas.service';
import { estudiantesService } from '@/services/estudiantes.service';
import { asignacionesDocenteService } from '@/services/asignaciones-docente.service';
import type { Matricula } from '@/interfaces/matricula.interface';
import type { Estudiante } from '@/interfaces/estudiante.interface';
import type { AsignacionDocente } from '@/interfaces/asignacion-docente.interface';

export default function MatriculasPage() {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [asignaciones, setAsignaciones] = useState<AsignacionDocente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ estudianteId: 0, asignacionDocenteId: 0 });
  const [error, setError] = useState('');

  const load = async () => {
    try {
      setLoading(true);
      const [m, e, a] = await Promise.all([
        matriculasService.findAll(), estudiantesService.findAll(), asignacionesDocenteService.findAll(),
      ]);
      setMatriculas(m); setEstudiantes(e); setAsignaciones(a);
    } catch { setError('Error al cargar datos'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => { setForm({ estudianteId: 0, asignacionDocenteId: 0 }); setShowForm(false); setError(''); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    try { await matriculasService.create(form); resetForm(); load(); }
    catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar esta matrícula?')) return;
    try { await matriculasService.remove(id); load(); }
    catch (err: any) { setError(err.message || 'Error al eliminar'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Matrículas</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Nueva Matrícula</button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
          <select required value={form.estudianteId} onChange={e => setForm({ ...form, estudianteId: +e.target.value })} className="border rounded p-2">
            <option value={0} disabled>Seleccionar Estudiante</option>
            {estudiantes.map(e => <option key={e.id} value={e.id}>{e.nombres} {e.apellidos} ({e.codigoEstudiantil})</option>)}
          </select>
          <select required value={form.asignacionDocenteId} onChange={e => setForm({ ...form, asignacionDocenteId: +e.target.value })} className="border rounded p-2">
            <option value={0} disabled>Seleccionar Asignación</option>
            {asignaciones.map(a => (
              <option key={a.id} value={a.id}>
                {a.asignatura?.nombre || 'Asignatura'} - {a.docente ? `${a.docente.nombres} ${a.docente.apellidos}` : 'Docente'} ({a.periodoAcademico?.nombre || ''})
              </option>
            ))}
          </select>
          <div className="col-span-2 flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Matricular</button>
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
                <th className="text-left p-3">Docente</th>
                <th className="text-left p-3">Período</th>
                <th className="text-left p-3">Fecha</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {matriculas.map(m => (
                <tr key={m.id} className="border-t">
                  <td className="p-3">{m.id}</td>
                  <td className="p-3">{m.estudiante ? `${m.estudiante.nombres} ${m.estudiante.apellidos}` : '-'}</td>
                  <td className="p-3">{m.asignacionDocente?.asignatura?.nombre || '-'}</td>
                  <td className="p-3">{m.asignacionDocente?.docente ? `${m.asignacionDocente.docente.nombres} ${m.asignacionDocente.docente.apellidos}` : '-'}</td>
                  <td className="p-3">{m.asignacionDocente?.periodoAcademico?.nombre || '-'}</td>
                  <td className="p-3">{new Date(m.fechaInscripcion).toLocaleDateString()}</td>
                  <td className="p-3">
                    <button onClick={() => handleDelete(m.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
              {matriculas.length === 0 && <tr><td colSpan={7} className="p-3 text-center text-gray-500">No hay matrículas registradas</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
