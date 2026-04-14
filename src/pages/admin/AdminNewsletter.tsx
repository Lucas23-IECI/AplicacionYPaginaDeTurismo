import { Mail, Download, Users } from 'lucide-react';
import { useSubscribers } from '../../lib/hooks';
import StatusBadge from '../../components/admin/StatusBadge';

export default function AdminNewsletter() {
  const { data: subscribers, loading } = useSubscribers();
  const all = subscribers ?? [];
  const active = all.filter((s) => !s.unsubscribedAt).length;

  const exportCSV = () => {
    const csv = ['email,fecha_suscripcion,estado', ...all.map((s) => `${s.email},${s.subscribedAt},${s.unsubscribedAt ? 'desuscrito' : 'activo'}`)].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'suscriptores.csv'; a.click();
    URL.revokeObjectURL(url);
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
        <h1 className="text-2xl font-display text-stone-900">Newsletter</h1>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600"><Users size={18} /></div>
            <div>
              <p className="text-xs text-stone-400">Suscriptores activos</p>
              <p className="text-xl font-bold text-stone-900">{active}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-stone-200">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-50 text-green-600"><Mail size={18} /></div>
            <div>
              <p className="text-xs text-stone-400">Total registrados</p>
              <p className="text-xl font-bold text-stone-900">{all.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
          <h2 className="font-medium text-stone-900 text-sm">Suscriptores</h2>
          <button onClick={exportCSV} className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
            <Download size={14} /> Exportar CSV
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Email</th>
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Fecha</th>
              <th className="text-left text-xs font-bold text-stone-400 uppercase tracking-wider px-5 py-3">Estado</th>
            </tr>
          </thead>
          <tbody>
            {all.map((s) => (
              <tr key={s.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                <td className="px-5 py-3 text-sm text-stone-700">{s.email}</td>
                <td className="px-5 py-3 text-sm text-stone-500">{new Date(s.subscribedAt).toLocaleDateString('es-CL')}</td>
                <td className="px-5 py-3">
                  <StatusBadge status={s.unsubscribedAt ? 'unsubscribed' : 'active'} />
                </td>
              </tr>
            ))}
            {!all.length && (
              <tr><td colSpan={3} className="text-center py-10 text-sm text-stone-400">No hay suscriptores</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
