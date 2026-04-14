import { Mail, Download, Users, TrendingUp } from 'lucide-react';

const subscribers = [
  { id: 1, email: 'maria.gonzalez@gmail.com', date: '2024-06-01', status: 'active' },
  { id: 2, email: 'carlos.muñoz@outlook.com', date: '2024-06-03', status: 'active' },
  { id: 3, email: 'ana.rios@yahoo.com', date: '2024-06-05', status: 'active' },
  { id: 4, email: 'pedro.silva@gmail.com', date: '2024-06-08', status: 'unsubscribed' },
  { id: 5, email: 'lucia.fernandez@hotmail.com', date: '2024-06-10', status: 'active' },
  { id: 6, email: 'jorge.castro@gmail.com', date: '2024-06-12', status: 'active' },
  { id: 7, email: 'valentina.diaz@outlook.com', date: '2024-06-15', status: 'active' },
];

const stats = [
  { label: 'Total Suscriptores', value: '1,247', icon: Users, color: 'bg-blue-50 text-blue-600' },
  { label: 'Nuevos este mes', value: '+89', icon: TrendingUp, color: 'bg-green-50 text-green-600' },
  { label: 'Tasa apertura', value: '42%', icon: Mail, color: 'bg-amber-50 text-amber-600' },
];

export default function AdminNewsletter() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-stone-900">Newsletter</h1>
        <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
          <Mail size={16} /> Enviar Newsletter
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
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
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-100">
          <h2 className="font-medium text-stone-900 text-sm">Últimos suscriptores</h2>
          <button className="inline-flex items-center gap-1.5 text-xs text-primary font-medium hover:underline">
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
            {subscribers.map((s) => (
              <tr key={s.id} className="border-b border-stone-50 hover:bg-stone-50/50">
                <td className="px-5 py-3 text-sm text-stone-700">{s.email}</td>
                <td className="px-5 py-3 text-sm text-stone-500">{s.date}</td>
                <td className="px-5 py-3">
                  <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${s.status === 'active' ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-500'}`}>
                    {s.status === 'active' ? 'Activo' : 'Desuscrito'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
