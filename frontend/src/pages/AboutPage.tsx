import { Heart, Eye, Target, Users } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import StaggerContainer, { StaggerItem } from '../components/ui/StaggerContainer';

const values = [
  { icon: Eye, title: 'Curación', desc: 'Seleccionamos y presentamos solo experiencias que cumplen un estándar editorial.' },
  { icon: Heart, title: 'Autenticidad', desc: 'Promovemos la cultura, tradiciones y paisajes genuinos de la región.' },
  { icon: Target, title: 'Impacto Local', desc: 'Apoyamos emprendedores y organizadores locales con herramientas profesionales.' },
  { icon: Users, title: 'Comunidad', desc: 'Construimos puentes entre turistas, residentes y organizadores.' },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero */}
        <AnimatedSection variant="fadeUp" className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display text-stone-900 mb-4">Sobre Nostros</h1>
          <p className="text-stone-500 text-lg max-w-2xl mx-auto">
            Somos un equipo apasionado por el turismo regional y la calidad digital.
            Queremos que cada evento y destino de Ñuble y Biobío se presente de la forma que merece.
          </p>
        </AnimatedSection>

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <AnimatedSection variant="fadeRight">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop"
              alt="Equipo trabajando"
              className="rounded-2xl w-full h-80 object-cover"
            />
          </AnimatedSection>
          <AnimatedSection variant="fadeLeft" delay={0.1}>
            <h2 className="text-3xl font-display text-stone-900 mb-4">Nuestra Historia</h2>
            <p className="text-stone-600 leading-relaxed mb-4">
              Explora Chile nació de la frustración de buscar actividades en la región y encontrar solo
              páginas desactualizadas, con información incompleta y diseño poco atractivo.
            </p>
            <p className="text-stone-600 leading-relaxed mb-4">
              Creemos que la Región de Ñuble y Biobío tiene un potencial turístico enorme que merece
              una vitrina de nivel internacional. Por eso creamos una plataforma curada donde cada
              experiencia es revisada, mejorada y presentada con calidad premium.
            </p>
            <p className="text-stone-600 leading-relaxed">
              No somos un directorio más. Somos un equipo editorial que trabaja mano a mano con
              los organizadores para que cada publicación sea irresistible.
            </p>
          </AnimatedSection>
        </div>

        {/* Values */}
        <AnimatedSection variant="fadeUp" className="text-center mb-10">
          <h2 className="text-3xl font-display text-stone-900 mb-2">Nuestros Valores</h2>
        </AnimatedSection>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {values.map((v) => (
            <StaggerItem key={v.title}>
              <div className="text-center p-6 bg-cream rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-stone-900 mb-2">{v.title}</h3>
                <p className="text-sm text-stone-500">{v.desc}</p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Mission */}
        <div className="bg-stone-900 text-white rounded-3xl p-12 md:p-16 text-center">
          <h2 className="text-3xl font-display mb-4">Nuestra Misión</h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Democratizar el acceso a experiencias turísticas de calidad en el sur de Chile,
            conectando a las personas con la cultura, naturaleza y tradiciones de su territorio
            a través de una plataforma digital que eleva el estándar de la industria local.
          </p>
        </div>
      </div>
    </div>
  );
}
