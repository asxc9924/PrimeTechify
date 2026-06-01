import { motion } from 'framer-motion';

const items = [
  'Brand Strategy',
  'AI Automation',
  'Growth Marketing',
  'UI/UX Design',
  'Web Development',
  'Content Creation',
  'Business Consulting',
  'Digital Transformation',
];

export default function Marquee() {
  return (
    <div className="relative py-8 overflow-hidden border-y border-gold/5 bg-ink/50">
      <div className="absolute inset-0 bg-gradient-to-r from-void via-transparent to-void z-10 pointer-events-none" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex animate-marquee whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="mx-8 font-display text-sm tracking-[0.2em] uppercase text-muted/40 flex items-center gap-8"
          >
            {item}
            <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
