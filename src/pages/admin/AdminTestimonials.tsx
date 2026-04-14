import { Star, Check, X, MessageSquare } from 'lucide-react';
import { testimonials } from '../../data/testimonials';

export default function AdminTestimonials() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display text-stone-900">Gestión de Testimonios</h1>
        <span className="text-sm text-stone-500">{testimonials.length} testimonios</span>
      </div>

      <div className="grid gap-4">
        {testimonials.map((t) => (
          <div key={t.id} className="bg-white p-5 rounded-xl border border-stone-200">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 mb-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h3 className="font-medium text-stone-900 text-sm">{t.name}</h3>
                  <p className="text-xs text-stone-400">{t.city} · {t.type === 'tourist' ? 'Turista' : 'Anunciante'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-stone-200'} />
                ))}
              </div>
            </div>
            <p className="text-sm text-stone-600 mb-4 leading-relaxed">"{t.text}"</p>
            <div className="flex items-center gap-2 pt-3 border-t border-stone-100">
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                <Check size={14} /> Aprobar
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors">
                <X size={14} /> Rechazar
              </button>
              <button className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-stone-50 text-stone-600 rounded-lg hover:bg-stone-100 transition-colors ml-auto">
                <MessageSquare size={14} /> Responder
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
