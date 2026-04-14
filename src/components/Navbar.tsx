import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-lg border-b border-warm-border transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <a href="#" className="text-2xl font-display text-primary">
          Explora Chile
        </a>
        <div className="hidden md:flex items-center gap-8">
          <a href="#experiencias" className="text-sm font-medium text-stone-600 hover:text-primary transition-colors">Experiencias</a>
          <a href="#destinos" className="text-sm font-medium text-stone-600 hover:text-primary transition-colors">Destinos</a>
          <a href="#calendario" className="text-sm font-medium text-stone-600 hover:text-primary transition-colors">Calendario</a>
        </div>
        <a
          href="#anunciantes"
          className="hidden md:inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          Portal Anunciantes
        </a>
        <button className="md:hidden p-2 text-stone-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white border-t border-warm-border px-6 py-4 space-y-3">
          <a href="#experiencias" className="block text-sm font-medium text-stone-700 py-2" onClick={() => setIsOpen(false)}>Experiencias</a>
          <a href="#destinos" className="block text-sm font-medium text-stone-700 py-2" onClick={() => setIsOpen(false)}>Destinos</a>
          <a href="#calendario" className="block text-sm font-medium text-stone-700 py-2" onClick={() => setIsOpen(false)}>Calendario</a>
          <a href="#anunciantes" className="block text-sm font-semibold text-primary py-2" onClick={() => setIsOpen(false)}>Portal Anunciantes</a>
        </div>
      )}
    </nav>
  );
}
