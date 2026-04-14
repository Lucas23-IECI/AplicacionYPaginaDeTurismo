import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Tag, ArrowLeft, Edit, Eye } from 'lucide-react';
import { useEventById, formatPrice } from '../../lib/hooks';
import StatusBadge from '../../components/admin/StatusBadge';
import Breadcrumb from '../../components/shared/Breadcrumb';

export default function PortalEventDetail() {
  const { id } = useParams();
  const { data: event, loading } = useEventById(id);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-display text-stone-900 mb-2">Evento no encontrado</h2>
        <Link to="/portal" className="text-primary font-semibold hover:underline">Volver a Mis Eventos</Link>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb items={[{ label: 'Mis Eventos', to: '/portal' }, { label: event.title }]} />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-display text-stone-900">{event.title}</h1>
          <div className="flex items-center gap-3 mt-2">
            <StatusBadge status={event.status} />
            <span className="text-sm text-stone-400">Creado: {new Date(event.createdAt).toLocaleDateString('es-CL')}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {event.status === 'approved' && (
            <Link to={`/evento/${event.slug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 text-sm font-medium text-stone-600 hover:bg-stone-50 transition-colors">
              <Eye size={16} /> Ver Público
            </Link>
          )}
          {(event.status === 'draft' || event.status === 'rejected') && (
            <Link to={`/portal/eventos/${event.id}/editar`} className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-primary-hover transition-colors">
              <Edit size={16} /> Editar
            </Link>
          )}
        </div>
      </div>

      {event.status === 'rejected' && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-sm text-red-700">
          Tu evento fue rechazado. Puedes editarlo y reenviarlo para una nueva revisión.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          {event.images.length > 0 && (
            <div className="rounded-xl overflow-hidden border border-stone-200">
              <img src={event.images[0]} alt={event.title} className="w-full h-64 object-cover" />
              {event.images.length > 1 && (
                <div className="flex gap-2 p-3 bg-stone-50">
                  {event.images.slice(1, 5).map((img, i) => (
                    <img key={i} src={img} alt="" className="w-16 h-16 rounded-lg object-cover" />
                  ))}
                  {event.images.length > 5 && (
                    <div className="w-16 h-16 rounded-lg bg-stone-200 flex items-center justify-center text-xs text-stone-600 font-bold">
                      +{event.images.length - 5}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h3 className="font-medium text-stone-900 mb-3">Descripción</h3>
            <p className="text-sm text-stone-600 leading-relaxed whitespace-pre-line">{event.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-stone-200 p-5 space-y-4">
            <div className="text-center pb-4 border-b border-stone-100">
              <p className="text-2xl font-bold text-primary">{event.price === 0 ? 'Gratis' : formatPrice(event.price)}</p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Calendar size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-stone-400">Fecha</p>
                <p className="font-medium text-stone-800">{event.dateStart}{event.dateEnd ? ` – ${event.dateEnd}` : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Clock size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-stone-400">Horario</p>
                <p className="font-medium text-stone-800">{event.timeStart}{event.timeEnd ? ` – ${event.timeEnd}` : ''}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <MapPin size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-stone-400">Ubicación</p>
                <p className="font-medium text-stone-800">{event.address}, {event.city}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Tag size={16} className="text-primary shrink-0" />
              <div>
                <p className="text-xs text-stone-400">Categoría</p>
                <p className="font-medium text-stone-800">{event.category}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
