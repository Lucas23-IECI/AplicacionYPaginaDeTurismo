import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, MapPin, Calendar, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEvents, useCategories, formatPrice } from '../lib/hooks';
import AnimatedSection from '../components/ui/AnimatedSection';
import StaggerContainer, { StaggerItem } from '../components/ui/StaggerContainer';
import { SkeletonGrid } from '../components/ui/Skeleton';

export default function EventsPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('cat') ?? null);
  const [selectedDate, setSelectedDate] = useState(searchParams.get('fecha') ?? '');
  const [showFilters, setShowFilters] = useState(false);
  const { data: events, loading } = useEvents();
  const { data: categories } = useCategories();

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '');
    setSelectedCategory(searchParams.get('cat') || null);
    setSelectedDate(searchParams.get('fecha') ?? '');
  }, [searchParams]);

  const filtered = (events ?? []).filter((e) => {
    const matchesSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !selectedCategory || e.categorySlug === selectedCategory;
    const matchesDate = !selectedDate || e.dateStart === selectedDate || (e.dateEnd && e.dateStart <= selectedDate && e.dateEnd >= selectedDate);
    return matchesSearch && matchesCat && matchesDate;
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection variant="fadeUp">
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 mb-4">Todas las Experiencias</h1>
          <p className="text-stone-500 text-lg mb-10 max-w-xl">
            Explora el catálogo completo de actividades curadas en la Región de Ñuble y Biobío.
          </p>
        </AnimatedSection>

        {/* Search + filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o ciudad..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:border-primary transition-colors"
          >
            <SlidersHorizontal size={16} />
            Filtros
          </button>
        </div>

        {/* Category pills */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory ? 'bg-primary text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Todas
            </button>
            {(categories ?? []).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.name ? 'bg-primary text-white' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </motion.div>
        )}

        {selectedCategory && (
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-stone-500">Filtrando por:</span>
            <button
              onClick={() => setSelectedCategory(null)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {selectedCategory} <X size={14} />
            </button>
          </div>
        )}

        <p className="text-sm text-stone-400 mb-6">{filtered.length} experiencias encontradas</p>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : (
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <StaggerItem key={event.id}>
              <Link to={`/evento/${event.slug}`} className="block bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-stone-100">
                <div className="relative h-52 overflow-hidden">
                  <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase rounded-full text-stone-700">
                    {event.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {event.dateStart}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {event.city}</span>
                  </div>
                  <h3 className="font-semibold text-stone-900 mb-1 leading-snug">{event.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2 mb-4">{event.shortDescription}</p>
                  <div className="pt-3 border-t border-stone-100">
                    <span className="text-primary font-bold text-sm">
                      {event.price === 0 ? 'Gratis' : formatPrice(event.price)}
                    </span>
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
        )}
      </div>
    </div>
  );
}
