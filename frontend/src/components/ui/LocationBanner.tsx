import { MapPin, Navigation, X } from 'lucide-react';
import { useLocation } from '../../lib/location';
import { useState } from 'react';

export default function LocationBanner() {
  const { requested, loading, city, error, requestLocation } = useLocation();
  const [dismissed, setDismissed] = useState(false);

  // Don't show if already requested or dismissed
  if (requested || dismissed) return null;

  return (
    <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Navigation size={16} className="text-primary" />
          </div>
          <p className="text-stone-700">
            <span className="font-semibold">¿Dónde estás?</span>{' '}
            <span className="hidden sm:inline">Activa tu ubicación para ver experiencias cerca de ti y distancias aproximadas.</span>
            <span className="sm:hidden">Activa tu ubicación para experiencias cercanas.</span>
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={requestLocation}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
          >
            <MapPin size={14} />
            {loading ? 'Buscando...' : 'Activar'}
          </button>
          <button onClick={() => setDismissed(true)} className="p-1.5 text-stone-400 hover:text-stone-600">
            <X size={16} />
          </button>
        </div>
      </div>
      {error && (
        <div className="max-w-7xl mx-auto px-6 pb-2">
          <p className="text-xs text-red-500">{error}</p>
        </div>
      )}
    </div>
  );
}
