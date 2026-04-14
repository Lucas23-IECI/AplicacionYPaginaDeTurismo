import { Calendar, Eye, TrendingUp, Plus, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
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
    { label: 'Total Eventos', value: myEvents.length, icon: Calendar, color: 'bg-primary/10 text-primary' },
    { label: 'Aprobados', value: approved, icon: CheckCircle, color: 'bg-green-50 text-green-600' },
    { label: 'Pendientes', value: pending, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { label: 'Rechazados', value: rejected, icon: XCircle, color: 'bg-red-50 text-red-600' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display text-stone-900">Mi Panel</h1>
          <p className="text-sm text-stone-500">Bienvenido, {profile?.businessName ?? 'Anunciante'}</p>
        </div>
        <Link to="/portal/nuevo-evento" className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
          <Plus size={16} /> Nuevo Evento
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => <SkeletonStat key={i} />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
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
      )}

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-stone-100 flex items-center justify-between">
          <h2 className="font-medium text-stone-900 text-sm">Mis Eventos</h2>
        </div>
        {loading ? (
          <SkeletonTable rows={4} />
        ) : myEvents.length > 0 ? (
          <div className="divide-y divide-stone-50">
            {myEvents.map((event) => (
              <Link key={event.id} to={`/portal/eventos/${event.id}`} className="px-5 py-3 flex items-center justify-between hover:bg-stone-50/50 block">
                <div className="flex items-center gap-3">
                  {event.images[0] ? (
                    <img src={event.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-lg bg-stone-100 flex items-center justify-center"><FileText size={16} className="text-stone-400" /></div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-stone-900">{event.title}</p>
                    <p className="text-xs text-stone-400">{event.dateStart} · {event.city}</p>
                  </div>
                </div>
                <StatusBadge status={event.status} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-5 py-12 text-center text-sm text-stone-400">
            No tienes eventos aún. <Link to="/portal/nuevo-evento" className="text-primary hover:underline">Crea tu primer evento</Link>
          </div>
        )}
      </div>
    </div>
  );
}
