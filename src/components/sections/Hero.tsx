import { MapPin, Search, Calendar, Tag } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80&auto=format&fit=crop"
          alt="Cordillera del sur de Chile"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <div className="max-w-3xl mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-block px-4 py-1.5 bg-accent/20 text-accent-light backdrop-blur-sm rounded-full text-xs font-semibold tracking-wider uppercase mb-8 border border-accent/30"
          >
            Curado por expertos locales
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-5xl md:text-7xl font-display text-white leading-[1.1] mb-6"
          >
            Descubre lo mejor{' '}
            <em className="text-accent-light">de tu región</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-lg md:text-xl text-white/80 max-w-xl leading-relaxed font-body"
          >
            Festivales, ferias, aventuras y gastronomía cerca de ti.
            Cada experiencia verificada y presentada con el estándar que mereces.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="bg-white p-4 md:p-5 rounded-2xl shadow-2xl max-w-5xl"
        >
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            <div className="flex-1 space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 px-1">Ubicación</label>
              <div className="flex items-center gap-2 bg-stone-50 px-4 py-3 rounded-xl">
                <MapPin size={18} className="text-stone-400 shrink-0" />
                <input
                  className="bg-transparent w-full text-stone-800 placeholder:text-stone-400 text-sm font-medium outline-none"
                  placeholder="¿Dónde estás?"
                  type="text"
                />
              </div>
            </div>
            <div className="w-full md:w-32 space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 px-1">Radio</label>
              <div className="bg-stone-50 px-4 py-3 rounded-xl">
                <select className="bg-transparent w-full text-stone-800 text-sm font-medium outline-none cursor-pointer">
                  <option>10 km</option>
                  <option>25 km</option>
                  <option>50 km</option>
                  <option>100 km</option>
                  <option>200 km</option>
                </select>
              </div>
            </div>
            <div className="w-full md:w-40 space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 px-1">Fecha</label>
              <div className="flex items-center gap-2 bg-stone-50 px-4 py-3 rounded-xl">
                <Calendar size={18} className="text-stone-400 shrink-0" />
                <input className="bg-transparent w-full text-stone-800 text-sm font-medium outline-none cursor-pointer" type="date" />
              </div>
            </div>
            <div className="w-full md:w-40 space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400 px-1">Categoría</label>
              <div className="flex items-center gap-2 bg-stone-50 px-4 py-3 rounded-xl">
                <Tag size={18} className="text-stone-400 shrink-0" />
                <select className="bg-transparent w-full text-stone-800 text-sm font-medium outline-none cursor-pointer">
                  <option>Todas</option>
                  <option>Tradición</option>
                  <option>Arte</option>
                  <option>Aventura</option>
                  <option>Gastronomía</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button className="w-full md:w-auto bg-primary text-white px-8 py-3 rounded-xl font-semibold hover:bg-primary-hover transition-colors flex items-center justify-center gap-2">
                <Search size={18} />
                <span>Buscar</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
