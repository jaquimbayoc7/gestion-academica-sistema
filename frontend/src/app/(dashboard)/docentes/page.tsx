'use client';

import { useEffect, useState } from 'react';
import { docentesService } from '@/services/docentes.service';
import type { Docente } from '@/interfaces/docente.interface';

export default function DocentesPage() {
  const [docentes, setDocentes] = useState<Docente[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    nombres: '', apellidos: '', documentoIdentidad: '', tituloProfesional: '',
    especialidad: '', correoInstitucional: '', telefono: '',
  });
  const [error, setError] = useState('');

  const load = async () => {
    try { setLoading(true); setDocentes(await docentesService.findAll()); }
    catch { setError('Error al cargar docentes'); }
    finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const resetForm = () => {
    setForm({ nombres: '', apellidos: '', documentoIdentidad: '', tituloProfesional: '', especialidad: '', correoInstitucional: '', telefono: '' });
    setEditingId(null); setShowForm(false); setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError('');
    const data = { ...form, telefono: form.telefono || undefined };
    try {
      if (editingId) await docentesService.update(editingId, data);
      else await docentesService.create(data as any);
      resetForm(); load();
    } catch (err: any) { setError(err.message || 'Error al guardar'); }
  };

  const handleEdit = (d: Docente) => {
    setForm({
      nombres: d.nombres, apellidos: d.apellidos, documentoIdentidad: d.documentoIdentidad,
      tituloProfesional: d.tituloProfesional, especialidad: d.especialidad,
      correoInstitucional: d.correoInstitucional, telefono: d.telefono || '',
    });
    setEditingId(d.id); setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este docente?')) return;
    try { await docentesService.remove(id); load(); }
    catch (err: any) { setError(err.message || 'Error al eliminar'); }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Docentes</h1>
        <button onClick={() => { resetForm(); setShowForm(true); }} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">+ Nuevo Docente</button>
      </div>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4">{error}</div>}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 grid grid-cols-2 gap-4">
          <input required placeholder="Nombres" value={form.nombres} onChange={e => setForm({ ...form, nombres: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Apellidos" value={form.apellidos} onChange={e => setForm({ ...form, apellidos: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Documento de Identidad" value={form.documentoIdentidad} onChange={e => setForm({ ...form, documentoIdentidad: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Título Profesional" value={form.tituloProfesional} onChange={e => setForm({ ...form, tituloProfesional: e.target.value })} className="border rounded p-2" />
          <input required placeholder="Especialidad" value={form.especialidad} onChange={e => setForm({ ...form, especialidad: e.target.value })} className="border rounded p-2" />
          <input required type="email" placeholder="Correo Institucional" value={form.correoInstitucional} onChange={e => setForm({ ...form, correoInstitucional: e.target.value })} className="border rounded p-2" />
          <input placeholder="Teléfono (opcional)" value={form.telefono} onChange={e => setForm({ ...form, telefono: e.target.value })} className="border rounded p-2 col-span-2" />
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
                <th className="text-left p-3">Documento</th>
                <th className="text-left p-3">Título</th>
                <th className="text-left p-3">Especialidad</th>
                <th className="text-left p-3">Correo</th>
                <th className="text-left p-3">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {docentes.map(d => (
                <tr key={d.id} className="border-t">
                  <td className="p-3">{d.id}</td>
                  <td className="p-3">{d.nombres}</td>
                  <td className="p-3">{d.apellidos}</td>
                  <td className="p-3">{d.documentoIdentidad}</td>
                  <td className="p-3">{d.tituloProfesional}</td>
                  <td className="p-3">{d.especialidad}</td>
                  <td className="p-3">{d.correoInstitucional}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(d)} className="text-blue-600 hover:underline">Editar</button>
                    <button onClick={() => handleDelete(d.id)} className="text-red-600 hover:underline">Eliminar</button>
                  </td>
                </tr>
              ))}
              {docentes.length === 0 && <tr><td colSpan={8} className="p-3 text-center text-gray-500">No hay docentes registrados</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
