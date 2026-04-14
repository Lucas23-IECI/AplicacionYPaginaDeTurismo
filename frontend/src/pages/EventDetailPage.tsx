import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Clock, ArrowLeft, Share2, Heart, Tag, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useEventBySlug, formatPrice } from '../lib/hooks';
import AnimatedSection from '../components/ui/AnimatedSection';
import Breadcrumb from '../components/shared/Breadcrumb';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function EventDetailPage() {
  const { slug } = useParams();
  const { data: event, loading } = useEventBySlug(slug);
  const [copied, setCopied] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(event ? `Mira esta experiencia: ${event.title}` : '');
    window.open(`https://wa.me/?text=${text}%20${url}`, '_blank');
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16 flex justify-center">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="pt-32 pb-16 text-center">
        <h1 className="text-3xl font-display text-stone-900 mb-4">Evento no encontrado</h1>
        <Link to="/eventos" className="text-primary font-semibold hover:underline">← Volver a experiencias</Link>
      </div>
    );
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.shortDescription,
    startDate: event.dateStart + (event.timeStart ? `T${event.timeStart}` : ''),
    ...(event.dateEnd && { endDate: event.dateEnd + (event.timeEnd ? `T${event.timeEnd}` : '') }),
    location: {
      '@type': 'Place',
      name: event.address,
      address: { '@type': 'PostalAddress', addressLocality: event.city, addressRegion: 'Ñuble', addressCountry: 'CL' },
      ...(event.lat && event.lng && { geo: { '@type': 'GeoCoordinates', latitude: event.lat, longitude: event.lng } }),
    },
    image: event.images[0],
    ...(event.price > 0 && { offers: { '@type': 'Offer', price: event.price, priceCurrency: event.currency || 'CLP', availability: 'https://schema.org/InStock' } }),
  };

  return (
    <div className="pt-20 pb-16">
      {/* Schema.org structured data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero image / Gallery */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[50vh] min-h-[400px]"
      >
        {event.images.length > 1 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            className="h-full w-full [&_.swiper-button-next]:text-white [&_.swiper-button-prev]:text-white [&_.swiper-pagination-bullet-active]:!bg-white"
          >
            {event.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt={`${event.title} ${i + 1}`} className="w-full h-full object-cover" />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img src={event.images[0]} alt={event.title} className="w-full h-full object-cover" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto z-20">
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
        <Breadcrumb items={[{ label: 'Experiencias', to: '/eventos' }, { label: event.title }]} />

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
                <div className="relative flex-1">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    className="w-full py-2.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:bg-stone-50 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Share2 size={16} /> Compartir
                  </button>
                  {showShare && (
                    <div className="absolute top-full mt-2 right-0 bg-white border border-stone-200 rounded-xl shadow-lg p-2 min-w-[180px] z-30">
                      <button onClick={handleWhatsApp} className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-lg flex items-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-green-600"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.174-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 0 0 .612.616l4.529-1.468A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 0 1-5.39-1.587l-.386-.236-2.694.873.9-2.632-.26-.404A9.96 9.96 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" /></svg>
                        WhatsApp
                      </button>
                      <button onClick={() => { handleCopyLink(); setShowShare(false); }} className="w-full text-left px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-lg flex items-center gap-2">
                        {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
                        {copied ? 'Copiado!' : 'Copiar enlace'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
