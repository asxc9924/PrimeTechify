import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Users, Building2, FileCheck } from 'lucide-react';

export default function CornerBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/[0.03] via-transparent to-gold/[0.03]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/[0.02] rounded-full blur-[120px]" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl border border-gold/10 bg-surface/40 backdrop-blur-sm"
        >
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-gold/20 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-gold/20 rounded-br-2xl" />

          <div className="p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                    <GraduationCap size={18} className="text-gold" />
                  </div>
                  <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold">
                    New: Talent Hub
                  </span>
                </div>

                <h3 className="font-serif text-pearl font-light text-3xl lg:text-4xl leading-tight mb-4">
                  The <em className="text-gold not-italic">Corner</em>
                </h3>
                <p className="text-muted text-sm leading-relaxed font-light mb-8 max-w-md">
                  A dedicated space for students, recruiters, and academic institutions. 
                  Apply for internships, verify credentials, and discover talent — all in one place.
                </p>

                <Link
                  to="/corner"
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300"
                  data-hover
                >
                  Visit the Corner
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: Users,
                    label: 'Students',
                    desc: 'Apply for internships',
                  },
                  {
                    icon: Building2,
                    label: 'Recruiters',
                    desc: 'Verify certificates',
                  },
                  {
                    icon: FileCheck,
                    label: 'Colleges',
                    desc: 'Batch verification',
                  },
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                      className="text-center p-5 rounded-xl border border-gold/5 bg-ink/30 hover:border-gold/15 transition-colors duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gold/5 flex items-center justify-center mx-auto mb-3">
                        <Icon size={16} className="text-gold" />
                      </div>
                      <div className="font-display text-xs text-pearl font-medium mb-1">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-muted leading-tight">
                        {item.desc}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
