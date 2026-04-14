import { CalendarDays, MapPin, Users, TrendingUp } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import AnimatedCounter from '../ui/AnimatedCounter';

const stats = [
  { icon: CalendarDays, value: 120, suffix: '+', label: 'Eventos Curados' },
  { icon: MapPin, value: 5, suffix: '', label: 'Destinos' },
  { icon: Users, value: 45, suffix: '+', label: 'Anunciantes' },
  { icon: TrendingUp, value: 12000, suffix: '+', label: 'Visitantes' },
];

export default function StatsSection() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <AnimatedSection key={idx} variant="fadeUp" delay={idx * 0.1}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 text-primary mb-4">
                  <stat.icon size={26} />
                </div>
                <div className="text-3xl md:text-4xl font-display text-stone-900 mb-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-stone-500 font-medium">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
