/**
 * @file historial/page.tsx
 * @description HU-14 + HU-16: Historial Académico y Promedio Acumulado del Estudiante.
 *
 * Flujo:
 *   1. Carga la lista de estudiantes (select).
 *   2. Al seleccionar un estudiante, llama a:
 *      - GET /api/v1/estudiantes/:id/historial → matrículas agrupadas por período
 *      - GET /api/v1/estudiantes/:id/promedio  → promedio acumulado ponderado
 *   3. Muestra el historial por período con tabla de materias y notas.
 *   4. Muestra tarjeta de promedio acumulado (HU-16).
 */
'use client';

import { useEffect, useState } from 'react';
import { estudiantesService } from '@/services/estudiantes.service';
import type { Estudiante } from '@/interfaces/estudiante.interface';

export default function HistorialPage() {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const [historial, setHistorial] = useState<any>(null);
  const [promedio, setPromedio] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    estudiantesService.findAll().then(setEstudiantes).catch(() => setError('Error al cargar estudiantes'));
  }, []);

  const handleSelect = async (id: number) => {
    setSelectedId(id);
    setHistorial(null);
    setPromedio(null);
    setError('');
    if (!id) return;
    setLoading(true);
    try {
      const [h, p] = await Promise.all([
        estudiantesService.historial(id),
        estudiantesService.promedioAcumulado(id),
      ]);
      setHistorial(h);
      setPromedio(p);
    } catch {
      setError('Error al cargar el historial');
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
        <h1 className="text-2xl font-bold text-gray-800">Historial Académico</h1>
        <p className="text-sm text-gray-500 mt-1">HU-14 · Consulta el historial de materias y notas de un estudiante agrupado por período</p>
      </div>

      {/* Selector de estudiante */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Seleccionar Estudiante</label>
        <select
          className="w-full max-w-md border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedId}
          onChange={(e) => handleSelect(e.target.value ? Number(e.target.value) : 0)}
        >
          <option value="">-- Selecciona un estudiante --</option>
          {estudiantes.map((e) => (
            <option key={e.id} value={e.id}>
              {e.codigoEstudiantil} — {e.nombres} {e.apellidos}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}
      {loading && <p className="text-gray-500 text-sm">Cargando historial...</p>}

      {/* HU-16: Tarjeta de Promedio Acumulado */}
      {promedio && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-xs text-blue-600 uppercase font-medium">Promedio Acumulado</p>
            <p className={`text-3xl font-bold mt-1 ${promedio.promedioAcumulado != null ? (promedio.promedioAcumulado >= 3 ? 'text-green-600' : 'text-red-600') : 'text-gray-400'}`}>
              {promedio.promedioAcumulado != null ? promedio.promedioAcumulado.toFixed(2) : 'N/A'}
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
            <p className="text-xs text-gray-500 uppercase font-medium">Créditos Acumulados</p>
            <p className="text-3xl font-bold text-gray-700 mt-1">{promedio.totalCreditosAprobados}</p>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
            <p className="text-xs text-green-600 uppercase font-medium">Aprobadas</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{promedio.asignaturasAprobadas}</p>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
            <p className="text-xs text-red-600 uppercase font-medium">Reprobadas</p>
            <p className="text-3xl font-bold text-red-600 mt-1">{promedio.asignaturasReprobadas}</p>
          </div>
        </div>
      )}

      {/* HU-14: Historial por períodos */}
      {historial && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">
            {historial.nombres} {historial.apellidos} — {historial.programa}
          </h2>

          {historial.periodos.length === 0 && (
            <p className="text-gray-400 text-sm">Este estudiante no tiene matrículas registradas.</p>
          )}

          {historial.periodos.map((periodo: any) => (
            <div key={periodo.periodoId} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                <h3 className="font-semibold text-gray-700 text-sm">📅 {periodo.periodoNombre}</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-2 text-left">Asignatura</th>
                      <th className="px-4 py-2 text-left">Docente</th>
                      <th className="px-4 py-2 text-center">Créditos</th>
                      <th className="px-4 py-2 text-center">Nota 1</th>
                      <th className="px-4 py-2 text-center">Nota 2</th>
                      <th className="px-4 py-2 text-center">Nota 3</th>
                      <th className="px-4 py-2 text-center">Definitiva</th>
                      <th className="px-4 py-2 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {periodo.materias.map((m: any) => (
                      <tr key={m.matriculaId} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {m.asignatura} <span className="text-gray-400 text-xs">({m.codigo})</span>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{m.docente}</td>
                        <td className="px-4 py-3 text-center text-gray-600">{m.creditos}</td>
                        <td className={`px-4 py-3 text-center ${colorNota(m.nota1)}`}>{m.nota1 ?? '—'}</td>
                        <td className={`px-4 py-3 text-center ${colorNota(m.nota2)}`}>{m.nota2 ?? '—'}</td>
                        <td className={`px-4 py-3 text-center ${colorNota(m.nota3)}`}>{m.nota3 ?? '—'}</td>
                        <td className={`px-4 py-3 text-center text-base ${colorNota(m.notaDefinitiva)}`}>
                          {m.notaDefinitiva != null ? m.notaDefinitiva.toFixed(2) : '—'}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            m.estado === 'Aprobado' ? 'bg-green-100 text-green-700' :
                            m.estado === 'Reprobado' ? 'bg-red-100 text-red-700' :
                            'bg-gray-100 text-gray-500'
                          }`}>
                            {m.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
