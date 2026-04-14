import { ArrowRight } from 'lucide-react';

export default function AdvertiserCTA() {
  return (
    <section id="anunciantes" className="py-24 px-6 scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-primary to-primary-hover rounded-3xl p-12 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display text-white mb-6">
              ¿Organizas eventos o actividades?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-10 text-lg leading-relaxed">
              Únete como anunciante y llega a miles de turistas y residentes que buscan experiencias de calidad.
              Nosotros nos encargamos de que tu actividad luzca profesional.
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-accent hover:text-white transition-all group text-lg">
              Publica tu actividad
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
