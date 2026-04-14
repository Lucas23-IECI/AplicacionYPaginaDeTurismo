import { Calendar, Plus, Clock, CheckCircle, XCircle, FileText, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useMyEvents, useAdvertiserProfile } from '../../lib/hooks';
import { useAuth } from '../../lib/auth';
import StatusBadge from '../../components/admin/StatusBadge';
import { SkeletonStat, SkeletonTable } from '../../components/ui/Skeleton';

export default function PortalDashboard() {
  const { user } = useAuth();
  const { data: profile, loading: profileLoading } = useAdvertiserProfile(user?.id);
  const { data: events, loading: eventsLoading } = useMyEvents(profile?.id);
  const loading = profileLoading || eventsLoading;

  const myEvents = events ?? [];
  const approved = myEvents.filter(e => e.status === 'approved').length;
  const pending = myEvents.filter(e => e.status === 'pending').length;
  const rejected = myEvents.filter(e => e.status === 'rejected').length;

  const stats = [
    { label: 'Total Eventos', value: myEvents.length, icon: Calendar, color: 'text-secondary', bg: 'bg-secondary/8 dark:bg-secondary/15' },
    { label: 'Aprobados', value: approved, icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
    { label: 'Pendientes', value: pending, icon: Clock, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10' },
    { label: 'Rechazados', value: rejected, icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-stone-900 dark:text-white">Mi Panel</h1>
          <p className="text-sm text-stone-500 dark:text-zinc-500 mt-0.5">Bienvenido, {profile?.businessName ?? 'Anunciante'}</p>
        </div>
        <Link to="/portal/nuevo-evento" className="inline-flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
          <Plus size={15} strokeWidth={2} /> Nuevo Evento
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <SkeletonStat key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-white dark:bg-zinc-900 rounded-xl border border-stone-200 dark:border-zinc-800 p-5">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <s.icon size={18} className={s.color} strokeWidth={1.8} />
                </div>
              </div>
              <p className="text-2xl font-bold text-stone-900 dark:text-white">{s.value}</p>
              <p className="text-xs text-stone-500 dark:text-zinc-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-stone-200 dark:border-zinc-800">
        <div className="px-5 py-4 border-b border-stone-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-stone-900 dark:text-white">Mis Eventos</h3>
            <p className="text-xs text-stone-400 dark:text-zinc-500 mt-0.5">{myEvents.length} evento{myEvents.length !== 1 ? 's' : ''} registrado{myEvents.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        {loading ? (
          <SkeletonTable rows={4} />
        ) : myEvents.length > 0 ? (
          <div className="divide-y divide-stone-50 dark:divide-zinc-800">
            {myEvents.map((event) => (
              <Link key={event.id} to={`/portal/eventos/${event.id}`} className="flex items-center justify-between px-5 py-3.5 hover:bg-stone-50/50 dark:hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  {event.images[0] ? (
                    <img src={event.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-zinc-800 flex items-center justify-center shrink-0">
                      <FileText size={15} className="text-stone-400 dark:text-zinc-600" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-stone-800 dark:text-zinc-200 truncate">{event.title}</p>
                    <p className="text-xs text-stone-400 dark:text-zinc-600">{event.dateStart} · {event.city}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <StatusBadge status={event.status} />
                  <ArrowUpRight size={14} className="text-stone-300 dark:text-zinc-700" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center">
            <Calendar size={32} className="text-stone-300 dark:text-zinc-700 mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-sm text-stone-500 dark:text-zinc-500">No tienes eventos aún</p>
            <Link to="/portal/nuevo-evento" className="text-sm text-secondary font-medium hover:underline mt-1 inline-block">Crea tu primer evento</Link>
          </div>
        )}
      </div>
    </div>
  );
}
