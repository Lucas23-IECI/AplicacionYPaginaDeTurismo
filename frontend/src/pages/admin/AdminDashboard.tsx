import { Calendar, Users, Mail, MessageSquare, CheckCircle, Clock, ArrowUpRight, TrendingUp } from 'lucide-react';
import { useAdminStats, usePendingEvents, updateEventStatus } from '../../lib/hooks';
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
        { label: 'Total Eventos', value: stats.totalEvents, icon: Calendar, color: 'text-primary', bg: 'bg-primary/8 dark:bg-primary/15', link: '/admin/eventos' },
        { label: 'Aprobados', value: stats.approvedEvents, icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', link: '/admin/eventos' },
        { label: 'Pendientes', value: stats.pendingEvents, icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', link: '/admin/eventos' },
        { label: 'Suscriptores', value: stats.totalSubscribers, icon: Users, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', link: '/admin/newsletter' },
        { label: 'Mensajes', value: stats.unreadMessages, icon: MessageSquare, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', link: '/admin/mensajes' },
        { label: 'Testimonios', value: stats.totalTestimonials, icon: Mail, color: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', link: '/admin/testimonios' },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-stone-500 dark:text-zinc-500 mt-0.5">Resumen general de la plataforma</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-stone-400 dark:text-zinc-600">
          <TrendingUp size={14} />
          {new Date().toLocaleDateString('es-CL', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Stats grid */}
      {loadingStats ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <SkeletonStat key={i} />)}</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((s) => (
            <Link key={s.label} to={s.link} className="group bg-white dark:bg-zinc-900 rounded-xl border border-stone-200 dark:border-zinc-800 p-5 hover:border-stone-300 dark:hover:border-zinc-700 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <s.icon size={18} className={s.color} strokeWidth={1.8} />
                </div>
                <ArrowUpRight size={14} className="text-stone-300 dark:text-zinc-700 group-hover:text-stone-500 dark:group-hover:text-zinc-400 transition-colors" />
              </div>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-stone-500 dark:text-zinc-500 mt-1">{s.label}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Pending events */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-stone-200 dark:border-zinc-800">
        <div className="px-5 py-4 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Pendientes de revisión</h3>
            <p className="text-xs text-stone-400 dark:text-zinc-500 mt-0.5">{pendingEvents?.length ?? 0} eventos esperando aprobación</p>
          </div>
          <Link to="/admin/eventos" className="text-xs text-primary font-medium hover:underline">Ver todos</Link>
        </div>
        {loadingPending ? (
          <div className="p-5"><p className="text-sm text-stone-400 dark:text-zinc-600">Cargando…</p></div>
        ) : !pendingEvents?.length ? (
          <div className="p-8 text-center">
            <CheckCircle size={32} className="text-emerald-400 mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-sm text-stone-500 dark:text-zinc-500">Todo al día — no hay eventos pendientes</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-50 dark:divide-zinc-800">
            {pendingEvents.map((ev) => (
              <div key={ev.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-stone-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center shrink-0">
                    <Clock size={15} className="text-amber-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-800 dark:text-zinc-200 truncate">{ev.title}</p>
                    <p className="text-xs text-stone-400 dark:text-zinc-600">{ev.city} · {ev.dateStart}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <button
                    disabled={acting === ev.id}
                    onClick={() => handleQuickAction(ev.id, 'approved')}
                    className="text-xs px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors disabled:opacity-50 font-medium"
                  >
                    Aprobar
                  </button>
                  <button
                    disabled={acting === ev.id}
                    onClick={() => handleQuickAction(ev.id, 'rejected')}
                    className="text-xs px-3 py-1.5 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors disabled:opacity-50 font-medium"
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
