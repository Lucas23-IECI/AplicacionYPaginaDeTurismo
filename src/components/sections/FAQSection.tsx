import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { useFAQ } from '../../lib/hooks';

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const { data: faqItems, loading } = useFAQ();

  if (loading || !faqItems?.length) return null;

  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection variant="fadeUp">
          <h2 className="text-3xl md:text-4xl font-display text-stone-900 mb-3 text-center">
            Preguntas Frecuentes
          </h2>
          <p className="text-stone-500 text-center mb-14 max-w-lg mx-auto">
            Todo lo que necesitas saber sobre Explora Chile.
          </p>
        </AnimatedSection>

        <div className="space-y-3">
          {faqItems.map((item, idx) => (
            <AnimatedSection key={item.id} variant="fadeUp" delay={idx * 0.05}>
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-stone-50 transition-colors"
                >
                  <span className="font-semibold text-stone-800 text-sm pr-4">{item.question}</span>
                  <motion.span
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-stone-400"
                  >
                    <ChevronDown size={20} />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openId === item.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-stone-500 text-sm leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
