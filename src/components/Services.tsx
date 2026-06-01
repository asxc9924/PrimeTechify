import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Bot, Palette, TrendingUp, ArrowUpRight } from 'lucide-react';

const services = [
  {
    num: '01',
    icon: Code2,
    title: 'Technology & Development',
    desc: 'Custom platforms, scalable architectures, and cutting-edge web applications built for performance and longevity.',
    tags: ['Full-Stack', 'Mobile Apps', 'Cloud'],
    color: 'from-gold/10 to-transparent',
  },
  {
    num: '02',
    icon: Bot,
    title: 'AI & Automation',
    desc: 'Intelligent workflows, predictive analytics, and autonomous systems that multiply your team\'s output.',
    tags: ['Machine Learning', 'NLP', 'Workflows'],
    color: 'from-gold/10 to-transparent',
  },
  {
    num: '03',
    icon: Palette,
    title: 'Design & Creative',
    desc: 'Brand identities, immersive UI/UX, and creative direction that makes your business impossible to ignore.',
    tags: ['Branding', 'UI/UX', 'Motion'],
    color: 'from-gold/10 to-transparent',
  },
  {
    num: '04',
    icon: TrendingUp,
    title: 'Strategy & Consulting',
    desc: 'Growth roadmaps, market positioning, and operational frameworks built from decades of collective experience.',
    tags: ['Growth Plans', 'Fundraising', 'Ops'],
    color: 'from-gold/10 to-transparent',
  },
];

function TiltCard({ service, index }: { service: typeof services[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('rotateX(0deg) rotateY(0deg)');
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform('rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlowPos({ x: 50, y: 50 });
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.23, 1, 0.32, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative perspective-container"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="relative p-8 lg:p-10 rounded-2xl border border-gold/5 bg-surface/40 backdrop-blur-sm overflow-hidden transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(212,168,83,0.08)]"
        style={{ transform: transform, transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, rgba(212,168,83,0.06), transparent 40%)`,
          }}
        />

        <div className="relative z-10" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-start justify-between mb-8">
            <div className="w-12 h-12 rounded-xl bg-gold/5 border border-gold/10 flex items-center justify-center group-hover:bg-gold/10 transition-colors">
              <Icon size={20} className="text-gold" />
            </div>
            <span className="font-display text-xs text-muted tracking-wider">{service.num}</span>
          </div>

          <h3 className="font-display text-xl text-pearl font-medium mb-4 group-hover:text-gold transition-colors duration-300">
            {service.title}
          </h3>

          <p className="text-sm text-muted leading-relaxed mb-8 font-light">
            {service.desc}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-[10px] font-medium tracking-wider uppercase text-muted border border-gold/10 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 text-gold text-xs font-medium tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Learn more
            <ArrowUpRight size={12} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold mb-6 block">
            What We Do
          </span>
          <h2 className="font-serif text-pearl font-light text-4xl lg:text-6xl leading-tight mb-6">
            Services crafted for <em className="text-gold not-italic">excellence</em>
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto font-light">
            Every solution is bespoke. Every detail is deliberate. We don't do templates — we build legacies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <TiltCard key={service.num} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
