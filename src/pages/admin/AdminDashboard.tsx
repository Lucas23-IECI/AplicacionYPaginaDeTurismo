import { Calendar, Users, Eye, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Eventos Activos', value: '48', change: '+12%', icon: Calendar, color: 'text-primary bg-primary/10' },
  { label: 'Anunciantes', value: '23', change: '+3', icon: Users, color: 'text-secondary bg-secondary/10' },
  { label: 'Visitas Mes', value: '12.4k', change: '+18%', icon: Eye, color: 'text-accent bg-accent/10' },
  { label: 'Conversiones', value: '8.2%', change: '+2.1%', icon: TrendingUp, color: 'text-purple-600 bg-purple-50' },
];

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-display text-stone-900 mb-8">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-stone-200 p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-stone-500">{s.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.color}`}>
                <s.icon size={16} />
              </div>
            </div>
            <p className="text-2xl font-bold text-stone-900">{s.value}</p>
            <span className="text-xs text-green-600 font-medium">{s.change} vs mes anterior</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h3 className="font-bold text-stone-900 mb-4">Actividad Reciente</h3>
          <div className="space-y-3">
            {['Nuevo evento: Feria Artesanal de Ñuble', 'Anunciante registrado: Viñedos del Sur', 'Evento aprobado: Trekking Nevados', 'Newsletter enviado: 2,340 suscriptores'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-stone-600">{item}</span>
                <span className="text-stone-400 text-xs ml-auto">hace {i + 1}h</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <h3 className="font-bold text-stone-900 mb-4">Eventos Pendientes</h3>
          <p className="text-stone-500 text-sm">5 eventos esperando revisión editorial.</p>
          <div className="mt-4 space-y-2">
            {['Festival de la Cerveza Artesanal', 'Cabalgata Cordillerana', 'Muestra de Cine Regional', 'Feria Gastronómica de San Carlos', 'Yoga al Amanecer en Cobquecura'].map((name, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-stone-50 rounded-lg">
                <span className="text-sm text-stone-700">{name}</span>
                <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full font-medium">Pendiente</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
