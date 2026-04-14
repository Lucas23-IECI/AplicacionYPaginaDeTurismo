import { Calendar, Eye, TrendingUp, DollarSign, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEvents } from '../../lib/hooks';

const stats = [
  { label: 'Mis Eventos', value: '8', icon: Calendar, color: 'bg-primary/10 text-primary' },
  { label: 'Vistas Totales', value: '3,240', icon: Eye, color: 'bg-blue-50 text-blue-600' },
  { label: 'Clics este mes', value: '187', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  { label: 'Plan Actual', value: 'Premium', icon: DollarSign, color: 'bg-amber-50 text-amber-600' },
];

export default function PortalDashboard() {
  const { data: events } = useEvents();
  const myEvents = (events ?? []).filter(e => e.advertiserId === 'adv-001').slice(0, 5);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display text-stone-900">Mi Panel</h1>
          <p className="text-sm text-stone-500">Bienvenido, Viña Artesanal del Itata</p>
        </div>
        <Link to="/portal/nuevo-evento" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Nuevo Evento
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-xl border border-stone-200">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${s.color}`}><s.icon size={18} /></div>
              <div>
                <p className="text-xs text-stone-400">{s.label}</p>
                <p className="text-xl font-bold text-stone-900">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-medium text-stone-900 text-sm">Mis Últimos Eventos</h2>
          <Link to="/portal/nuevo-evento" className="text-xs text-primary font-medium hover:underline">Ver todos</Link>
        </div>
        <div className="divide-y divide-stone-50">
          {myEvents.length > 0 ? myEvents.map((event) => (
            <div key={event.id} className="px-5 py-3 flex items-center justify-between hover:bg-stone-50/50">
              <div className="flex items-center gap-3">
                <img src={event.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="text-sm font-medium text-stone-900">{event.title}</p>
                  <p className="text-xs text-stone-400">{event.dateStart} · {event.city}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${event.status === 'approved' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                {event.status === 'approved' ? 'Aprobado' : 'Pendiente'}
              </span>
            </div>
          )) : (
            <div className="px-5 py-8 text-center text-sm text-stone-400">
              No tienes eventos aún. <Link to="/portal/nuevo-evento" className="text-primary hover:underline">Crea tu primer evento</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
