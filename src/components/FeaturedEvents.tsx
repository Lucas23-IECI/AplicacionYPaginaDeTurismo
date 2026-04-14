import { Calendar, MapPin, Heart } from 'lucide-react';

const events = [
  {
    id: 1,
    category: 'Tradición',
    title: 'Vendimia del Valle del Itata',
    city: 'Chillán Viejo',
    date: '26 Abr, 2026',
    distance: '12 km',
    price: '$15.000',
    tag: 'Curado',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    category: 'Cultura',
    title: 'Feria Costumbrista de Ñuble',
    city: 'Chillán',
    date: '19 Abr, 2026',
    distance: '3 km',
    price: 'Gratis',
    tag: 'Este finde',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    category: 'Aventura',
    title: 'Senderismo Termas de Chillán',
    city: 'Nevados de Chillán',
    date: '20 Abr, 2026',
    distance: '82 km',
    price: '$25.000',
    tag: 'Cerca de ti',
    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    category: 'Gastronomía',
    title: 'Festival Gastronómico del Biobío',
    city: 'Concepción',
    date: '3 May, 2026',
    distance: '95 km',
    price: '$8.000',
    tag: 'Destacado',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop',
  },
];

const tagColors: Record<string, string> = {
  'Curado': 'bg-secondary/10 text-secondary',
  'Este finde': 'bg-accent/15 text-amber-700',
  'Cerca de ti': 'bg-primary/10 text-primary',
  'Destacado': 'bg-purple-50 text-purple-700',
};

export default function FeaturedEvents() {
  return (
    <section id="experiencias" className="py-24 px-6 max-w-7xl mx-auto scroll-mt-24">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-3">Experiencias Destacadas</h2>
          <p className="text-stone-500 max-w-md">Las actividades más exclusivas de la región, seleccionadas y verificadas por nuestro equipo.</p>
        </div>
        <a href="#" className="text-sm font-semibold text-primary hover:text-primary-hover transition-colors whitespace-nowrap">
          Ver todas →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event) => (
          <article key={event.id} className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-stone-100">
            <div className="relative h-52 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase rounded-full text-stone-700">
                {event.category}
              </span>
              <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full ${tagColors[event.tag] || 'bg-stone-100 text-stone-600'}`}>
                {event.tag}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {event.distance}</span>
              </div>
              <h3 className="font-semibold text-stone-900 mb-1 leading-snug">{event.title}</h3>
              <p className="text-sm text-stone-500 mb-4">{event.city}</p>
              <div className="flex justify-between items-center pt-3 border-t border-stone-100">
                <span className="text-primary font-bold text-sm">
                  {event.price}{' '}
                  {event.price !== 'Gratis' && <span className="text-xs font-normal text-stone-400">/ persona</span>}
                </span>
                <button className="text-stone-300 hover:text-primary transition-colors">
                  <Heart size={18} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
