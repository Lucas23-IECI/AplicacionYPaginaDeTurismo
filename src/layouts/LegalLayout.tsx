import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function LegalLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white text-stone-900 font-body min-h-screen">
      <nav className="border-b border-stone-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-display text-primary">Explora Chile</Link>
          <Link to="/" className="text-sm text-stone-500 hover:text-primary transition-colors">← Volver al inicio</Link>
        </div>
      </nav>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <Outlet />
      </main>
      <footer className="border-t border-stone-200 py-8 text-center text-xs text-stone-400">
        © 2026 Explora Chile. Todos los derechos reservados.
      </footer>
    </div>
  );
}
