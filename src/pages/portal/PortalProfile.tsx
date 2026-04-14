import { User, Mail, Phone, MapPin, Building, Camera, Save } from 'lucide-react';

export default function PortalProfile() {
  return (
    <div>
      <h1 className="text-2xl font-display text-stone-900 mb-8">Mi Perfil</h1>

      <div className="max-w-3xl space-y-6">
        {/* Avatar */}
        <div className="bg-white rounded-xl border border-stone-200 p-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                VA
              </div>
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-white border border-stone-200 rounded-full flex items-center justify-center text-stone-400 hover:text-primary transition-colors">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h2 className="font-medium text-stone-900">Viña Artesanal del Itata</h2>
              <p className="text-sm text-stone-500">Plan Premium · Miembro desde Enero 2024</p>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-5">
          <h3 className="font-medium text-stone-900 text-sm">Información del Negocio</h3>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Building size={14} /> Nombre del Negocio
            </label>
            <input type="text" defaultValue="Viña Artesanal del Itata" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <User size={14} /> Contacto Principal
              </label>
              <input type="text" defaultValue="María González" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
                <Phone size={14} /> Teléfono
              </label>
              <input type="tel" defaultValue="+56 9 1234 5678" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Mail size={14} /> Email
            </label>
            <input type="email" defaultValue="contacto@vinaartesanal.cl" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <MapPin size={14} /> Dirección
            </label>
            <input type="text" defaultValue="Camino del Itata Km 8, Valle del Itata" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>

          <div>
            <label className="text-sm font-medium text-stone-700 mb-2 block">Descripción</label>
            <textarea rows={3} defaultValue="Viña artesanal dedicada a la producción de vinos orgánicos del Valle del Itata, con más de 15 años de experiencia..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
          </div>

          <div className="flex justify-end pt-4 border-t border-stone-100">
            <button className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
              <Save size={16} /> Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
