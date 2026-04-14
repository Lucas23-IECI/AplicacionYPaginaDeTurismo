import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { useDestinationBySlug, useEvents } from '../lib/hooks';
import AnimatedSection from '../components/ui/AnimatedSection';
import EventCard from '../components/shared/EventCard';
import Breadcrumb from '../components/shared/Breadcrumb';

export default function DestinationDetailPage() {
  const { slug } = useParams();
  const { data: destination, loading } = useDestinationBySlug(slug);
  const { data: events } = useEvents();

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-3xl font-display text-stone-900 mb-4">Destino no encontrado</h1>
        <Link to="/" className="text-primary font-semibold hover:underline">← Volver al inicio</Link>
      </div>
    );
  }

  const destEvents = (events ?? []).filter((e) => e.destinationSlug === slug);

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
        <Breadcrumb items={[{ label: destination.name }]} />
        <AnimatedSection variant="fadeUp">
          <p className="text-lg text-stone-600 leading-relaxed mb-10 max-w-3xl">{destination.description}</p>
        </AnimatedSection>

        <h2 className="text-2xl font-display text-stone-900 mb-6">Experiencias en {destination.name}</h2>
        {destEvents.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destEvents.map((event) => (
              <div key={event.id}><EventCard event={event} /></div>
            ))}
          </div>
        ) : (
          <p className="text-stone-400 text-center py-12">Próximamente experiencias en este destino.</p>
        )}
      </div>
    </div>
  );
}
