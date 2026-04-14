import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { useAllEvents } from '../../lib/hooks';

const statusColors: Record<string, string> = {
  approved: 'bg-green-50 text-green-700',
  pending: 'bg-amber-50 text-amber-700',
  draft: 'bg-stone-100 text-stone-600',
};

export default function AdminEvents() {
  const { data: events, loading } = useAllEvents();
  const allEvents = events ?? [];

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
          <input type="text" placeholder="Buscar eventos..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
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
            {allEvents.slice(0, 10).map((event) => (
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
                <td className="px-5 py-3">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${statusColors[event.status] || statusColors.draft}`}>
                    {event.status === 'approved' ? 'Aprobado' : event.status === 'pending' ? 'Pendiente' : 'Borrador'}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-stone-700"><Eye size={16} /></button>
                    <button className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400 hover:text-stone-700"><Edit size={16} /></button>
                    <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-600"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
