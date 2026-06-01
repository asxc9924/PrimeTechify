import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShieldCheck, AlertTriangle, Building2, UserCheck } from 'lucide-react';
import { verifyCertificate } from '../../lib/certificates';
import CertificateCard from './CertificateCard';

export default function RecruiterTab() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<ReturnType<typeof verifyCertificate>>(null);
  const [searched, setSearched] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setResult(verifyCertificate(certId));
    setSearched(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 mb-6">
          <Building2 size={14} className="text-gold" />
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold">
            For Recruiters & Companies
          </span>
        </div>
        <h3 className="font-serif text-3xl lg:text-4xl text-pearl font-light mb-4">
          Verify <em className="text-gold not-italic">Candidate Credentials</em>
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light max-w-lg mx-auto">
          Validate certificates issued by Aurelia to prospective hires. 
          Enter the certificate ID below to verify authenticity.
        </p>
      </div>

      <form onSubmit={handleVerify} className="mb-10">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={certId}
              onChange={(e) => {
                setCertId(e.target.value);
                setSearched(false);
                setResult(null);
              }}
              placeholder="Enter Certificate ID (e.g. AUR-2024-001)"
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
        {searched && result && (
          <CertificateCard key={result.id} certificate={result} />
        )}

        {searched && !result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center p-10 rounded-2xl border border-red-500/10 bg-red-500/5"
          >
            <AlertTriangle size={40} className="text-red-400 mx-auto mb-4" />
            <h4 className="font-display text-lg text-pearl mb-2">Certificate Not Found</h4>
            <p className="text-sm text-muted max-w-md mx-auto">
              The certificate ID <span className="text-pearl font-medium">{certId}</span> could not be verified 
              in our database. Please double-check the ID or contact us for assistance.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info box */}
      <div className="mt-10 p-6 rounded-xl border border-gold/5 bg-surface/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
            <UserCheck size={18} className="text-gold" />
          </div>
          <div>
            <h4 className="font-display text-sm text-pearl font-medium mb-2">
              Why Verify?
            </h4>
            <p className="text-xs text-muted leading-relaxed">
              Aurelia certificates are issued only upon successful completion of rigorous programs. 
              Verification ensures you are evaluating candidates with genuine, industry-validated skills. 
              Each certificate includes a unique ID, issue date, and expiry for complete transparency.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
