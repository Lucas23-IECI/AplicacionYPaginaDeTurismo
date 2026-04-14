import { Link } from 'react-router-dom';
import { MapPin, Home, ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../lib/usePageTitle';

export default function NotFoundPage() {
  usePageTitle('Página no encontrada');
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
          <MapPin size={36} className="text-primary" />
        </div>
        <h1 className="text-6xl font-display text-stone-900 mb-3">404</h1>
        <h2 className="text-xl font-semibold text-stone-700 mb-3">Página no encontrada</h2>
        <p className="text-stone-500 mb-8">
          La página que buscas no existe o fue movida. Pero hay mucho por explorar en la región.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors"
          >
            <Home size={18} /> Ir al Inicio
          </Link>
          <Link
            to="/eventos"
            className="inline-flex items-center justify-center gap-2 border border-stone-200 text-stone-700 px-6 py-3 rounded-xl font-semibold hover:bg-stone-50 transition-colors"
          >
            <ArrowLeft size={18} /> Ver Experiencias
          </Link>
        </div>
      </div>
    </div>
  );
}
