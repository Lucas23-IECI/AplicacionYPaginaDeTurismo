import { Calendar, Users, Mail, MessageSquare, CheckCircle, Clock } from 'lucide-react';
import { useAdminStats, usePendingEvents, updateEventStatus } from '../../lib/hooks';
import { useState } from 'react';
import { SkeletonStat } from '../../components/ui/Skeleton';
import StatusBadge from '../../components/admin/StatusBadge';

export default function AdminDashboard() {
  const { data: stats, loading: loadingStats } = useAdminStats();
  const { data: pendingEvents, loading: loadingPending, refetch } = usePendingEvents();
  const [acting, setActing] = useState<string | null>(null);

  const handleQuickAction = async (id: string, status: string) => {
    setActing(id);
    try { await updateEventStatus(id, status); refetch(); } catch { /* silent */ }
    setActing(null);
  };

  const cards = stats
    ? [
        { label: 'Total Eventos', value: stats.totalEvents, icon: Calendar, color: 'text-primary bg-primary/10' },
        { label: 'Aprobados', value: stats.approvedEvents, icon: CheckCircle, color: 'text-green-600 bg-green-50' },
        { label: 'Pendientes', value: stats.pendingEvents, icon: Clock, color: 'text-amber-600 bg-amber-50' },
        { label: 'Suscriptores', value: stats.totalSubscribers, icon: Users, color: 'text-secondary bg-secondary/10' },
        { label: 'Mensajes sin leer', value: stats.unreadMessages, icon: MessageSquare, color: 'text-red-600 bg-red-50' },
        { label: 'Testimonios', value: stats.totalTestimonials, icon: Mail, color: 'text-accent bg-accent/10' },
      ]
    : [];

  return (
    <div>
      <h1 className="text-2xl font-display text-stone-900 mb-8">Dashboard</h1>

      {loadingStats ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">{Array.from({ length: 6 }).map((_, i) => <SkeletonStat key={i} />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {cards.map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-stone-500">{s.label}</span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                  <s.icon size={16} />
                </div>
              </div>
              <p className="text-2xl font-bold text-stone-900">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white rounded-xl border border-stone-200 p-6">
        <h3 className="font-bold text-stone-900 mb-4">Eventos Pendientes de Revisión</h3>
        {loadingPending ? (
          <p className="text-sm text-stone-400">Cargando…</p>
        ) : !pendingEvents?.length ? (
          <p className="text-sm text-stone-500">No hay eventos pendientes.</p>
        ) : (
          <div className="space-y-2">
            {pendingEvents.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-stone-700">{ev.title}</span>
                  <span className="text-xs text-stone-400 ml-2">{ev.city} · {ev.dateStart}</span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status="pending" />
                  <button
                    disabled={acting === ev.id}
                    onClick={() => handleQuickAction(ev.id, 'approved')}
                    className="text-xs px-3 py-1 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 disabled:opacity-50"
                  >
                    Aprobar
                  </button>
                  <button
                    disabled={acting === ev.id}
                    onClick={() => handleQuickAction(ev.id, 'rejected')}
                    className="text-xs px-3 py-1 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 disabled:opacity-50"
                  >
                    Rechazar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
