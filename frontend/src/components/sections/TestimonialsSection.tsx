import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { useTestimonials } from '../../lib/hooks';
import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialsSection() {
  const { data: testimonials, loading } = useTestimonials();

  if (loading || !testimonials?.length) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-3 text-center">
            Lo que dicen de nosotros
          </h2>
          <p className="text-stone-500 text-center mb-14 max-w-lg mx-auto">
            Turistas y anunciantes que ya confían en Explora Chile.
          </p>
        </AnimatedSection>

        <AnimatedSection variant="fade" delay={0.2}>
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: true }}
            pagination={{ clickable: true }}
            className="pb-12 !overflow-visible"
          >
            {testimonials.map((t) => (
              <SwiperSlide key={t.id}>
                <div className="bg-white rounded-2xl p-8 border border-stone-100 shadow-sm h-full flex flex-col">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-stone-600 text-sm leading-relaxed flex-1 mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="font-semibold text-sm text-stone-800">{t.name}</p>
                      <p className="text-xs text-stone-400">
                        {t.city} · {t.type === 'tourist' ? 'Turista' : 'Anunciante'}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </AnimatedSection>
      </div>
    </section>
  );
}
