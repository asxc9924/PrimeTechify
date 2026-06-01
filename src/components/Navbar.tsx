import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Shield } from 'lucide-react';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why' },
  { label: 'Stories', href: '#stories' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleHashLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!isHome) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-ink/80 backdrop-blur-2xl border-b border-gold/10'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group" data-hover>
            <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center group-hover:border-gold/80 transition-colors">
              <span className="font-serif text-gold text-sm font-light">A</span>
            </div>
            <span className="font-display text-pearl text-lg font-medium tracking-wider">
              AURELIA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {isHome && links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleHashLink(e, link.href)}
                className="text-xs font-body font-medium tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors duration-300 relative group"
                data-hover
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <Link
              to="/corner"
              className="text-xs font-body font-medium tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors duration-300 relative group flex items-center gap-1.5"
              data-hover
            >
              <GraduationCap size={14} />
              Corner
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              to="/admin"
              className="text-xs font-body font-medium tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors duration-300 relative group flex items-center gap-1.5"
              data-hover
            >
              <Shield size={14} />
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>

          {isHome ? (
            <a
              href="#contact"
              onClick={(e) => handleHashLink(e, '#contact')}
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 border border-gold/30 text-gold text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold hover:text-ink transition-all duration-300"
              data-hover
            >
              Start a Project
            </a>
          ) : (
            <Link
              to="/"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 border border-gold/30 text-gold text-xs font-medium tracking-[0.15em] uppercase hover:bg-gold hover:text-ink transition-all duration-300"
              data-hover
            >
              Back to Home
            </Link>
          )}

          <button
            className="md:hidden text-pearl p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-hover
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {isHome && links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={(e) => handleHashLink(e, link.href)}
                className="font-display text-2xl text-pearl hover:text-gold transition-colors"
                data-hover
              >
                {link.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/corner"
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl text-pearl hover:text-gold transition-colors flex items-center gap-2"
                data-hover
              >
                <GraduationCap size={20} />
                Corner
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl text-pearl hover:text-gold transition-colors flex items-center gap-2"
                data-hover
              >
                <Shield size={20} />
                Admin
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {isHome ? (
                <a
                  href="#contact"
                  onClick={(e) => handleHashLink(e, '#contact')}
                  className="mt-4 px-8 py-3 bg-gold text-ink font-medium text-sm tracking-wider uppercase"
                  data-hover
                >
                  Start a Project
                </a>
              ) : (
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 px-8 py-3 bg-gold text-ink font-medium text-sm tracking-wider uppercase"
                  data-hover
                >
                  Back to Home
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
