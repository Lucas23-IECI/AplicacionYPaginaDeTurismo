import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import AnimatedSection from '../ui/AnimatedSection';

const destinations = [
  { name: 'Chillán', slug: 'chillan', count: '24 experiencias', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80&auto=format&fit=crop' },
  { name: 'Concepción', slug: 'concepcion', count: '38 experiencias', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80&auto=format&fit=crop' },
  { name: 'Valle del Itata', slug: 'valle-del-itata', count: '16 experiencias', image: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=600&q=80&auto=format&fit=crop' },
  { name: 'Nevados de Chillán', slug: 'nevados-de-chillan', count: '12 experiencias', image: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80&auto=format&fit=crop' },
  { name: 'Costa del Biobío', slug: 'costa-del-biobio', count: '20 experiencias', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&auto=format&fit=crop' },
];

export default function Destinations() {
  return (
    <section id="destinos" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
      <AnimatedSection variant="fadeUp">
        <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-3">Explora por Destino</h2>
        <p className="text-stone-500 mb-12 max-w-lg">Navega las experiencias por zona y descubre qué ofrece cada rincón de la región.</p>
      </AnimatedSection>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {destinations.map((dest, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={idx < 2 ? 'col-span-1 md:col-span-3' : 'col-span-1 md:col-span-2'}
          >
            <Link
              to={`/destinos/${dest.slug}`}
              className={`group relative overflow-hidden rounded-2xl block ${idx < 2 ? 'h-72' : 'h-56'}`}
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <h3 className="text-white font-bold text-lg leading-tight">{dest.name}</h3>
                <p className="text-white/70 text-sm">{dest.count}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
