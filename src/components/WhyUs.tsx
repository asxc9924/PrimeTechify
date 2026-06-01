import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Users, Zap, Target } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Results Guaranteed',
    desc: 'We put our reputation on the line. If we don\'t deliver measurable growth, we work at no cost until we do.',
  },
  {
    icon: Users,
    title: 'Elite Collective',
    desc: 'Every strategist, designer, and engineer in our network is vetted for excellence. No juniors. No compromises.',
  },
  {
    icon: Zap,
    title: 'Speed Without Sacrifice',
    desc: 'Our processes are engineered for velocity. We move fast, but never at the expense of quality or precision.',
  },
  {
    icon: Target,
    title: 'Obsessive Focus',
    desc: 'We take on a limited number of partners each quarter. This ensures every client receives our undivided attention.',
  },
];

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="why" ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/[0.02] rounded-full blur-[150px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold mb-6 block">
              Why Aurelia
            </span>
            <h2 className="font-serif text-pearl font-light text-4xl lg:text-5xl leading-tight mb-8">
              We don't just <em className="text-gold not-italic">serve</em> clients — we <em className="text-gold not-italic">partner</em> with visionaries
            </h2>
            <p className="text-muted text-base leading-relaxed font-light mb-10">
              In a world of agencies that treat you like a number, we offer something rare: 
              a genuine partnership. Your success is our success, and we treat it with the 
              gravity it deserves.
            </p>

            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300"
              data-hover
            >
              Partner With Us
            </a>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6">
            {reasons.map((reason, i) => {
              const Icon = reason.icon;
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group p-6 rounded-xl border border-gold/5 bg-surface/30 hover:bg-surface/60 hover:border-gold/15 transition-all duration-500"
                >
                  <div className="w-10 h-10 rounded-lg bg-gold/5 border border-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/10 transition-colors">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <h3 className="font-display text-sm text-pearl font-medium mb-3">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-muted leading-relaxed font-light">
                    {reason.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
