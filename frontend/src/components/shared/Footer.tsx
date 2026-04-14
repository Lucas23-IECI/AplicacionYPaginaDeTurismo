import { Link } from 'react-router-dom';
import { MapPin, Mail, Phone, Instagram, Facebook, Youtube, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-stone-900 text-stone-300">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="text-2xl font-display text-white block mb-4">
              Explora Chile
            </Link>
            <p className="text-sm leading-relaxed text-stone-400 mb-6">
              Descubre experiencias auténticas en la Región de Ñuble y Biobío. 
              Conectamos turistas con la cultura, naturaleza y tradiciones del sur de Chile.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={16} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-stone-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-white text-sm mb-4 uppercase tracking-wider">Explorar</h4>
            <ul className="space-y-2.5">
              <li><Link to="/eventos" className="text-sm hover:text-white transition-colors">Experiencias</Link></li>
              <li><Link to="/calendario" className="text-sm hover:text-white transition-colors">Calendario</Link></li>
              <li><Link to="/destinos" className="text-sm hover:text-white transition-colors">Destinos</Link></li>
              <li><Link to="/nosotros" className="text-sm hover:text-white transition-colors">Nosotros</Link></li>
              <li><Link to="/contacto" className="text-sm hover:text-white transition-colors">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-sm mb-4 uppercase tracking-wider">Anunciantes</h4>
            <ul className="space-y-2.5">
              <li><Link to="/anunciantes" className="text-sm hover:text-white transition-colors">Publica tu Evento</Link></li>
              <li><Link to="/login" className="text-sm hover:text-white transition-colors">Iniciar Sesión</Link></li>
              <li><Link to="/anunciantes" className="text-sm hover:text-white transition-colors">Planes y Precios</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white text-sm mb-4 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-primary" />
                Ñuble y Biobío, Chile
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Mail size={16} className="shrink-0 text-primary" />
                hola@explorachile.cl
              </li>
              <li className="flex items-center gap-2.5 text-sm">
                <Phone size={16} className="shrink-0 text-primary" />
                +56 9 1234 5678
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Explora Chile. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/legal/privacidad" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
              Privacidad
            </Link>
            <Link to="/legal/terminos" className="text-xs text-stone-500 hover:text-stone-300 transition-colors">
              Términos
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="absolute right-6 -top-5 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary-hover transition-colors"
        aria-label="Volver arriba"
      >
        <ArrowUp size={18} />
      </button>
    </footer>
  );
}
