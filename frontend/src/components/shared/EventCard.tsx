import { Link } from 'react-router-dom';
import { Calendar, MapPin, Heart, Navigation } from 'lucide-react';
import type { Event } from '../../lib/hooks';
import { formatPrice } from '../../lib/hooks';
import { useLocation as useGeo } from '../../lib/location';

interface EventCardProps {
  event: Event;
  /** Override link target (e.g. portal detail instead of public) */
  linkPrefix?: string;
  /** Show status badge for portal/admin views */
  showStatus?: boolean;
}

const statusMap: Record<string, { label: string; cls: string }> = {
  approved: { label: 'Aprobado', cls: 'bg-green-50 text-green-700' },
  pending: { label: 'Pendiente', cls: 'bg-amber-50 text-amber-700' },
  draft: { label: 'Borrador', cls: 'bg-stone-100 text-stone-600' },
  rejected: { label: 'Rechazado', cls: 'bg-red-50 text-red-700' },
  archived: { label: 'Archivado', cls: 'bg-stone-100 text-stone-500' },
};

export default function EventCard({ event, linkPrefix = '/evento', showStatus = false }: EventCardProps) {
  const href = linkPrefix === '/evento' ? `/evento/${event.slug}` : `${linkPrefix}/${event.id}`;
  const status = statusMap[event.status];
  const { distanceTo } = useGeo();
  const distance = event.lat && event.lng ? distanceTo(event.lat, event.lng) : null;

  return (
    <Link
      to={href}
      className="block bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 border border-stone-100"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={event.images[0] || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80&auto=format&fit=crop'}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <span className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-wider uppercase rounded-full text-stone-700">
          {event.category}
        </span>
        {showStatus && status && (
          <span className={`absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full ${status.cls}`}>
            {status.label}
          </span>
        )}
        {!showStatus && event.tag && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-secondary/10 text-secondary">
            {event.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-stone-400 mb-2">
          <span className="flex items-center gap-1"><Calendar size={12} /> {event.dateStart}</span>
          <span className="flex items-center gap-1"><MapPin size={12} /> {event.city}</span>
          {distance !== null && (
            <span className="flex items-center gap-1 text-primary/70"><Navigation size={12} /> {distance} km</span>
          )}
        </div>
        <h3 className="font-semibold text-stone-900 mb-1 leading-snug">{event.title}</h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-4">{event.shortDescription}</p>
        <div className="flex justify-between items-center pt-3 border-t border-stone-100">
          <span className="text-primary font-bold text-sm">
            {event.price === 0 ? 'Gratis' : formatPrice(event.price)}
          </span>
          {!showStatus && (
            <span className="text-stone-300 hover:text-primary transition-colors">
              <Heart size={18} />
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
