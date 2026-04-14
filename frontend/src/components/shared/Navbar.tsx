import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LayoutDashboard, LogIn, Sun, Moon } from 'lucide-react';
import { useAuth, useRole } from '../../lib/auth';
import { useDarkMode } from '../../lib/darkMode';

const navLinks = [
  { to: '/eventos', label: 'Experiencias' },
  { to: '/destinos', label: 'Destinos' },
  { to: '/calendario', label: 'Calendario' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { user, signOut } = useAuth();
  const { role } = useRole();
  const { theme, toggle } = useDarkMode();
  const dashboardPath = role === 'admin' ? '/admin' : role === 'advertiser' ? '/portal' : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navBg = !isHome || scrolled
    ? 'bg-white/95 dark:bg-zinc-900/95 backdrop-blur-lg border-b border-warm-border dark:border-zinc-800 shadow-sm'
    : 'bg-transparent';

  const textColor = !isHome || scrolled ? 'text-stone-600 dark:text-zinc-400' : 'text-white/90';
  const logoColor = !isHome || scrolled ? 'text-primary' : 'text-white';
  const hoverColor = !isHome || scrolled ? 'hover:text-primary' : 'hover:text-white';
  const btnStyle = !isHome || scrolled
    ? 'bg-primary text-white hover:bg-primary-hover'
    : 'bg-white/15 text-white border border-white/30 hover:bg-white/25';

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className={`text-2xl font-display transition-colors ${logoColor}`}>
          Explora Chile
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${hoverColor} ${
                  isActive ? (!isHome || scrolled ? 'text-primary' : 'text-white font-bold') : textColor
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {user && dashboardPath ? (
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} className={`p-2 rounded-full transition-colors ${textColor} ${hoverColor}`} aria-label="Cambiar tema">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to={dashboardPath}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${btnStyle}`}
            >
              <LayoutDashboard size={16} />
              {role === 'admin' ? 'Admin' : 'Mi Panel'}
            </Link>
            <button
              onClick={() => signOut()}
              className={`text-sm font-medium transition-colors ${textColor} ${hoverColor}`}
            >
              Salir
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <button onClick={toggle} className={`p-2 rounded-full transition-colors ${textColor} ${hoverColor}`} aria-label="Cambiar tema">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link
              to="/anunciantes"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${btnStyle}`}
            >
              Portal Anunciantes
            </Link>
          </div>
        )}

        <button
          className={`md:hidden p-2 transition-colors ${!isHome || scrolled ? 'text-stone-700' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white dark:bg-zinc-900 border-t border-warm-border dark:border-zinc-800 overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `block text-sm font-medium py-3 px-2 rounded-lg transition-colors ${
                      isActive ? 'text-primary bg-primary/5' : 'text-stone-700 dark:text-zinc-300 hover:bg-stone-50 dark:hover:bg-zinc-800'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <button
                onClick={toggle}
                className="flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-zinc-400 py-3 px-2 w-full text-left"
              >
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
              </button>
              {user && dashboardPath ? (
                <>
                  <Link
                    to={dashboardPath}
                    className="flex items-center gap-2 text-sm font-semibold text-primary py-3 px-2"
                  >
                    <LayoutDashboard size={16} />
                    {role === 'admin' ? 'Admin' : 'Mi Panel'}
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block text-sm font-medium text-stone-500 py-3 px-2 w-full text-left"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <Link
                  to="/anunciantes"
                  className="block text-sm font-semibold text-primary py-3 px-2"
                >
                  Portal Anunciantes
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
