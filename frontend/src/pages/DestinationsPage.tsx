import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useDestinations } from '../lib/hooks';
import AnimatedSection from '../components/ui/AnimatedSection';
import Breadcrumb from '../components/shared/Breadcrumb';
import { usePageTitle } from '../lib/usePageTitle';
import { Skeleton } from '../components/ui/Skeleton';

export default function DestinationsPage() {
  usePageTitle('Destinos');
  const { data: destinations, loading } = useDestinations();

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Destinos' }]} />

        <AnimatedSection variant="fadeUp">
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 dark:text-white mb-4">
            Destinos
          </h1>
          <p className="text-stone-500 dark:text-zinc-400 text-lg mb-12 max-w-xl">
            Explora las zonas más fascinantes de Ñuble y Biobío. Cada destino tiene su propia identidad y experiencias únicas.
          </p>
        </AnimatedSection>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <Skeleton className="h-64 rounded-none" />
                <div className="p-5 bg-white dark:bg-zinc-900 border border-t-0 border-stone-100 dark:border-zinc-800 rounded-b-2xl space-y-2">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : !destinations?.length ? (
          <div className="text-center py-20">
            <MapPin size={40} className="text-stone-300 dark:text-zinc-700 mx-auto mb-3" strokeWidth={1.5} />
            <h3 className="text-xl font-display text-stone-700 dark:text-zinc-300 mb-2">Próximamente</h3>
            <p className="text-stone-500 dark:text-zinc-500">Estamos preparando destinos increíbles para ti.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((dest, idx) => (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  to={`/destinos/${dest.slug}`}
                  className="group block bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-stone-100 dark:border-zinc-800 hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={dest.image || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&auto=format&fit=crop'}
                      alt={dest.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase rounded-full text-stone-700">
                        {dest.eventCount} experiencia{dest.eventCount !== 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-stone-900 dark:text-white">{dest.name}</h3>
                      <ArrowRight size={16} className="text-stone-300 dark:text-zinc-600 group-hover:text-primary transition-colors" />
                    </div>
                    {dest.description && (
                      <p className="text-sm text-stone-500 dark:text-zinc-400 line-clamp-2">{dest.description}</p>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
