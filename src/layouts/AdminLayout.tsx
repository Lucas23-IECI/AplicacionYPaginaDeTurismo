import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, Users, MessageSquare, Star, HelpCircle, Mail, LogOut } from 'lucide-react';

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/admin/eventos', icon: CalendarDays, label: 'Eventos' },
  { to: '/admin/anunciantes', icon: Users, label: 'Anunciantes' },
  { to: '/admin/testimonios', icon: Star, label: 'Testimonios' },
  { to: '/admin/faq', icon: HelpCircle, label: 'FAQ' },
  { to: '/admin/newsletter', icon: Mail, label: 'Newsletter' },
  { to: '/admin/mensajes', icon: MessageSquare, label: 'Mensajes' },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-stone-50 flex">
      <aside className="w-64 bg-stone-900 text-white flex flex-col shrink-0 fixed h-full z-40">
        <div className="p-6 border-b border-stone-700">
          <span className="text-lg font-display">Explora Chile</span>
          <p className="text-xs text-stone-400 mt-1">Panel de Administración</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? 'bg-primary text-white' : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-stone-700">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-stone-400 hover:text-white hover:bg-stone-800 transition-colors w-full"
          >
            <LogOut size={18} />
            Volver al sitio
          </button>
        </div>
      </aside>
      <div className="flex-1 ml-64">
        <header className="bg-white border-b border-stone-200 px-8 py-4 sticky top-0 z-30">
          <h1 className="text-lg font-semibold text-stone-800">Administración</h1>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
