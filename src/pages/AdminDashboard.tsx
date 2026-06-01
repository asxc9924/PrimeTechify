import { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Award,
  FileText,
  BarChart3,
  Plus,
  Trash2,
  Copy,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  X,
  Loader2,
} from 'lucide-react';
import { isAdminLoggedIn, logoutAdmin } from '../lib/auth';
import {
  addCertificate,
  addOfferLetter,
  deleteCertificate,
  deleteOfferLetter,
  getAdminStats,
  getAllCertificates,
  getAllOfferLetters,
  type Certificate,
  type OfferLetter,
} from '../lib/certificates';
import { generateCertificatePDF, generateOfferLetterPDF } from '../lib/pdfGenerator';
import CertificateTemplate from '../components/pdf/CertificateTemplate';
import OfferLetterTemplate from '../components/pdf/OfferLetterTemplate';

type Tab = 'overview' | 'certificates' | 'offers';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [stats, setStats] = useState(getAdminStats());
  const [copiedId, setCopiedId] = useState('');

  // Certificate form
  const [certForm, setCertForm] = useState({
    name: '', course: '', college: '', duration: '', grade: 'First Class', skills: '',
  });
  const [certSuccess, setCertSuccess] = useState('');

  // Offer form
  const [offerForm, setOfferForm] = useState({
    name: '', position: '', department: '', startDate: '', endDate: '',
    stipend: '', location: '', college: '', status: 'pending' as 'pending' | 'accepted',
  });
  const [offerSuccess, setOfferSuccess] = useState('');

  // Lists
  const [allCerts, setAllCerts] = useState<Record<string, Certificate>>({});
  const [allOffers, setAllOffers] = useState<Record<string, OfferLetter>>({});
  const [expandedCert, setExpandedCert] = useState<string | null>(null);
  const [expandedOffer, setExpandedOffer] = useState<string | null>(null);

  // PDF generation
  const [previewCert, setPreviewCert] = useState<Certificate | null>(null);
  const [previewOffer, setPreviewOffer] = useState<OfferLetter | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);
  const certTemplateRef = useRef<HTMLDivElement>(null);
  const offerTemplateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAdminLoggedIn()) navigate('/admin');
  }, [navigate]);

  useEffect(() => { refreshData(); }, []);

  const refreshData = () => {
    setStats(getAdminStats());
    setAllCerts(getAllCertificates());
    setAllOffers(getAllOfferLetters());
  };

  const handleLogout = () => { logoutAdmin(); navigate('/'); };

  const handleCertSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issueDate = new Date().toISOString().split('T')[0];
    const expiryYear = new Date().getFullYear() + 3;
    const expiryDate = `${expiryYear}-${issueDate.slice(5)}`;
    const id = addCertificate({
      name: certForm.name, course: certForm.course, college: certForm.college,
      duration: certForm.duration, grade: certForm.grade,
      skills: certForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      issueDate, expiryDate,
    });
    setCertSuccess(id);
    setCertForm({ name: '', course: '', college: '', duration: '', grade: 'First Class', skills: '' });
    refreshData();
    setTimeout(() => setCertSuccess(''), 5000);
  };

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const issueDate = new Date().toISOString().split('T')[0];
    const id = addOfferLetter({
      name: offerForm.name, position: offerForm.position, department: offerForm.department,
      startDate: offerForm.startDate, endDate: offerForm.endDate, stipend: offerForm.stipend,
      location: offerForm.location, college: offerForm.college, status: offerForm.status, issueDate,
    });
    setOfferSuccess(id);
    setOfferForm({ name: '', position: '', department: '', startDate: '', endDate: '', stipend: '', location: '', college: '', status: 'pending' });
    refreshData();
    setTimeout(() => setOfferSuccess(''), 5000);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(''), 2000);
  };

  const downloadCertPDF = useCallback(async (cert: Certificate) => {
    setPreviewCert(cert);
    setDownloading(cert.id);
    // Wait for render
    await new Promise(r => setTimeout(r, 500));
    const el = certTemplateRef.current;
    if (el) {
      await generateCertificatePDF(el, `Aurelia_Certificate_${cert.id}_${cert.name.replace(/\s+/g, '_')}.pdf`);
    }
    setDownloading(null);
    setPreviewCert(null);
  }, []);

  const downloadOfferPDF = useCallback(async (offer: OfferLetter) => {
    setPreviewOffer(offer);
    setDownloading(offer.id);
    await new Promise(r => setTimeout(r, 500));
    const el = offerTemplateRef.current;
    if (el) {
      await generateOfferLetterPDF(el, `Aurelia_OfferLetter_${offer.id}_${offer.name.replace(/\s+/g, '_')}.pdf`);
    }
    setDownloading(null);
    setPreviewOffer(null);
  }, []);

  const dynamicCerts = Object.entries(allCerts).filter(([id]) => !id.match(/^AUR-202[45]-00[0-9]$/));
  const dynamicOffers = Object.entries(allOffers);

  return (
    <div className="relative min-h-screen bg-void text-cream">
      {/* Hidden PDF templates — must be in viewport for html2canvas */}
      <div style={{ position: 'fixed', top: 0, left: 0, opacity: 0, pointerEvents: 'none', zIndex: -1, width: '100vw', height: '100vh', overflow: 'hidden' }}>
        <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
          {previewCert && <CertificateTemplate ref={certTemplateRef} certificate={previewCert} />}
          {previewOffer && <OfferLetterTemplate ref={offerTemplateRef} offer={previewOffer} />}
        </div>
      </div>

      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-64 bg-surface/40 border-r border-gold/5 z-40 hidden lg:flex flex-col">
        <div className="p-6 border-b border-gold/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
              <span className="font-serif text-gold text-sm font-light">A</span>
            </div>
            <span className="font-display text-pearl text-sm font-medium tracking-wider">AURELIA</span>
          </div>
          <p className="text-[10px] text-muted mt-2 tracking-wider uppercase">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {[
            { key: 'overview' as Tab, label: 'Overview', icon: BarChart3 },
            { key: 'certificates' as Tab, label: 'Certificates', icon: Award },
            { key: 'offers' as Tab, label: 'Offer Letters', icon: FileText },
          ].map(item => {
            const Icon = item.icon;
            return (
              <button key={item.key} onClick={() => setActiveTab(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-colors ${activeTab === item.key ? 'bg-gold/10 text-gold' : 'text-muted hover:text-cream hover:bg-surface/60'}`}>
                <Icon size={16} />{item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gold/5">
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted hover:text-red-400 hover:bg-red-500/5 transition-colors">
            <LogOut size={16} />Logout
          </button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-gold/5 px-6 py-4 flex items-center justify-between">
        <span className="font-display text-pearl text-sm font-medium tracking-wider">AURELIA ADMIN</span>
        <button onClick={handleLogout} className="text-muted hover:text-red-400 transition-colors"><LogOut size={18} /></button>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 pt-16 lg:pt-0">
        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-8 lg:py-12">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="font-serif text-2xl text-pearl font-light mb-8">Dashboard Overview</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                  {[
                    { label: 'Total Certificates', value: Object.keys(allCerts).length },
                    { label: 'Generated Certificates', value: stats.totalCertificates },
                    { label: 'Offer Letters', value: stats.totalOfferLetters },
                    { label: 'Active Verifications', value: Object.keys(allCerts).length + stats.totalOfferLetters },
                  ].map(stat => (
                    <div key={stat.label} className="p-6 rounded-xl border border-gold/5 bg-surface/30">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-muted block mb-2">{stat.label}</span>
                      <span className="font-display text-3xl text-pearl font-semibold">{stat.value}</span>
                    </div>
                  ))}
                </div>

                {stats.recentCertificates.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">Recently Generated Certificates</h3>
                    <div className="space-y-3">
                      {stats.recentCertificates.map(cert => (
                        <div key={cert.id} className="flex items-center justify-between p-4 rounded-lg border border-gold/5 bg-surface/20">
                          <div>
                            <span className="text-sm text-pearl font-medium">{cert.name}</span>
                            <span className="text-xs text-muted ml-3">{cert.course}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gold font-display">{cert.id}</span>
                            <button onClick={() => copyToClipboard(cert.id)} className="p-1.5 rounded hover:bg-gold/10 transition-colors">
                              {copiedId === cert.id ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} className="text-muted" />}
                            </button>
                            <button onClick={() => downloadCertPDF(cert)} disabled={downloading === cert.id}
                              className="p-1.5 rounded hover:bg-gold/10 transition-colors disabled:opacity-50">
                              {downloading === cert.id ? <Loader2 size={14} className="text-gold animate-spin" /> : <Download size={14} className="text-muted" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {stats.recentOffers.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">Recently Generated Offer Letters</h3>
                    <div className="space-y-3">
                      {stats.recentOffers.map(offer => (
                        <div key={offer.id} className="flex items-center justify-between p-4 rounded-lg border border-gold/5 bg-surface/20">
                          <div>
                            <span className="text-sm text-pearl font-medium">{offer.name}</span>
                            <span className="text-xs text-muted ml-3">{offer.position}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gold font-display">{offer.id}</span>
                            <button onClick={() => copyToClipboard(offer.id)} className="p-1.5 rounded hover:bg-gold/10 transition-colors">
                              {copiedId === offer.id ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} className="text-muted" />}
                            </button>
                            <button onClick={() => downloadOfferPDF(offer)} disabled={downloading === offer.id}
                              className="p-1.5 rounded hover:bg-gold/10 transition-colors disabled:opacity-50">
                              {downloading === offer.id ? <Loader2 size={14} className="text-gold animate-spin" /> : <Download size={14} className="text-muted" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'certificates' && (
              <motion.div key="certificates" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="font-serif text-2xl text-pearl font-light mb-8">Generate Certificate</h2>
                <form onSubmit={handleCertSubmit} className="p-6 lg:p-8 rounded-2xl border border-gold/5 bg-surface/30 mb-10">
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <input type="text" value={certForm.name} onChange={e => setCertForm({ ...certForm, name: e.target.value })} placeholder="Student Full Name" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                    <input type="text" value={certForm.course} onChange={e => setCertForm({ ...certForm, course: e.target.value })} placeholder="Course / Program Name" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <input type="text" value={certForm.college} onChange={e => setCertForm({ ...certForm, college: e.target.value })} placeholder="College / University" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                    <input type="text" value={certForm.duration} onChange={e => setCertForm({ ...certForm, duration: e.target.value })} placeholder="Duration (e.g. 6 Months)" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <select value={certForm.grade} onChange={e => setCertForm({ ...certForm, grade: e.target.value })}
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer">
                      <option value="Distinction">Distinction</option>
                      <option value="First Class">First Class</option>
                      <option value="Second Class">Second Class</option>
                      <option value="Pass">Pass</option>
                    </select>
                    <input type="text" value={certForm.skills} onChange={e => setCertForm({ ...certForm, skills: e.target.value })} placeholder="Skills (comma separated)" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 rounded-lg">
                    <Plus size={14} />Generate Certificate
                  </button>
                </form>

                {certSuccess && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 p-6 rounded-xl bg-green-500/5 border border-green-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-sm text-green-400 font-medium">Certificate Generated Successfully</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted">Certificate ID:</span>
                      <span className="font-display text-gold text-sm">{certSuccess}</span>
                      <button onClick={() => copyToClipboard(certSuccess)} className="p-1.5 rounded hover:bg-gold/10 transition-colors">
                        {copiedId === certSuccess ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} className="text-muted" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                {dynamicCerts.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">Generated Certificates</h3>
                    <div className="space-y-3">
                      {dynamicCerts.map(([id, cert]) => (
                        <div key={id} className="rounded-lg border border-gold/5 bg-surface/20 overflow-hidden">
                          <button onClick={() => setExpandedCert(expandedCert === id ? null : id)}
                            className="w-full flex items-center justify-between p-4 text-left">
                            <div>
                              <span className="text-sm text-pearl font-medium">{cert.name}</span>
                              <span className="text-xs text-muted ml-3">{cert.course}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gold font-display">{id}</span>
                              {expandedCert === id ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
                            </div>
                          </button>
                          {expandedCert === id && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-4 pb-4 border-t border-gold/5 pt-4">
                              <div className="grid sm:grid-cols-2 gap-3 text-xs mb-4">
                                <div><span className="text-muted">College:</span> <span className="text-cream">{cert.college}</span></div>
                                <div><span className="text-muted">Duration:</span> <span className="text-cream">{cert.duration}</span></div>
                                <div><span className="text-muted">Grade:</span> <span className="text-cream">{cert.grade}</span></div>
                                <div><span className="text-muted">Issue Date:</span> <span className="text-cream">{cert.issueDate}</span></div>
                                <div><span className="text-muted">Expiry:</span> <span className="text-cream">{cert.expiryDate}</span></div>
                                <div><span className="text-muted">Skills:</span> <span className="text-cream">{cert.skills.join(', ')}</span></div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => downloadCertPDF(cert)} disabled={downloading === cert.id}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-xs text-gold border border-gold/20 rounded-lg hover:bg-gold/10 transition-colors disabled:opacity-50">
                                  {downloading === cert.id ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                  Download PDF
                                </button>
                                <button onClick={() => { deleteCertificate(id); refreshData(); }}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/5 transition-colors">
                                  <Trash2 size={12} />Delete
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'offers' && (
              <motion.div key="offers" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <h2 className="font-serif text-2xl text-pearl font-light mb-8">Generate Offer Letter</h2>
                <form onSubmit={handleOfferSubmit} className="p-6 lg:p-8 rounded-2xl border border-gold/5 bg-surface/30 mb-10">
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <input type="text" value={offerForm.name} onChange={e => setOfferForm({ ...offerForm, name: e.target.value })} placeholder="Candidate Full Name" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                    <input type="text" value={offerForm.position} onChange={e => setOfferForm({ ...offerForm, position: e.target.value })} placeholder="Position / Role" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <input type="text" value={offerForm.department} onChange={e => setOfferForm({ ...offerForm, department: e.target.value })} placeholder="Department" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                    <input type="text" value={offerForm.stipend} onChange={e => setOfferForm({ ...offerForm, stipend: e.target.value })} placeholder="Stipend (e.g. INR 25,000/month)" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <input type="date" value={offerForm.startDate} onChange={e => setOfferForm({ ...offerForm, startDate: e.target.value })} required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                    <input type="date" value={offerForm.endDate} onChange={e => setOfferForm({ ...offerForm, endDate: e.target.value })} required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5 mb-5">
                    <input type="text" value={offerForm.location} onChange={e => setOfferForm({ ...offerForm, location: e.target.value })} placeholder="Location (e.g. Remote / Jaipur)" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                    <input type="text" value={offerForm.college} onChange={e => setOfferForm({ ...offerForm, college: e.target.value })} placeholder="College / University" required
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm placeholder:text-muted focus:outline-none focus:border-gold/40 transition-colors" />
                  </div>
                  <div className="mb-5">
                    <select value={offerForm.status} onChange={e => setOfferForm({ ...offerForm, status: e.target.value as 'pending' | 'accepted' })}
                      className="w-full px-4 py-3 bg-ink/50 border border-gold/10 rounded-lg text-pearl text-sm focus:outline-none focus:border-gold/40 transition-colors appearance-none cursor-pointer">
                      <option value="pending">Status: Pending</option>
                      <option value="accepted">Status: Accepted</option>
                    </select>
                  </div>
                  <button type="submit" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-ink font-display font-medium text-xs tracking-[0.15em] uppercase hover:bg-gold-light transition-all duration-300 rounded-lg">
                    <Plus size={14} />Generate Offer Letter
                  </button>
                </form>

                {offerSuccess && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10 p-6 rounded-xl bg-green-500/5 border border-green-500/10">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle size={16} className="text-green-400" />
                      <span className="text-sm text-green-400 font-medium">Offer Letter Generated Successfully</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted">Offer ID:</span>
                      <span className="font-display text-gold text-sm">{offerSuccess}</span>
                      <button onClick={() => copyToClipboard(offerSuccess)} className="p-1.5 rounded hover:bg-gold/10 transition-colors">
                        {copiedId === offerSuccess ? <CheckCircle size={14} className="text-green-400" /> : <Copy size={14} className="text-muted" />}
                      </button>
                    </div>
                  </motion.div>
                )}

                {dynamicOffers.length > 0 && (
                  <div>
                    <h3 className="text-xs font-medium tracking-[0.2em] uppercase text-muted mb-4">Generated Offer Letters</h3>
                    <div className="space-y-3">
                      {dynamicOffers.map(([id, offer]) => (
                        <div key={id} className="rounded-lg border border-gold/5 bg-surface/20 overflow-hidden">
                          <button onClick={() => setExpandedOffer(expandedOffer === id ? null : id)}
                            className="w-full flex items-center justify-between p-4 text-left">
                            <div>
                              <span className="text-sm text-pearl font-medium">{offer.name}</span>
                              <span className="text-xs text-muted ml-3">{offer.position}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className={`text-[10px] px-2 py-0.5 rounded-full border ${offer.status === 'accepted' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'}`}>
                                {offer.status}
                              </span>
                              <span className="text-xs text-gold font-display">{id}</span>
                              {expandedOffer === id ? <ChevronUp size={14} className="text-muted" /> : <ChevronDown size={14} className="text-muted" />}
                            </div>
                          </button>
                          {expandedOffer === id && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-4 pb-4 border-t border-gold/5 pt-4">
                              <div className="grid sm:grid-cols-2 gap-3 text-xs mb-4">
                                <div><span className="text-muted">Department:</span> <span className="text-cream">{offer.department}</span></div>
                                <div><span className="text-muted">Stipend:</span> <span className="text-cream">{offer.stipend}</span></div>
                                <div><span className="text-muted">Start:</span> <span className="text-cream">{offer.startDate}</span></div>
                                <div><span className="text-muted">End:</span> <span className="text-cream">{offer.endDate}</span></div>
                                <div><span className="text-muted">Location:</span> <span className="text-cream">{offer.location}</span></div>
                                <div><span className="text-muted">College:</span> <span className="text-cream">{offer.college}</span></div>
                                <div><span className="text-muted">Issued:</span> <span className="text-cream">{offer.issueDate}</span></div>
                              </div>
                              <div className="flex gap-2">
                                <button onClick={() => downloadOfferPDF(offer)} disabled={downloading === offer.id}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-xs text-gold border border-gold/20 rounded-lg hover:bg-gold/10 transition-colors disabled:opacity-50">
                                  {downloading === offer.id ? <Loader2 size={12} className="animate-spin" /> : <Download size={12} />}
                                  Download PDF
                                </button>
                                <button onClick={() => { deleteOfferLetter(id); refreshData(); }}
                                  className="inline-flex items-center gap-2 px-4 py-2 text-xs text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/5 transition-colors">
                                  <Trash2 size={12} />Delete
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
