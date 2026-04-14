import { Upload, PenLine, BadgeCheck } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { motion } from 'motion/react';

const steps = [
  { icon: Upload, step: '01', title: 'El organizador sube su actividad', description: 'Los anunciantes envían la información de su evento: textos, imágenes, fechas, lugar y detalles a través de su portal exclusivo.' },
  { icon: PenLine, step: '02', title: 'Nuestro equipo revisa y mejora', description: 'Cada publicación pasa por revisión editorial. Corregimos, optimizamos y aseguramos que el contenido cumpla el estándar de calidad.' },
  { icon: BadgeCheck, step: '03', title: 'Se publica con calidad premium', description: 'Solo las actividades aprobadas aparecen en la plataforma. El resultado: una vitrina confiable, profesional y atractiva.' },
];

export default function CurationProcess() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-4">Calidad, no cantidad</h2>
          <p className="text-stone-500 max-w-2xl mx-auto text-lg">
            A diferencia de otros portales, aquí nada se publica automáticamente.
            Cada actividad pasa por un proceso de curación antes de llegar a ti.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-stone-200" />

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-white mb-6 relative z-10"
              >
                <step.icon size={28} />
              </motion.div>
              <div className="text-xs font-bold text-primary tracking-widest uppercase mb-2">Paso {step.step}</div>
              <h3 className="text-lg font-bold text-stone-900 mb-3">{step.title}</h3>
              <p className="text-stone-500 text-sm leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
