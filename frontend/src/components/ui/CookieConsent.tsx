import { useState, useEffect } from 'react';
import { X, Cookie } from 'lucide-react';

const CONSENT_KEY = 'explora_cookie_consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-in slide-in-from-bottom">
      <div className="max-w-4xl mx-auto bg-white border border-stone-200 rounded-2xl shadow-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie size={24} className="text-primary shrink-0 mt-0.5 sm:mt-0" />
        <div className="flex-1">
          <p className="text-sm text-stone-700 leading-relaxed">
            Usamos cookies para mejorar tu experiencia de navegación y analizar el tráfico del sitio.
            Al continuar, aceptas nuestra{' '}
            <a href="/legal/privacidad" className="text-primary underline hover:no-underline">política de privacidad</a>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-sm font-medium text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
          >
            Rechazar
          </button>
          <button
            onClick={accept}
            className="px-5 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            Aceptar
          </button>
          <button onClick={decline} className="p-1 text-stone-400 hover:text-stone-600">
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
