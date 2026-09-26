import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Search, Moon, Sun, Bookmark, Menu, X, ChevronDown, Code2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useBookmarks } from '../../hooks/useBookmarks';
import { useSearch } from '../../hooks/useSearch';
import { SearchModal } from '../common/SearchModal';
import { mainNavItems } from '../../data/navigation';

// ============================================================
// LOGO
// ============================================================
function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 font-bold text-xl focus-ring rounded-lg px-1"
      aria-label="iOSCraft Home"
    >
      <div className="w-8 h-8 bg-brand-orange rounded-lg flex items-center justify-center">
        <Code2 size={18} className="text-dark-bg" />
      </div>
      <span>
        <span className="text-[var(--text-primary)]">iOS</span>
        <span className="text-brand-orange">Craft</span>
      </span>
    </Link>
  );
}

// ============================================================
// DROPDOWN MENU
// ============================================================
interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface DropdownProps {
  label: string;
  href: string;
  items: DropdownItem[];
}

function NavDropdown({ label, href, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isActive = location.pathname.startsWith(href);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        onClick={() => setIsOpen(o => !o)}
        className={`flex items-center gap-1 text-sm font-medium transition-colors duration-150 px-1 py-1 focus-ring rounded ${
          isActive ? 'text-brand-orange' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
        }`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown size={14} className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-56 animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl shadow-xl p-1.5">
            {items.map((item) => (
              <Link
                key={item.href + item.label}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2.5 rounded-lg hover:bg-[var(--bg-primary)] transition-colors group"
              >
                <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-brand-orange transition-colors">
                  {item.label}
                </p>
                {item.description && (
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.description}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// MOBILE MENU ITEM
// ============================================================
interface MobileMenuItemProps {
  label: string;
  href: string;
  onClick: () => void;
  children?: React.ReactNode;
}

function MobileNavItem({ label, href, onClick }: MobileMenuItemProps) {
  return (
    <NavLink
      to={href}
      onClick={onClick}
      className={({ isActive }) =>
        `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
          isActive
            ? 'bg-brand-orange/10 text-brand-orange'
            : 'text-[var(--text-secondary)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]'
        }`
      }
    >
      {label}
    </NavLink>
  );
}

// ============================================================
// NAVBAR
// ============================================================
export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const { totalCount } = useBookmarks();
  const { isOpen: isSearchOpen, openSearch, closeSearch } = useSearch();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Scroll detection for shadow
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        className={`
          sticky top-0 z-40 w-full
          bg-[var(--bg-primary)]/95 bg-glass
          border-b border-[var(--border-color)]
          transition-shadow duration-200
          ${isScrolled ? 'shadow-lg shadow-black/10' : ''}
        `}
        role="banner"
      >
        <nav className="container-content flex items-center justify-between h-16" aria-label="Main navigation">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1" role="menubar">
            {mainNavItems.map((item) =>
              item.children ? (
                <NavDropdown
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  items={item.children}
                />
              ) : (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                  role="menuitem"
                >
                  {item.label}
                </NavLink>
              )
            )}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            {/* Search */}
            <button
              onClick={openSearch}
              className="btn-ghost hidden sm:flex items-center gap-2"
              aria-label="Open search (Ctrl+K)"
              title="Search (Ctrl+K)"
            >
              <Search size={18} />
              <span className="hidden xl:flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <kbd className="px-1.5 py-0.5 rounded border border-[var(--border-color)] font-mono text-[10px]">⌘K</kbd>
              </span>
            </button>

            {/* Mobile search */}
            <button
              onClick={openSearch}
              className="btn-ghost sm:hidden"
              aria-label="Open search"
            >
              <Search size={18} />
            </button>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="btn-ghost"
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Bookmarks */}
            <Link
              to="/bookmarks"
              className="btn-ghost relative"
              aria-label={`Bookmarks${totalCount > 0 ? ` (${totalCount})` : ''}`}
            >
              <Bookmark size={18} />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brand-orange text-dark-bg text-[9px] font-bold rounded-full flex items-center justify-center">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileOpen(o => !o)}
              className="btn-ghost lg:hidden ml-1"
              aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileOpen}
              aria-controls="mobile-menu"
            >
              {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-[var(--border-color)] bg-[var(--bg-primary)] animate-slide-down"
          >
            <div className="container-content py-3 space-y-1">
              {mainNavItems.map((item) => (
                <MobileNavItem
                  key={item.href}
                  label={item.label}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                />
              ))}
              <div className="border-t border-[var(--border-color)] pt-3 mt-3 space-y-1">
                <MobileNavItem label="Bookmarks" href="/bookmarks" onClick={() => setIsMobileOpen(false)} />
                <MobileNavItem label="About" href="/about" onClick={() => setIsMobileOpen(false)} />
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
