import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, CalendarDays, User, CreditCard, LogOut } from 'lucide-react';

const navItems = [
  { to: '/portal', icon: LayoutDashboard, label: 'Mis Eventos', end: true },
  { to: '/portal/nuevo-evento', icon: PlusCircle, label: 'Nuevo Evento' },
  { to: '/portal/perfil', icon: User, label: 'Mi Perfil' },
  { to: '/portal/suscripcion', icon: CreditCard, label: 'Suscripción' },
];

export default function PortalLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside className="w-64 bg-white border-r border-stone-200 flex flex-col shrink-0 fixed h-full z-40">
        <div className="p-6 border-b border-stone-100">
          <span className="text-lg font-display text-primary">Explora Chile</span>
          <p className="text-xs text-stone-400 mt-1">Portal de Anunciantes</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary/10 text-primary' : 'text-stone-500 hover:bg-stone-50 hover:text-stone-700'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-100">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors w-full"
          >
            <LogOut size={18} />
            Volver al sitio
          </button>
        </div>
      </aside>
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-stone-200 px-8 py-4 sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-stone-800">Portal de Anunciantes</h1>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
