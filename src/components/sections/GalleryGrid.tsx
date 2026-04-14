import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

const galleryImages = [
  { src: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&q=80&auto=format&fit=crop', title: 'Vendimia del Itata', span: 'col-span-2 row-span-2' },
  { src: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80&auto=format&fit=crop', title: 'Senderismo en Nevados', span: '' },
  { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80&auto=format&fit=crop', title: 'Gastronomía Regional', span: '' },
  { src: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&q=80&auto=format&fit=crop', title: 'Feria Costumbrista', span: '' },
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&q=80&auto=format&fit=crop', title: 'Música en Vivo', span: '' },
  { src: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&q=80&auto=format&fit=crop', title: 'Cabalgata Precordillera', span: 'col-span-2' },
  { src: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80&auto=format&fit=crop', title: 'Cerámica Artesanal', span: '' },
  { src: 'https://images.unsplash.com/photo-1502680390548-bdbac40f7154?w=600&q=80&auto=format&fit=crop', title: 'Surf en Cobquecura', span: '' },
];

export default function GalleryGrid() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <section className="py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-6">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-3 text-center">
            Momentos que inspiran
          </h2>
          <p className="text-stone-500 text-center mb-12 max-w-lg mx-auto">
            Imágenes reales de experiencias vividas en la región. Cada foto cuenta una historia.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[180px] md:auto-rows-[200px]">
          {galleryImages.map((img, idx) => (
            <AnimatedSection key={idx} variant="scaleIn" delay={idx * 0.05} className={img.span}>
              <button
                onClick={() => setLightbox(idx)}
                className="relative w-full h-full rounded-xl overflow-hidden group cursor-pointer block"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                  <span className="text-white font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {img.title}
                  </span>
                </div>
              </button>
            </AnimatedSection>
          ))}
        </div>

        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X size={32} />
              </button>
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                src={galleryImages[lightbox].src.replace('w=600', 'w=1400')}
                alt={galleryImages[lightbox].title}
                className="max-w-full max-h-[85vh] rounded-xl object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
