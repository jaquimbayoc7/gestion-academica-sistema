/**
 * @file reportes/page.tsx
 * @description HU-15: Reporte de Matriculados por Asignatura.
 *
 * Flujo:
 *   1. Carga la lista de asignaciones docente (select con info de asignatura + período).
 *   2. Al seleccionar una asignación, llama a:
 *      - GET /api/v1/asignaciones-docente/:id/reporte → lista de estudiantes con calificaciones y stats
 *   3. Muestra tarjetas de estadísticas (total, aprobados, reprobados, sin calificar).
 *   4. Muestra tabla con todos los estudiantes matriculados y sus notas.
 */
'use client';

import { useEffect, useState } from 'react';
import { asignacionesDocenteService } from '@/services/asignaciones-docente.service';
import type { AsignacionDocente } from '@/interfaces/asignacion-docente.interface';

export default function ReportesPage() {
  const [asignaciones, setAsignaciones] = useState<AsignacionDocente[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const [reporte, setReporte] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    asignacionesDocenteService.findAll()
      .then(setAsignaciones)
      .catch(() => setError('Error al cargar asignaciones'));
  }, []);

  const handleSelect = async (id: number) => {
    setSelectedId(id);
    setReporte(null);
    setError('');
    if (!id) return;
    setLoading(true);
    try {
      const data = await asignacionesDocenteService.reporte(id);
      setReporte(data);
    } catch {
      setError('Error al cargar el reporte');
    } finally {
      setLoading(false);
    }
  };

  const colorNota = (nota: number | null) => {
    if (nota == null) return 'text-gray-400';
    return nota >= 3 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Reporte de Matriculados</h1>
        <p className="text-sm text-gray-500 mt-1">HU-15 · Consulta el listado de estudiantes matriculados por asignatura con estadísticas</p>
      </div>

      {/* Selector de asignación */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Asignación (Asignatura / Docente / Período)</label>
        <select
          className="w-full max-w-2xl border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value ? Number(e.target.value) : 0)}
        >
          <option value="">-- Selecciona una asignación --</option>
          {asignaciones.map((a) => (
            <option key={a.id} value={a.id}>
              {a.asignatura?.nombre} — {a.docente?.nombres} {a.docente?.apellidos} — {a.periodoAcademico?.nombre}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading && <p className="text-gray-500 text-sm">Cargando reporte...</p>}

      {reporte && (
        <>
          {/* Info de la asignación */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-base font-semibold text-gray-800">
              {reporte.asignatura} <span className="text-gray-400 text-sm">({reporte.codigo})</span>
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Docente: <span className="font-medium text-gray-700">{reporte.docente}</span>
              {' · '}Período: <span className="font-medium text-gray-700">{reporte.periodo}</span>
              {' · '}Créditos: <span className="font-medium text-gray-700">{reporte.creditos}</span>
            </p>
          </div>

          {/* Tarjetas de estadísticas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <p className="text-xs text-blue-600 uppercase font-medium">Total Matriculados</p>
              <p className="text-3xl font-bold text-blue-700 mt-1">{reporte.totalMatriculados}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-xs text-green-600 uppercase font-medium">Aprobados</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{reporte.aprobados}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-xs text-red-600 uppercase font-medium">Reprobados</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{reporte.reprobados}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-500 uppercase font-medium">Sin Calificar</p>
              <p className="text-3xl font-bold text-gray-600 mt-1">{reporte.sinCalificar}</p>
            </div>
          </div>

          {/* Barra de progreso aprobación */}
          {reporte.totalMatriculados > 0 && reporte.aprobados + reporte.reprobados > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Tasa de aprobación: {Math.round((reporte.aprobados / (reporte.aprobados + reporte.reprobados)) * 100)}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all"
                  style={{ width: `${Math.round((reporte.aprobados / (reporte.aprobados + reporte.reprobados)) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Tabla de estudiantes */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200">
              <h3 className="font-semibold text-gray-700 text-sm">Estudiantes Matriculados</h3>
            </div>
            {reporte.estudiantes.length === 0 ? (
              <p className="text-gray-400 text-sm p-4">No hay estudiantes matriculados en esta asignación.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2 text-left">Código</th>
                      <th className="px-4 py-2 text-left">Estudiante</th>
                      <th className="px-4 py-2 text-center">Nota 1</th>
                      <th className="px-4 py-2 text-center">Nota 2</th>
                      <th className="px-4 py-2 text-center">Nota 3</th>
                      <th className="px-4 py-2 text-center">Definitiva</th>
                      <th className="px-4 py-2 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {reporte.estudiantes.map((est: any) => (
                      <tr key={est.matriculaId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-500 text-xs font-mono">{est.codigoEstudiantil}</td>
                        <td className="px-4 py-3 font-medium text-gray-800">{est.nombres} {est.apellidos}</td>
                        <td className={`px-4 py-3 text-center ${colorNota(est.nota1)}`}>{est.nota1 ?? '—'}</td>
                        <td className={`px-4 py-3 text-center ${colorNota(est.nota2)}`}>{est.nota2 ?? '—'}</td>
                        <td className={`px-4 py-3 text-center ${colorNota(est.nota3)}`}>{est.nota3 ?? '—'}</td>
                        <td className={`px-4 py-3 text-center text-base ${colorNota(est.notaDefinitiva)}`}>
                          {est.notaDefinitiva != null ? est.notaDefinitiva.toFixed(2) : '—'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            est.estado === 'Aprobado' ? 'bg-green-100 text-green-700' :
                            est.estado === 'Reprobado' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {est.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
