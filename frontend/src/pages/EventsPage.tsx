import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, SlidersHorizontal, X, Grid3X3, Map as MapIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useEvents, useCategories } from '../lib/hooks';
import AnimatedSection from '../components/ui/AnimatedSection';
import StaggerContainer, { StaggerItem } from '../components/ui/StaggerContainer';
import { SkeletonGrid } from '../components/ui/Skeleton';
import EventCard from '../components/shared/EventCard';
import Breadcrumb from '../components/shared/Breadcrumb';
import { usePageTitle } from '../lib/usePageTitle';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { formatPrice } from '../lib/hooks';

// fix default marker icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34],
});

const PAGE_SIZE = 12;

export default function EventsPage() {
  usePageTitle('Experiencias');
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('q') ?? '');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get('cat') ?? null);
  const [selectedDate, setSelectedDate] = useState(searchParams.get('fecha') ?? '');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [page, setPage] = useState(Number(searchParams.get('page') ?? '1'));
  const { data: events, loading } = useEvents();
  const { data: categories } = useCategories();

  useEffect(() => {
    setSearch(searchParams.get('q') ?? '');
    setSelectedCategory(searchParams.get('cat') || null);
    setSelectedDate(searchParams.get('fecha') ?? '');
    setPage(Number(searchParams.get('page') ?? '1'));
  }, [searchParams]);

  // Persist filter changes to URL
  const updateParams = (updates: Record<string, string | null>) => {
    const next = new URLSearchParams(searchParams);
    for (const [k, v] of Object.entries(updates)) {
      if (v) next.set(k, v); else next.delete(k);
    }
    setSearchParams(next, { replace: true });
  };

  const handleSearch = (v: string) => { setSearch(v); updateParams({ q: v || null, page: null }); };
  const handleCategory = (cat: string | null) => { setSelectedCategory(cat); updateParams({ cat, page: null }); };
  const handlePage = (p: number) => { setPage(p); updateParams({ page: p > 1 ? String(p) : null }); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  const filtered = useMemo(() => (events ?? []).filter((e) => {
    const matchesSearch = !search || e.title.toLowerCase().includes(search.toLowerCase()) || e.city.toLowerCase().includes(search.toLowerCase());
    const matchesCat = !selectedCategory || e.categorySlug === selectedCategory;
    const matchesDate = !selectedDate || e.dateStart === selectedDate || (e.dateEnd && e.dateStart <= selectedDate && e.dateEnd >= selectedDate);
    return matchesSearch && matchesCat && matchesDate;
  }), [events, search, selectedCategory, selectedDate]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <Breadcrumb items={[{ label: 'Experiencias' }]} />

        <AnimatedSection variant="fadeUp">
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 dark:text-white mb-4">Todas las Experiencias</h1>
          <p className="text-stone-500 dark:text-zinc-400 text-lg mb-10 max-w-xl">
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
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-stone-700 dark:text-zinc-300 hover:border-primary transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filtros
            </button>
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'map' : 'grid')}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl border border-stone-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-sm font-medium text-stone-700 dark:text-zinc-300 hover:border-primary transition-colors"
              title={viewMode === 'grid' ? 'Ver mapa' : 'Ver grilla'}
            >
              {viewMode === 'grid' ? <MapIcon size={16} /> : <Grid3X3 size={16} />}
            </button>
          </div>
        </div>

        {/* Category pills */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="flex flex-wrap gap-2 mb-8"
          >
            <button
              onClick={() => handleCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                !selectedCategory ? 'bg-primary text-white' : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-zinc-700'
              }`}
            >
              Todas
            </button>
            {(categories ?? []).map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategory(cat.slug)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === cat.slug ? 'bg-primary text-white' : 'bg-stone-100 dark:bg-zinc-800 text-stone-600 dark:text-zinc-300 hover:bg-stone-200 dark:hover:bg-zinc-700'
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
              onClick={() => handleCategory(null)}
              className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {(categories ?? []).find(c => c.slug === selectedCategory)?.name ?? selectedCategory} <X size={14} />
            </button>
          </div>
        )}

        <p className="text-sm text-stone-400 dark:text-zinc-500 mb-6">{filtered.length} experiencias encontradas</p>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : viewMode === 'map' ? (
          <div className="rounded-2xl overflow-hidden border border-stone-200 h-[600px]">
            <MapContainer center={[-36.62, -72.42]} zoom={9} className="h-full w-full" scrollWheelZoom>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; OpenStreetMap' />
              {filtered.filter(e => e.lat && e.lng).map(e => (
                <Marker key={e.id} position={[e.lat, e.lng]} icon={defaultIcon}>
                  <Popup>
                    <div className="min-w-[180px]">
                      <Link to={`/evento/${e.slug}`} className="font-semibold text-sm hover:text-primary">{e.title}</Link>
                      <p className="text-xs text-stone-500 mt-1">{e.city} · {e.dateStart}</p>
                      <p className="text-xs font-bold text-primary mt-1">{e.price === 0 ? 'Gratis' : formatPrice(e.price)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-display text-stone-700 dark:text-zinc-300 mb-2">No se encontraron experiencias</h3>
            <p className="text-stone-500 dark:text-zinc-500 mb-6">Intenta con otros filtros o una búsqueda diferente.</p>
            <button onClick={() => { handleSearch(''); handleCategory(null); setSelectedDate(''); updateParams({ q: null, cat: null, fecha: null, page: null }); }}
              className="px-5 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:bg-primary-hover transition-colors">
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginated.map((event) => (
                <StaggerItem key={event.id}>
                  <EventCard event={event} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                <button onClick={() => handlePage(Math.max(1, page - 1))} disabled={page <= 1}
                  className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-30 transition-colors">
                  <ChevronLeft size={18} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button key={p} onClick={() => handlePage(p)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${p === page ? 'bg-primary text-white' : 'border border-stone-200 text-stone-600 hover:bg-stone-50'}`}>
                    {p}
                  </button>
                ))}
                <button onClick={() => handlePage(Math.min(totalPages, page + 1))} disabled={page >= totalPages}
                  className="p-2 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-30 transition-colors">
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
