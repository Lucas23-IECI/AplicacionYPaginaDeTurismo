import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowLeft, Share2, Heart, Tag } from 'lucide-react';
import { motion } from 'motion/react';
import { events, formatPrice } from '../data/events';
import AnimatedSection from '../components/ui/AnimatedSection';

export default function EventDetailPage() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug);

  if (!event) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-3xl font-display text-stone-900 mb-4">Evento no encontrado</h1>
        <Link to="/eventos" className="text-primary font-semibold hover:underline">← Volver a experiencias</Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[50vh] min-h-[400px]"
      >
        <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Link to="/eventos" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Volver
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
              {event.category}
            </span>
            {event.featured && (
              <span className="px-3 py-1 bg-accent/80 backdrop-blur-sm text-white text-xs font-bold uppercase tracking-wider rounded-full">
                Destacado
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-5xl font-display text-white leading-tight">{event.title}</h1>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Content */}
          <AnimatedSection variant="fadeUp" className="lg:col-span-2">
            <p className="text-lg text-stone-600 leading-relaxed mb-8">{event.description}</p>

            <h3 className="text-xl font-display text-stone-900 mb-4">Detalles</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                <Calendar size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-stone-400 uppercase font-bold">Fecha</p>
                  <p className="text-sm font-medium text-stone-800">{event.dateStart}{event.dateEnd ? ` – ${event.dateEnd}` : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                <Clock size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-stone-400 uppercase font-bold">Horario</p>
                  <p className="text-sm font-medium text-stone-800">{event.timeStart}{event.timeEnd ? ` – ${event.timeEnd}` : ''}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                <MapPin size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-stone-400 uppercase font-bold">Ubicación</p>
                  <p className="text-sm font-medium text-stone-800">{event.address}, {event.city}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-cream rounded-xl">
                <Tag size={20} className="text-primary" />
                <div>
                  <p className="text-xs text-stone-400 uppercase font-bold">Categoría</p>
                  <p className="text-sm font-medium text-stone-800">{event.category}</p>
                </div>
              </div>
            </div>

            {event.tag && (
              <div className="flex flex-wrap gap-2 mb-8">
                {event.tag.split(',').map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-stone-100 text-stone-600 text-xs font-medium rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </AnimatedSection>

          {/* Sidebar */}
          <AnimatedSection variant="fadeLeft" delay={0.2}>
            <div className="sticky top-28 bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-primary">
                  {event.price === 0 ? 'Gratis' : formatPrice(event.price)}
                </p>
                {event.price > 0 && <p className="text-sm text-stone-400">por persona</p>}
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors mb-3">
                Reservar Ahora
              </button>
              <div className="flex gap-2">
                <button className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5">
                  <Heart size={16} /> Guardar
                </button>
                <button className="flex-1 py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5">
                  <Share2 size={16} /> Compartir
                </button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
