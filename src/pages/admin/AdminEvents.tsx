import { Plus, Search, Edit, Trash2, Eye, Check, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAllEvents, updateEventStatus, deleteEvent } from '../../lib/hooks';
import StatusBadge from '../../components/admin/StatusBadge';
import ConfirmDialog from '../../components/admin/ConfirmDialog';

export default function AdminEvents() {
  const { data: events, loading, refetch } = useAllEvents();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [acting, setActing] = useState<string | null>(null);
  const navigate = useNavigate();

  const allEvents = events ?? [];
  const filtered = allEvents.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatus = async (id: string, status: string) => {
    setActing(id);
    try { await updateEventStatus(id, status); refetch(); } catch { /* silent */ }
    setActing(null);
  };

  const handleDelete = async () => {
    if (!deleting) return;
    try { await deleteEvent(deleting); refetch(); } catch { /* silent */ }
    setDeleting(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-stone-900">Gestión de Eventos</h1>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Nuevo Evento
        </button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            placeholder="Buscar eventos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        >
          <option value="all">Todos</option>
          <option value="approved">Aprobados</option>
          <option value="pending">Pendientes</option>
          <option value="draft">Borrador</option>
          <option value="rejected">Rechazados</option>
          <option value="archived">Archivados</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Evento</th>
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Categoría</th>
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Fecha</th>
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Estado</th>
              <th className="text-right text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((event) => (
              <tr key={event.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <img src={event.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="text-sm font-medium text-stone-900">{event.title}</p>
                      <p className="text-xs text-stone-400">{event.city}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3 text-sm text-stone-600">{event.category}</td>
                <td className="px-5 py-3 text-sm text-stone-600">{event.dateStart}</td>
                <td className="px-5 py-3"><StatusBadge status={event.status} /></td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => window.open(`/eventos/${event.slug}`, '_blank')} className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-stone-700" title="Ver"><Eye size={16} /></button>
                    <button onClick={() => navigate(`/admin/eventos/${event.id}/editar`)} className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-stone-700" title="Editar"><Edit size={16} /></button>
                    {event.status === 'pending' && (
                      <>
                        <button disabled={acting === event.id} onClick={() => handleStatus(event.id, 'approved')} className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-stone-400 hover:text-green-600 disabled:opacity-50" title="Aprobar"><Check size={16} /></button>
                        <button disabled={acting === event.id} onClick={() => handleStatus(event.id, 'rejected')} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-600 disabled:opacity-50" title="Rechazar"><X size={16} /></button>
                      </>
                    )}
                    <button onClick={() => setDeleting(event.id)} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-600" title="Eliminar"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {!filtered.length && (
              <tr><td colSpan={5} className="text-center py-10 text-sm text-stone-400">No se encontraron eventos</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!deleting}
        title="Eliminar evento"
        message="¿Estás seguro de eliminar este evento? Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleting(null)}
      />
    </div>
  );
}
