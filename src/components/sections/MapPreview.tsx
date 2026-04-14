import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { events } from '../../data/events';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default marker icon
const icon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const mapEvents = events.filter((e) => e.status === 'approved').slice(0, 10);

export default function MapPreview() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection variant="fadeUp">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-3">Mapa de Experiencias</h2>
              <p className="text-stone-500 max-w-md">
                Explora las actividades disponibles en la región. Cada punto es una experiencia verificada.
              </p>
            </div>
            <Link
              to="/eventos?vista=mapa"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover transition-colors group"
            >
              Ver mapa completo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </AnimatedSection>
        <AnimatedSection variant="scaleIn" delay={0.2}>
          <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-lg h-[400px] md:h-[480px]">
            <MapContainer
              center={[-36.62, -72.10]}
              zoom={9}
              className="w-full h-full z-0"
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapEvents.map((event) => (
                <Marker key={event.id} position={[event.lat, event.lng]} icon={icon}>
                  <Popup>
                    <div className="font-body">
                      <p className="font-bold text-sm">{event.title}</p>
                      <p className="text-xs text-stone-500">{event.city}</p>
                      <p className="text-xs text-primary font-semibold mt-1">
                        {event.price === 0 ? 'Gratis' : `$${event.price.toLocaleString('es-CL')}`}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
