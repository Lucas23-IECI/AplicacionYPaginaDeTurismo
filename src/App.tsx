import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedEvents from './components/FeaturedEvents';
import CalendarPreview from './components/CalendarPreview';
import Destinations from './components/Destinations';
import EventSpotlight from './components/EventSpotlight';
import CurationProcess from './components/CurationProcess';
import AdvertiserCTA from './components/AdvertiserCTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="bg-white text-stone-900 font-body min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedEvents />
        <CalendarPreview />
        <Destinations />
        <EventSpotlight />
        <CurationProcess />
        <AdvertiserCTA />
      </main>
      <Footer />
    </div>
  );
}
