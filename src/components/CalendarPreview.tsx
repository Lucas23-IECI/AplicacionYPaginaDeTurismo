import { ArrowRight } from 'lucide-react';

const weekDays = [
  {
    day: 'Lun', date: '13', month: 'Abr',
    events: [{ title: 'Taller de Cerámica Artesanal', city: 'Chillán', time: '10:00' }],
  },
  {
    day: 'Mar', date: '14', month: 'Abr',
    events: [],
  },
  {
    day: 'Mié', date: '15', month: 'Abr',
    events: [{ title: 'Ruta del Vino Itata', city: 'Valle del Itata', time: '11:00' }],
  },
  {
    day: 'Jue', date: '16', month: 'Abr',
    events: [{ title: 'Noche de Jazz en Vivo', city: 'Concepción', time: '21:00' }],
  },
  {
    day: 'Vie', date: '17', month: 'Abr',
    events: [{ title: 'Feria Gastronómica Regional', city: 'Chillán', time: '12:00' }],
  },
  {
    day: 'Sáb', date: '18', month: 'Abr',
    events: [
      { title: 'Vendimia Abierta', city: 'Quillón', time: '10:00' },
      { title: 'Senderismo Guiado', city: 'Nevados', time: '08:00' },
    ],
  },
  {
    day: 'Dom', date: '19', month: 'Abr',
    events: [{ title: 'Mercado Campesino Ñuble', city: 'San Carlos', time: '09:00' }],
  },
];

export default function CalendarPreview() {
  return (
    <section id="calendario" className="py-24 bg-cream scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <div className="md:w-1/3 shrink-0">
            <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">Calendario de Actividades</h2>
            <p className="text-stone-500 mb-8 leading-relaxed">
              Planifica tu semana con las actividades confirmadas en la región. Todo curado y actualizado.
            </p>
            <button className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-hover transition-colors group">
              Ver calendario completo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="md:w-2/3 flex gap-3 overflow-x-auto pb-4 -mx-2 px-2 no-scrollbar">
            {weekDays.map((d, idx) => (
              <div
                key={idx}
                className={`flex-none w-36 rounded-2xl p-4 transition-all ${
                  d.day === 'Sáb'
                    ? 'bg-primary text-white shadow-lg shadow-primary/20'
                    : 'bg-white border border-stone-200'
                }`}
              >
                <div className="text-center mb-3">
                  <span className={`text-[10px] uppercase font-bold tracking-widest ${d.day === 'Sáb' ? 'text-white/70' : 'text-stone-400'}`}>
                    {d.day}
                  </span>
                  <div className={`text-3xl font-display mt-1 ${d.day === 'Sáb' ? 'text-white' : 'text-stone-900'}`}>
                    {d.date}
                  </div>
                  <span className={`text-xs ${d.day === 'Sáb' ? 'text-white/70' : 'text-stone-400'}`}>{d.month}</span>
                </div>
                <div className="space-y-2">
                  {d.events.length === 0 ? (
                    <p className="text-xs text-center text-stone-300">Sin eventos</p>
                  ) : (
                    d.events.map((ev, i) => (
                      <div
                        key={i}
                        className={`text-xs p-2 rounded-lg ${
                          d.day === 'Sáb' ? 'bg-white/15' : 'bg-stone-50'
                        }`}
                      >
                        <p className={`font-semibold leading-tight ${d.day === 'Sáb' ? 'text-white' : 'text-stone-700'}`}>
                          {ev.title}
                        </p>
                        <p className={`mt-0.5 ${d.day === 'Sáb' ? 'text-white/70' : 'text-stone-400'}`}>
                          {ev.time} · {ev.city}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
