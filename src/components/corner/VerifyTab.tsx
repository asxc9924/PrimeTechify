import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, AlertTriangle, Award, FileText } from 'lucide-react';
import { verifyCertificate, verifyOfferLetter } from '../../lib/certificates';
import CertificateCard from './CertificateCard';
import OfferLetterCard from './OfferLetterCard';

type VerifyType = 'certificate' | 'offer';

export default function VerifyTab() {
  const [verifyType, setVerifyType] = useState<VerifyType>('certificate');
  const [id, setId] = useState('');
  const [certResult, setCertResult] = useState<ReturnType<typeof verifyCertificate>>(null);
  const [offerResult, setOfferResult] = useState<ReturnType<typeof verifyOfferLetter>>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id.trim()) return;
    setCertResult(verifyCertificate(id));
    setOfferResult(verifyOfferLetter(id));
    setSearched(true);
  };

  const hasResult = certResult || offerResult;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 mb-6">
          <ShieldCheck size={14} className="text-gold" />
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold">
            Universal Verification
          </span>
        </div>
        <h3 className="font-serif text-3xl lg:text-4xl text-pearl font-light mb-4">
          Verify <em className="text-gold not-italic">Any Document</em>
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light max-w-lg mx-auto">
          Enter any Certificate ID or Offer Letter ID to verify its authenticity 
          in the Aurelia database.
        </p>
      </div>

      {/* Type toggle */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex p-1 rounded-xl bg-surface/40 border border-gold/5">
          <button
            onClick={() => { setVerifyType('certificate'); setSearched(false); setId(''); setCertResult(null); setOfferResult(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-all ${
              verifyType === 'certificate'
                ? 'bg-gold/10 text-gold'
                : 'text-muted hover:text-cream'
            }`}
          >
            <Award size={14} />
            Certificate
          </button>
          <button
            onClick={() => { setVerifyType('offer'); setSearched(false); setId(''); setCertResult(null); setOfferResult(null); }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-medium tracking-wider uppercase transition-all ${
              verifyType === 'offer'
                ? 'bg-gold/10 text-gold'
                : 'text-muted hover:text-cream'
            }`}
          >
            <FileText size={14} />
            Offer Letter
          </button>
        </div>
      </div>

      <form onSubmit={handleVerify} className="mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                setSearched(false);
                setCertResult(null);
                setOfferResult(null);
              }}
              placeholder={verifyType === 'certificate' ? 'Enter Certificate ID (e.g. AUR-2024-001)' : 'Enter Offer Letter ID (e.g. OFF-2025-001)'}
              className="w-full pl-11 pr-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors uppercase tracking-wider"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-4 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 rounded-lg flex items-center gap-2"
            data-hover
          >
            <ShieldCheck size={14} />
            Verify
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {searched && hasResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {certResult && <CertificateCard certificate={certResult} />}
            {offerResult && <OfferLetterCard offer={offerResult} />}
          </motion.div>
        )}

        {searched && !hasResult && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center p-10 rounded-2xl border border-red-500/10 bg-red-500/5"
          >
            <AlertTriangle size={40} className="text-red-400 mx-auto mb-4" />
            <h4 className="font-display text-lg text-pearl mb-2">
              {verifyType === 'certificate' ? 'Certificate Not Found' : 'Offer Letter Not Found'}
            </h4>
            <p className="text-sm text-muted max-w-md mx-auto">
              The ID <span className="text-pearl font-medium">{id}</span> could not be verified 
              in our database. Please double-check the ID or contact us for assistance.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
