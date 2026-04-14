import { useState } from 'react';
import { Upload, Calendar, MapPin, DollarSign, Tag, FileText, Image, Send } from 'lucide-react';
import { categories } from '../../data/categories';
import { destinations } from '../../data/destinations';

export default function PortalNewEvent() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
          <Send size={28} className="text-green-600" />
        </div>
        <h2 className="text-xl font-display text-stone-900 mb-2">¡Evento Enviado!</h2>
        <p className="text-sm text-stone-500 max-w-md">Tu evento ha sido enviado para revisión. Recibirás una notificación cuando sea aprobado.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-display text-stone-900 mb-8">Crear Nuevo Evento</h1>

      <div className="bg-white rounded-xl border border-stone-200 p-6 space-y-6 max-w-3xl">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
            <FileText size={14} /> Título del Evento
          </label>
          <input type="text" placeholder="Ej: Festival de la Vendimia 2024" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
            <FileText size={14} /> Descripción
          </label>
          <textarea rows={4} placeholder="Describe tu evento en detalle..." className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Tag size={14} /> Categoría
            </label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              <option value="">Seleccionar categoría</option>
              {categories.map(c => <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <MapPin size={14} /> Destino
            </label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
              <option value="">Seleccionar destino</option>
              {destinations.map(d => <option key={d.id} value={d.slug}>{d.name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Calendar size={14} /> Fecha Inicio
            </label>
            <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <Calendar size={14} /> Fecha Fin
            </label>
            <input type="date" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <MapPin size={14} /> Dirección
            </label>
            <input type="text" placeholder="Ej: Av. Principal 123, Chillán" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
              <DollarSign size={14} /> Precio (CLP)
            </label>
            <input type="number" placeholder="0 para gratuito" className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-stone-700 mb-2">
            <Image size={14} /> Imágenes
          </label>
          <div className="border-2 border-dashed border-stone-200 rounded-xl p-8 text-center hover:border-primary/30 transition-colors cursor-pointer">
            <Upload size={24} className="mx-auto text-stone-300 mb-2" />
            <p className="text-sm text-stone-500">Arrastra imágenes aquí o haz clic para subir</p>
            <p className="text-xs text-stone-400 mt-1">JPG, PNG o WEBP. Máximo 5MB por imagen</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-stone-100">
          <button
            onClick={() => setSubmitted(true)}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors"
          >
            <Send size={16} /> Enviar para Revisión
          </button>
          <button className="px-6 py-2.5 rounded-xl text-sm font-medium text-stone-600 border border-stone-200 hover:bg-stone-50 transition-colors">
            Guardar Borrador
          </button>
        </div>
      </div>
    </div>
  );
}
