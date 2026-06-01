import { ArrowUpRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Why Us', href: '#why' },
  { label: 'Stories', href: '#stories' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-gold/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center">
                <span className="font-serif text-gold text-sm font-light">A</span>
              </div>
              <span className="font-display text-pearl text-lg font-medium tracking-wider">
                AURELIA
              </span>
            </div>
            <p className="text-sm text-muted leading-relaxed font-light max-w-sm">
              An exclusive collective of strategists, technologists, and creatives 
              transforming ambitious companies into industry leaders.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-pearl mb-6">
              Navigate
            </h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-muted hover:text-gold transition-colors duration-300"
                    data-hover
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin Access */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.2em] uppercase text-pearl mb-6">
              Admin
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-muted hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5"
                  data-hover
                >
                  <Shield size={12} />
                  Admin Login
                </Link>
              </li>
              <li>
                <Link
                  to="/corner"
                  className="text-sm text-muted hover:text-gold transition-colors duration-300 inline-flex items-center gap-1.5"
                  data-hover
                >
                  <ArrowUpRight size={12} />
                  The Corner
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gold/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Aurelia Collective. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-muted hover:text-gold transition-colors" data-hover>
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-muted hover:text-gold transition-colors" data-hover>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
