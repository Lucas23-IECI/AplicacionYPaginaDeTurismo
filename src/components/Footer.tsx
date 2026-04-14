export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <span className="text-2xl font-display text-white">Explora Chile</span>
            <p className="text-stone-400 text-sm mt-4 leading-relaxed max-w-xs">
              La plataforma de turismo curado para descubrir las mejores experiencias de tu región.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-4">Explorar</h4>
            <ul className="space-y-3">
              <li><a href="#experiencias" className="text-sm text-stone-300 hover:text-white transition-colors">Experiencias</a></li>
              <li><a href="#destinos" className="text-sm text-stone-300 hover:text-white transition-colors">Destinos</a></li>
              <li><a href="#calendario" className="text-sm text-stone-300 hover:text-white transition-colors">Calendario</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-4">Para Anunciantes</h4>
            <ul className="space-y-3">
              <li><a href="#anunciantes" className="text-sm text-stone-300 hover:text-white transition-colors">Publicar actividad</a></li>
              <li><a href="#" className="text-sm text-stone-300 hover:text-white transition-colors">Planes y precios</a></li>
              <li><a href="#" className="text-sm text-stone-300 hover:text-white transition-colors">Portal de anunciantes</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-stone-400 mb-4">Legal</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-stone-300 hover:text-white transition-colors">Privacidad</a></li>
              <li><a href="#" className="text-sm text-stone-300 hover:text-white transition-colors">Términos</a></li>
              <li><a href="#" className="text-sm text-stone-300 hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-stone-500 text-xs">&copy; 2026 Explora Chile. Todos los derechos reservados.</p>
          <p className="text-stone-500 text-xs">
            Desarrollado por{' '}
            <a
              href="https://purocode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-300 hover:text-white transition-colors font-medium"
            >
              PuroCode
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
