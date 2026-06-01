import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ThreeBackground from './ThreeBackground';

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const text = title.innerText;
    title.innerHTML = '';

    text.split('').forEach((char, i) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(40px) rotateX(-40deg)';
      span.style.transition = `all 0.6s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.03}s`;
      title.appendChild(span);
    });

    requestAnimationFrame(() => {
      Array.from(title.children).forEach((span) => {
        (span as HTMLElement).style.opacity = '1';
        (span as HTMLElement).style.transform = 'translateY(0) rotateX(0deg)';
      });
    });
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <ThreeBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-void/50 via-transparent to-void z-[1]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gold/5 rounded-full blur-[120px] z-[1]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gold/3 rounded-full blur-[120px] z-[1]" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="w-12 h-px bg-gold/50" />
              <span className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold">
                The Growth Collective
              </span>
            </motion.div>

            <h1
              ref={titleRef}
              className="font-serif text-pearl font-light leading-[0.95] tracking-tight mb-8"
              style={{ fontSize: 'clamp(48px, 7vw, 100px)', perspective: '1000px' }}
            >
              We build brands that <em className="text-gold not-italic">command</em> attention
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-muted text-base lg:text-lg leading-relaxed max-w-md mb-12 font-light"
            >
              Aurelia is an exclusive collective of strategists, technologists, and creatives 
              who transform ambitious companies into industry leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-6"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
                data-hover
              >
                Begin Your Transformation
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-xs font-medium tracking-[0.15em] uppercase text-cream/60 hover:text-gold transition-colors"
                data-hover
              >
                Explore Services
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="hidden lg:block relative perspective-container"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute top-8 right-0 glass rounded-2xl p-5 w-56 z-20"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                    <Sparkles size={14} className="text-gold" />
                  </div>
                  <span className="text-xs font-medium text-cream/80 tracking-wider">AI-Powered</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">Intelligent automation that scales your operations 24/7</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-16 -left-4 glass rounded-2xl p-5 w-60 z-20"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-cream/80 tracking-wider">Growth Rate</span>
                  <span className="text-gold text-sm font-display font-semibold">+340%</span>
                </div>
                <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '85%' }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                    className="h-full bg-gradient-to-r from-gold-dim to-gold rounded-full"
                  />
                </div>
              </motion.div>

              {/* Central 3D element */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64">
                  <div className="absolute inset-0 rounded-full border border-gold/10 animate-pulse-glow" />
                  <div className="absolute inset-4 rounded-full border border-gold/5" />
                  <div className="absolute inset-8 rounded-full border border-gold/5" />
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold/60" />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-gold/40" />
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold/50" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-gold/30" />
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-serif text-gold text-6xl font-light">A</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-[2]" />
    </section>
  );
}
