import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, User, CreditCard, LogOut, Sun, Moon, Globe } from 'lucide-react';
import { useDarkMode } from '../lib/darkMode';
import { useAuth } from '../lib/auth';

const navItems = [
  { to: '/portal', icon: LayoutDashboard, label: 'Mis Eventos', end: true },
  { to: '/portal/nuevo-evento', icon: PlusCircle, label: 'Nuevo Evento' },
  { to: '/portal/perfil', icon: User, label: 'Mi Perfil' },
  { to: '/portal/suscripcion', icon: CreditCard, label: 'Suscripción' },
];

export default function PortalLayout() {
  const navigate = useNavigate();
  const { theme, toggle } = useDarkMode();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-zinc-950 flex">
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-stone-200 dark:border-zinc-800 flex flex-col shrink-0 fixed h-full z-40">
        <div className="p-5 border-b border-stone-100 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-secondary rounded-lg flex items-center justify-center">
              <Globe size={16} className="text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-stone-900 dark:text-white">Explora Chile</span>
              <p className="text-[10px] text-stone-400 dark:text-zinc-500 uppercase tracking-wider font-semibold">Portal Anunciantes</p>
            </div>
          </div>
        </div>

        <div className="px-3 pt-4 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 dark:text-zinc-600 px-3">Menú</p>
        </div>
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                  isActive
                    ? 'bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary'
                    : 'text-stone-500 dark:text-zinc-400 hover:bg-stone-50 dark:hover:bg-zinc-800 hover:text-stone-800 dark:hover:text-white'
                }`
              }
            >
              <item.icon size={17} strokeWidth={1.8} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-stone-100 dark:border-zinc-800 space-y-1">
          <button
            onClick={toggle}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-stone-500 dark:text-zinc-400 hover:bg-stone-50 dark:hover:bg-zinc-800 hover:text-stone-800 dark:hover:text-white transition-all w-full"
          >
            {theme === 'dark' ? <Sun size={17} strokeWidth={1.8} /> : <Moon size={17} strokeWidth={1.8} />}
            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] text-stone-500 dark:text-zinc-400 hover:bg-stone-50 dark:hover:bg-zinc-800 hover:text-stone-800 dark:hover:text-white transition-all w-full"
          >
            <LogOut size={17} strokeWidth={1.8} />
            Volver al sitio
          </button>
        </div>
      </aside>

      <div className="flex-1 ml-64">
        <header className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border-b border-stone-200 dark:border-zinc-800 px-8 py-3.5 sticky top-0 z-30 flex items-center justify-between">
          <h1 className="text-sm font-semibold text-stone-800 dark:text-white">Portal de Anunciantes</h1>
          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400 dark:text-zinc-500">{user?.email}</span>
            <button onClick={() => signOut()} className="text-xs text-stone-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 transition-colors">
              Cerrar sesión
            </button>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
