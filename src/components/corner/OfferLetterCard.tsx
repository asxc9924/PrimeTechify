import { useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calendar, MapPin, Building2, GraduationCap, BadgeCheck, Clock, Download, Loader2 } from 'lucide-react';
import type { OfferLetter } from '../../lib/certificates';
import { generateOfferLetterPDF } from '../../lib/pdfGenerator';
import OfferLetterTemplate from '../pdf/OfferLetterTemplate';

interface OfferLetterCardProps {
  offer: OfferLetter;
}

export default function OfferLetterCard({ offer }: OfferLetterCardProps) {
  const isAccepted = offer.status === 'accepted';
  const [downloading, setDownloading] = useState(false);
  const templateRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    setDownloading(true);
    await new Promise(r => setTimeout(r, 500));
    if (templateRef.current) {
      await generateOfferLetterPDF(templateRef.current, `Aurelia_OfferLetter_${offer.id}_${offer.name.replace(/\s+/g, '_')}.pdf`);
    }
    setDownloading(false);
  }, [offer]);

  return (
    <>
      {/* Hidden template for PDF generation — must be in viewport for html2canvas */}
      <div style={{ position: 'fixed', top: 0, left: 0, opacity: 0, pointerEvents: 'none', zIndex: -1, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
          <OfferLetterTemplate ref={templateRef} offer={offer} />
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
                <FileText size={20} className="text-gold" />
                <span className="font-display text-xs tracking-[0.2em] uppercase text-gold">
                  Verified Offer Letter
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase ${
                    isAccepted
                      ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                  }`}
                >
                  <BadgeCheck size={12} />
                  {isAccepted ? 'Accepted' : 'Pending'}
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

            {/* Offer ID */}
            <div className="mb-6 p-4 rounded-xl bg-ink/50 border border-gold/5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-1">
                Offer Letter ID
              </span>
              <span className="font-display text-lg text-pearl tracking-wider">
                {offer.id}
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
                    Candidate
                  </span>
                  <span className="text-sm text-pearl font-medium">{offer.name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                  <Building2 size={14} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                    Position
                  </span>
                  <span className="text-sm text-pearl font-medium">{offer.position}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                  <Calendar size={14} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                    Duration
                  </span>
                  <span className="text-sm text-pearl font-medium">
                    {offer.startDate} to {offer.endDate}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                  <MapPin size={14} className="text-gold" />
                </div>
                <div>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                    Location
                  </span>
                  <span className="text-sm text-pearl font-medium">{offer.location}</span>
                </div>
              </div>
            </div>

            {/* Department & Stipend */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gold/5 border border-gold/10">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 block mb-1">
                  Department
                </span>
                <span className="font-display text-base text-pearl">{offer.department}</span>
              </div>
              <div className="p-4 rounded-xl bg-gold/5 border border-gold/10">
                <span className="text-[10px] tracking-[0.2em] uppercase text-gold/60 block mb-1">
                  Stipend
                </span>
                <span className="font-display text-base text-pearl">{offer.stipend}</span>
              </div>
            </div>

            {/* College & Issue Date */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="text-gold" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                  Institution
                </span>
                <span className="text-sm text-cream/80">{offer.college}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
                <Calendar size={14} className="text-gold" />
              </div>
              <div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-muted block">
                  Issued On
                </span>
                <span className="text-sm text-cream/80">{offer.issueDate}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
