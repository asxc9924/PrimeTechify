import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Aurelia didn't just redesign our brand — they redefined how the market sees us. Revenue up 280% in six months.",
    author: 'Vikram Mehta',
    role: 'CEO, Nexus Ventures',
    metric: '+280%',
    metricLabel: 'Revenue Growth',
  },
  {
    quote: "The AI automation they built eliminated 40 hours of manual work per week. Our team can finally focus on what matters.",
    author: 'Sarah Chen',
    role: 'COO, ScaleFlow',
    metric: '40 hrs',
    metricLabel: 'Saved Weekly',
  },
  {
    quote: "I've worked with dozens of agencies. None match the strategic depth and execution precision of Aurelia.",
    author: 'James Morrison',
    role: 'Founder, Elevate Capital',
    metric: '12x',
    metricLabel: 'ROI Achieved',
  },
  {
    quote: "Their growth strategy helped us secure Series B funding in record time. The investor deck alone was worth the partnership.",
    author: 'Priya Sharma',
    role: 'Founder, HealthTech AI',
    metric: '$8M',
    metricLabel: 'Raised',
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="stories" ref={ref} className="relative py-32 lg:py-40 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-body font-medium tracking-[0.3em] uppercase text-gold mb-6 block">
            Client Stories
          </span>
          <h2 className="font-serif text-pearl font-light text-4xl lg:text-6xl leading-tight">
            Words from those <em className="text-gold not-italic">we've moved</em>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Large quote icon */}
            <Quote size={80} className="absolute -top-4 -left-4 text-gold/5" />

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -20, rotateX: 10 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="text-center perspective-container"
              >
                <blockquote className="font-serif text-2xl lg:text-3xl text-pearl/90 font-light leading-relaxed mb-10 italic">
                  "{t.quote}"
                </blockquote>

                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="text-right">
                    <div className="font-display text-sm text-pearl font-medium">{t.author}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                  <div className="w-px h-8 bg-gold/20" />
                  <div className="text-left">
                    <div className="font-display text-lg text-gold font-semibold">{t.metric}</div>
                    <div className="text-[10px] text-muted tracking-wider uppercase">{t.metricLabel}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all duration-300"
                data-hover
              >
                <ChevronLeft size={18} />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      i === current ? 'w-8 bg-gold' : 'w-2 bg-gold/20 hover:bg-gold/40'
                    }`}
                    data-hover
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="w-12 h-12 rounded-full border border-gold/20 flex items-center justify-center text-muted hover:text-gold hover:border-gold/50 transition-all duration-300"
                data-hover
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
