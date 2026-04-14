import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { destinations } from '../data/destinations';
import { events, formatPrice } from '../data/events';
import AnimatedSection from '../components/ui/AnimatedSection';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-3xl font-display text-stone-900 mb-4">Destino no encontrado</h1>
        <Link to="/" className="text-primary font-semibold hover:underline">← Volver al inicio</Link>
      </div>
    );
  }

  const destEvents = events.filter((e) => e.destinationSlug === slug);

  return (
    <div className="pt-20 pb-16">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[45vh] min-h-[350px]"
      >
        <img src={destination.image} alt={destination.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1 text-white/80 hover:text-white text-sm mb-4 transition-colors">
            <ArrowLeft size={16} /> Volver
          </Link>
          <h1 className="text-4xl md:text-5xl font-display text-white leading-tight">{destination.name}</h1>
          <p className="text-white/70 mt-2">{destination.eventCount} experiencias disponibles</p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <AnimatedSection variant="fadeUp">
          <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-3xl">{destination.description}</p>
        </AnimatedSection>

        <h2 className="text-2xl font-display text-stone-900 mb-6">Experiencias en {destination.name}</h2>
        {destEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destEvents.map((event) => (
              <Link key={event.id} to={`/evento/${event.slug}`} className="block bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-stone-100">
                <div className="relative h-48 overflow-hidden">
                  <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.dateStart}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.city}</span>
                  </div>
                  <h3 className="font-semibold text-stone-900 leading-snug">{event.title}</h3>
                  <p className="text-primary font-bold text-sm mt-2">{event.price === 0 ? 'Gratis' : formatPrice(event.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-stone-400 text-center py-12">Próximamente experiencias en este destino.</p>
        )}
      </div>
    </div>
  );
}
