import { Search, UserCheck, UserX, Mail } from 'lucide-react';

const advertisers = [
  { id: 1, name: 'Viña Artesanal del Itata', email: 'contacto@vinaartesanal.cl', plan: 'Premium', events: 8, status: 'active', joined: '2024-01-15' },
  { id: 2, name: 'Hotel Termas de Chillán', email: 'reservas@termaschillan.cl', plan: 'Profesional', events: 5, status: 'active', joined: '2024-02-20' },
  { id: 3, name: 'Restaurante El Fogón', email: 'info@elfogon.cl', plan: 'Básico', events: 2, status: 'active', joined: '2024-03-10' },
  { id: 4, name: 'Turismo Aventura Ñuble', email: 'tour@aventuranuble.cl', plan: 'Profesional', events: 4, status: 'inactive', joined: '2024-04-05' },
  { id: 5, name: 'Cervecería Artesanal Sur', email: 'hola@cervezasur.cl', plan: 'Básico', events: 1, status: 'active', joined: '2024-05-12' },
];

const planColors: Record<string, string> = {
  'Premium': 'bg-amber-50 text-amber-700',
  'Profesional': 'bg-blue-50 text-blue-700',
  'Básico': 'bg-stone-100 text-stone-600',
};

export default function AdminAdvertisers() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-stone-900">Gestión de Anunciantes</h1>
        <span className="text-sm text-stone-500">{advertisers.length} anunciantes registrados</span>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" placeholder="Buscar anunciantes..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>
      </div>

      <div className="grid gap-4">
        {advertisers.map((a) => (
          <div key={a.id} className="bg-white p-5 rounded-xl border border-stone-200 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {a.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h3 className="font-medium text-stone-900">{a.name}</h3>
                <p className="text-xs text-stone-400">{a.email} · Desde {a.joined}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${planColors[a.plan]}`}>{a.plan}</span>
              <span className="text-sm text-stone-600">{a.events} eventos</span>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-stone-100 rounded-lg transition-colors text-stone-400"><Mail size={16} /></button>
                {a.status === 'active' ? (
                  <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-stone-400 hover:text-red-600"><UserX size={16} /></button>
                ) : (
                  <button className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-stone-400 hover:text-green-600"><UserCheck size={16} /></button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
