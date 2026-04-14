import { useState, useEffect, createContext, useContext, useCallback, type ReactNode } from 'react';

interface LocationState {
  lat: number | null;
  lng: number | null;
  city: string | null;
  loading: boolean;
  error: string | null;
  requested: boolean;
  requestLocation: () => void;
  distanceTo: (lat: number, lng: number) => number | null;
}

const LocationContext = createContext<LocationState>({
  lat: null, lng: null, city: null, loading: false, error: null, requested: false,
  requestLocation: () => {},
  distanceTo: () => null,
});

export const useLocation = () => useContext(LocationContext);

// Haversine formula – distance in km
function haversine(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Reverse-geocode via Nominatim (free, no API key)
async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=es`,
      { headers: { 'User-Agent': 'ExploraChile/1.0' } }
    );
    const data = await res.json();
    return data.address?.city || data.address?.town || data.address?.village || null;
  } catch {
    return null;
  }
}

const STORAGE_KEY = 'explora_user_location';

export function LocationProvider({ children }: { children: ReactNode }) {
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requested, setRequested] = useState(false);

  // Restore from localStorage on mount, or auto-request (native browser prompt)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { lat: sLat, lng: sLng, city: sCity } = JSON.parse(saved);
        setLat(sLat);
        setLng(sLng);
        setCity(sCity);
        setRequested(true);
        return;
      }
    } catch { /* ignore */ }
    // Auto-request triggers the native browser geolocation dialog
    requestLocation();
  }, []);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Tu navegador no soporta geolocalización');
      return;
    }
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setLat(latitude);
        setLng(longitude);
        const cityName = await reverseGeocode(latitude, longitude);
        setCity(cityName);
        setLoading(false);
        setRequested(true);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ lat: latitude, lng: longitude, city: cityName }));
        } catch { /* ignore */ }
      },
      (err) => {
        setLoading(false);
        setRequested(true);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Permiso de ubicación denegado');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Ubicación no disponible');
            break;
          default:
            setError('No se pudo obtener la ubicación');
        }
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
  }, []);

  const distanceTo = useCallback(
    (targetLat: number, targetLng: number) => {
      if (lat === null || lng === null) return null;
      return Math.round(haversine(lat, lng, targetLat, targetLng));
    },
    [lat, lng]
  );

  return (
    <LocationContext.Provider value={{ lat, lng, city, loading, error, requested, requestLocation, distanceTo }}>
      {children}
    </LocationContext.Provider>
  );
}
