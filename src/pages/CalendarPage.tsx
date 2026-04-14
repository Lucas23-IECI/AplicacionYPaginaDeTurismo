import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Clock } from 'lucide-react';
import { events, formatPrice } from '../data/events';
import AnimatedSection from '../components/ui/AnimatedSection';

const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(3); // Abril
  const [currentYear] = useState(2026);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((e) => e.dateStart === dateStr || (e.dateEnd && e.dateStart <= dateStr && e.dateEnd >= dateStr));
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection variant="fadeUp">
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 mb-4">Calendario</h1>
          <p className="text-stone-500 text-lg mb-10 max-w-xl">Encuentra actividades por fecha y planifica tu próxima aventura.</p>
        </AnimatedSection>

        {/* Month navigation */}
        <div className="flex items-center justify-between mb-8 bg-white rounded-2xl border border-stone-200 p-4">
          <button onClick={() => setCurrentMonth((m) => Math.max(0, m - 1))} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-xl font-display text-stone-900">{months[currentMonth]} {currentYear}</h2>
          <button onClick={() => setCurrentMonth((m) => Math.min(11, m + 1))} className="p-2 hover:bg-stone-100 rounded-lg transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Calendar grid */}
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden">
          <div className="grid grid-cols-7">
            {['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'].map((d) => (
              <div key={d} className="p-3 text-center text-xs font-bold text-stone-400 uppercase tracking-wider border-b border-stone-100">{d}</div>
            ))}
            {Array.from({ length: adjustedFirst }).map((_, i) => (
              <div key={`empty-${i}`} className="p-3 min-h-[100px] border-b border-r border-stone-50" />
            ))}
            {days.map((day) => {
              const dayEvents = getEventsForDay(day);
              return (
                <div key={day} className={`p-2 min-h-[100px] border-b border-r border-stone-50 ${dayEvents.length > 0 ? 'bg-primary/3' : ''}`}>
                  <span className={`text-sm font-medium ${dayEvents.length > 0 ? 'text-primary' : 'text-stone-600'}`}>{day}</span>
                  <div className="mt-1 space-y-1">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <Link key={ev.id} to={`/evento/${ev.slug}`} className="block text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded truncate hover:bg-primary/20 transition-colors">
                        {ev.title}
                      </Link>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-[10px] text-stone-400">+{dayEvents.length - 2} más</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming list */}
        <h3 className="text-2xl font-display text-stone-900 mt-12 mb-6">Próximos este mes</h3>
        <div className="space-y-3">
          {events.slice(0, 6).map((event) => (
            <Link key={event.id} to={`/evento/${event.slug}`} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-stone-100 hover:border-primary/30 transition-colors group">
              <img src={event.images[0]} alt={event.title} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-stone-900 truncate group-hover:text-primary transition-colors">{event.title}</h4>
                <div className="flex items-center gap-3 text-xs text-stone-400 mt-1">
                  <span className="flex items-center gap-1"><Clock size={12} /> {event.dateStart}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} /> {event.city}</span>
                </div>
              </div>
              <span className="text-sm font-bold text-primary">{event.price === 0 ? 'Gratis' : formatPrice(event.price)}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
