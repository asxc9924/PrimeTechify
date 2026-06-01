import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar, Clock, GraduationCap, Star, ShieldCheck, Download, Loader2 } from 'lucide-react';
import type { Certificate } from '../../lib/certificates';
import { generateCertificatePDF } from '../../lib/pdfGenerator';
import CertificateTemplate from '../pdf/CertificateTemplate';

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const isValid = new Date(certificate.expiryDate) > new Date();
  const [downloading, setDownloading] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    await new Promise(r => setTimeout(r, 500));
    if (templateRef.current) {
      await generateCertificatePDF(templateRef.current, `Aurelia_Certificate_${certificate.id}_${certificate.name.replace(/\s+/g, '_')}.pdf`);
    }
    setDownloading(false);
  }, [certificate]);

  return (
    <>
      {/* Hidden template for PDF generation — must be in viewport for html2canvas */}
      <div style={{ position: 'fixed', top: 0, left: 0, opacity: 0, pointerEvents: 'none', zIndex: -1, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
          <CertificateTemplate ref={templateRef} certificate={certificate} />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="perspective-container"
      >
        <div className="relative overflow-hidden rounded-2xl border border-gold/10 bg-surface/60 backdrop-blur-sm">
          {/* Header stripe */}
          <div className="h-2 bg-gradient-to-r from-gold-dim via-gold to-gold-dim" />

          <div className="p-8">
            {/* Status badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Award size={20} className="text-gold" />
                <span className="font-display text-xs tracking-[0.2em] uppercase text-gold">
                  Verified Certificate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase ${
                    isValid
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border border-red-500/20'
                  }`}
                >
                  <ShieldCheck size={12} />
                  {isValid ? 'Active' : 'Expired'}
                </div>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="p-2 rounded-lg border border-gold/20 text-gold hover:bg-gold/10 transition-colors disabled:opacity-50"
                  title="Download PDF"
                >
                  {downloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                </button>
              </div>
            </div>

            {/* Certificate ID */}
            <div className="mb-6 p-4 rounded-xl bg-ink/50 border border-gold/5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-1">
                Certificate ID
              </span>
              <span className="font-display text-lg text-pearl tracking-wider">
                {certificate.id}
              </span>
            </div>

            {/* Main details */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={14} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                    Recipient
                  </span>
                  <span className="text-sm text-pearl font-medium">{certificate.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                  <Star size={14} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                    Grade
                  </span>
                  <span className="text-sm text-pearl font-medium">{certificate.grade}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                  <Calendar size={14} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                    Issue Date
                  </span>
                  <span className="text-sm text-pearl font-medium">{certificate.issueDate}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                  <Clock size={14} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                    Duration
                  </span>
                  <span className="text-sm text-pearl font-medium">{certificate.duration}</span>
                </div>
              </div>
            </div>

            {/* Course */}
            <div className="mb-6 p-4 rounded-xl bg-gold/5 border border-gold/10">
              <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 block mb-1">
                Program / Course
              </span>
              <span className="font-display text-base text-pearl">{certificate.course}</span>
            </div>

            {/* College */}
            <div className="mb-6">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">
                Institution
              </span>
              <span className="text-sm text-cream/80">{certificate.college}</span>
            </div>

            {/* Skills */}
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-3">
                Skills Acquired
              </span>
              <div className="flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-[10px] font-medium tracking-wider uppercase text-gold bg-gold/5 border border-gold/10 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
