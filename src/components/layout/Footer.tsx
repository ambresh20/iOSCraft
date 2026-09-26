import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, Github, Twitter, ExternalLink } from 'lucide-react';
import { footerLinks } from '../../data/navigation';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] mt-auto"
      role="contentinfo"
    >
      <div className="container-content py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl mb-3">
              <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
                <Code2 size={18} className="text-dark-bg" />
              </div>
              <span>
                <span className="text-[var(--text-primary)]">iOS</span>
                <span className="text-brand-orange">Craft</span>
              </span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-4 max-w-[220px]">
              Build Skills. Master Swift. Crack iOS Interviews.
            </p>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost p-2"
                aria-label="GitHub (external link)"
              >
                <Github size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost p-2"
                aria-label="Twitter (external link)"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Learn Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Learn</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Interview Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Interview Prep</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.interview.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* DSA Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">DSA</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.dsa.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Company</h3>
            <ul className="space-y-2.5" role="list">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-brand-orange transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {currentYear} iOSCraft. Built for iOS developers.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-[var(--text-muted)] hover:text-brand-orange transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs text-[var(--text-muted)] hover:text-brand-orange transition-colors">
              Terms of Service
            </Link>
            <a
              href="https://swift.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--text-muted)] hover:text-brand-orange transition-colors flex items-center gap-1"
            >
              Swift.org <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
