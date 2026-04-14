import { createBrowserRouter } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import PortalLayout from './layouts/PortalLayout';
import LegalLayout from './layouts/LegalLayout';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import EventDetailPage from './pages/EventDetailPage';
import DestinationDetailPage from './pages/DestinationDetailPage';
import CalendarPage from './pages/CalendarPage';
import AdvertisersPage from './pages/AdvertisersPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminEvents from './pages/admin/AdminEvents';
import AdminAdvertisers from './pages/admin/AdminAdvertisers';
import AdminTestimonials from './pages/admin/AdminTestimonials';
import AdminFAQ from './pages/admin/AdminFAQ';
import AdminNewsletter from './pages/admin/AdminNewsletter';
import AdminMessages from './pages/admin/AdminMessages';
import PortalDashboard from './pages/portal/PortalDashboard';
import PortalNewEvent from './pages/portal/PortalNewEvent';
import PortalProfile from './pages/portal/PortalProfile';
import PortalSubscription from './pages/portal/PortalSubscription';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'eventos', element: <EventsPage /> },
      { path: 'evento/:slug', element: <EventDetailPage /> },
      { path: 'destinos/:slug', element: <DestinationDetailPage /> },
      { path: 'calendario', element: <CalendarPage /> },
      { path: 'anunciantes', element: <AdvertisersPage /> },
      { path: 'contacto', element: <ContactPage /> },
      { path: 'nosotros', element: <AboutPage /> },
      { path: 'login', element: <LoginPage /> },
    ],
  },
  {
    path: '/legal',
    element: <LegalLayout />,
    children: [
      { path: 'privacidad', element: <PrivacyPage /> },
      { path: 'terminos', element: <TermsPage /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: 'eventos', element: <AdminEvents /> },
      { path: 'anunciantes', element: <AdminAdvertisers /> },
      { path: 'testimonios', element: <AdminTestimonials /> },
      { path: 'faq', element: <AdminFAQ /> },
      { path: 'newsletter', element: <AdminNewsletter /> },
      { path: 'mensajes', element: <AdminMessages /> },
    ],
  },
  {
    path: '/portal',
    element: <PortalLayout />,
    children: [
      { index: true, element: <PortalDashboard /> },
      { path: 'nuevo-evento', element: <PortalNewEvent /> },
      { path: 'perfil', element: <PortalProfile /> },
      { path: 'suscripcion', element: <PortalSubscription /> },
    ],
  },
]);
