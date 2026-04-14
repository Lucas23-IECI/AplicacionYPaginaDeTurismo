import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function EventSpotlight() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto bg-stone-900 rounded-3xl overflow-hidden relative min-h-[500px] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504279577054-acfeccf8fc52?w=1400&q=80&auto=format&fit=crop"
            alt="Vendimia en el sur de Chile"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 p-10 md:p-16 lg:p-20 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-accent text-white rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            Evento del mes
          </span>
          <h2 className="text-4xl md:text-5xl font-display text-white leading-tight mb-6">
            Gran Vendimia del Valle del Itata 2026
          </h2>
          <p className="text-white/75 text-lg mb-8 leading-relaxed">
            Tres días de celebración en el corazón vinícola de Ñuble.
            Cosecha participativa, catas guiadas, gastronomía local y música en vivo
            entre los viñedos más antiguos de Chile.
          </p>
          <div className="flex flex-wrap gap-6 items-center mb-10">
            <div className="flex items-center gap-2 text-white/80">
              <Calendar size={18} />
              <span className="text-sm font-medium">24 – 26 Abril, 2026</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <MapPin size={18} />
              <span className="text-sm font-medium">Quillón, Ñuble</span>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 bg-white text-stone-900 px-8 py-3.5 rounded-xl font-bold hover:bg-accent hover:text-white transition-all group">
            Ver detalle completo
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
