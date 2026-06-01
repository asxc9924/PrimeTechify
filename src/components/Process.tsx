import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Lightbulb, Rocket, BarChart3 } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Search,
    title: 'Discovery',
    desc: 'We immerse ourselves in your world — understanding your market, audience, and ambitions at a granular level.',
  },
  {
    num: '02',
    icon: Lightbulb,
    title: 'Strategy',
    desc: 'A bespoke roadmap emerges, blending data-driven insights with creative intuition to chart your growth path.',
  },
  {
    num: '03',
    icon: Rocket,
    title: 'Execution',
    desc: 'Our collective deploys with precision — design, development, and marketing working in perfect harmony.',
  },
  {
    num: '04',
    icon: BarChart3,
    title: 'Optimization',
    desc: 'Continuous refinement based on real-world performance. We iterate until the results exceed every expectation.',
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" ref={ref} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold mb-6 block">
            Our Method
          </span>
          <h2 className="font-serif text-pearl font-light text-4xl lg:text-6xl leading-tight mb-6">
            A process built for <em className="text-gold not-italic">results</em>
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto font-light">
            No guesswork. No shortcuts. Just a proven framework that transforms vision into measurable success.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: i * 0.2 }}
                  className="relative group"
                >
                  <div className="text-center">
                    <div className="relative inline-flex items-center justify-center w-16 h-16 mb-8">
                      <div className="absolute inset-0 rounded-full border border-gold/20 group-hover:border-gold/50 transition-colors duration-500" />
                      <div className="absolute inset-2 rounded-full bg-surface border border-gold/10 flex items-center justify-center group-hover:bg-gold/5 transition-colors duration-500">
                        <Icon size={20} className="text-gold" />
                      </div>
                      {/* Pulse ring */}
                      <div className="absolute inset-0 rounded-full border border-gold/20 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
                    </div>

                    <span className="font-display text-xs text-gold/60 tracking-wider mb-3 block">
                      Step {step.num}
                    </span>
                    <h3 className="font-display text-lg text-pearl font-medium mb-4">
                      {step.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed font-light max-w-xs mx-auto">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
