import { usePageTitle } from '../lib/usePageTitle';
import Hero from '../components/sections/Hero';
import StatsSection from '../components/sections/StatsSection';
import FeaturedEvents from '../components/sections/FeaturedEvents';
import CalendarPreview from '../components/sections/CalendarPreview';
import Destinations from '../components/sections/Destinations';
import MapPreview from '../components/sections/MapPreview';
import EventSpotlight from '../components/sections/EventSpotlight';
import GalleryGrid from '../components/sections/GalleryGrid';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import CurationProcess from '../components/sections/CurationProcess';
import FAQSection from '../components/sections/FAQSection';
import NewsletterSignup from '../components/sections/NewsletterSignup';
import AdvertiserCTA from '../components/sections/AdvertiserCTA';

export default function HomePage() {
  usePageTitle();
  return (
    <>
      <Hero />
      <StatsSection />
      <FeaturedEvents />
      <CalendarPreview />
      <Destinations />
      <MapPreview />
      <EventSpotlight />
      <GalleryGrid />
      <TestimonialsSection />
      <CurationProcess />
      <FAQSection />
      <NewsletterSignup />
      <AdvertiserCTA />
    </>
  );
}
