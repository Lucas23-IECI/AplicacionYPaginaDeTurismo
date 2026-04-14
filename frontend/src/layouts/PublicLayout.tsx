import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ScrollProgress from '../components/ui/ScrollProgress';
import PageTransition from '../components/ui/PageTransition';
import { useEffect } from 'react';

export default function PublicLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="bg-white dark:bg-zinc-950 text-stone-900 dark:text-zinc-100 font-body min-h-screen">
      <ScrollProgress />
      <Navbar />
      <main>
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
    </div>
  );
}
