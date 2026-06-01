import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, GraduationCap, AlertTriangle, Users, FileCheck } from 'lucide-react';
import { verifyCertificate, getAllCertificates, type Certificate } from '../../lib/certificates';
import CertificateCard from './CertificateCard';

export default function CollegeTab() {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState<ReturnType<typeof verifyCertificate>>(null);
  const [searched, setSearched] = useState(false);
  const [collegeFilter, setCollegeFilter] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!certId.trim()) return;
    setResult(verifyCertificate(certId));
    setSearched(true);
  };

  const allCerts: Certificate[] = Object.values(getAllCertificates());
  const filteredCerts = collegeFilter
    ? allCerts.filter((c: Certificate) => c.college.toLowerCase().includes(collegeFilter.toLowerCase()))
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/5 border border-gold/10 mb-6">
          <GraduationCap size={14} className="text-gold" />
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gold">
            For Colleges & Universities
          </span>
        </div>
        <h3 className="font-serif text-3xl lg:text-4xl text-pearl font-light mb-4">
          Verify <em className="text-gold not-italic">Student Achievements</em>
        </h3>
        <p className="text-muted text-sm leading-relaxed font-light max-w-lg mx-auto">
          Validate certificates earned by your students through Aurelia programs. 
          Maintain academic integrity and recognize external accomplishments.
        </p>
      </div>

      {/* Single certificate verification */}
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
            <FileCheck size={14} />
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
            className="text-center p-10 rounded-2xl border border-red-500/10 bg-red-500/5 mb-10"
          >
            <AlertTriangle size={40} className="text-red-400 mx-auto mb-4" />
            <h4 className="font-display text-lg text-pearl mb-2">Certificate Not Found</h4>
            <p className="text-sm text-muted max-w-md mx-auto">
              The certificate ID <span className="text-pearl font-medium">{certId}</span> could not be verified.
              Please check the ID or contact our academic partnerships team.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Batch lookup by college */}
      <div className="mt-12 pt-12 border-t border-gold/5">
        <div className="flex items-center gap-3 mb-6">
          <Users size={18} className="text-gold" />
          <h4 className="font-display text-sm text-pearl font-medium tracking-wider uppercase">
            Batch Lookup by Institution
          </h4>
        </div>

        <div className="relative mb-6">
          <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            placeholder="Search by college name (e.g. IIT Delhi)"
            className="w-full pl-11 pr-4 py-4 bg-surface/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors"
          />
        </div>

        {collegeFilter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {filteredCerts.length > 0 ? (
              <>
                <p className="text-xs text-muted mb-4">
                  Found <span className="text-gold">{filteredCerts.length}</span> certificate(s) from matching institutions
                </p>
                {filteredCerts.map((cert: Certificate) => (
                  <CertificateCard key={cert.id} certificate={cert} />
                ))}
              </>
            ) : (
              <div className="text-center p-8 rounded-xl border border-gold/5 bg-surface/20">
                <p className="text-sm text-muted">No certificates found for &quot;{collegeFilter}&quot;</p>
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Info */}
      <div className="mt-10 p-6 rounded-xl border border-gold/5 bg-surface/30">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gold/5 flex items-center justify-center flex-shrink-0">
            <GraduationCap size={18} className="text-gold" />
          </div>
          <div>
            <h4 className="font-display text-sm text-pearl font-medium mb-2">
              Academic Partnership Program
            </h4>
            <p className="text-xs text-muted leading-relaxed mb-3">
              Aurelia partners with leading institutions to offer industry-aligned programs 
              that complement academic curricula. Our certificates are recognized by 200+ 
              companies worldwide.
            </p>
            <p className="text-xs text-gold/60">
              Interested in partnering? Contact our academic relations team.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
