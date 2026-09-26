import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Menu, X, ChevronUp, ChevronDown } from 'lucide-react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { Module, Lesson } from '../../types/content';

// ============================================================
// TABLE OF CONTENTS
// ============================================================
interface TocItem {
  id: string;
  text: string;
  level: number;
}

function TableOfContents({ content }: { content: string }) {
  const [activeId, setActiveId] = useState('');
  const [items, setItems] = useState<TocItem[]>([]);

  useEffect(() => {
    // Parse headings from markdown content
    const headings: TocItem[] = [];
    const lines = content.split('\n');
    let idCounter = 0;

    for (const line of lines) {
      const match = line.match(/^(#{2,4})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-') + `-${idCounter++}`;
        headings.push({ id, text, level });
      }
    }
    setItems(headings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' }
    );

    document.querySelectorAll('h2, h3, h4').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="sticky top-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-3 px-2">
        On this page
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`
                block py-1 px-2 text-xs rounded transition-colors duration-150
                ${item.level === 2 ? 'pl-2' : item.level === 3 ? 'pl-5' : 'pl-8'}
                ${activeId === item.id
                  ? 'text-brand-orange font-medium bg-brand-orange/5'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                }
              `}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ============================================================
// BREADCRUMBS
// ============================================================
interface BreadcrumbItem {
  label: string;
  href?: string;
}

function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-4">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight size={12} />}
          {item.href ? (
            <Link to={item.href} className="hover:text-brand-orange transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--text-secondary)]">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// ============================================================
// LEARNING SIDEBAR
// ============================================================
interface LearningLayoutProps {
  modules: Module[];
  currentLesson?: Lesson;
  breadcrumbs?: BreadcrumbItem[];
  tocContent?: string;
  children: React.ReactNode;
}

export function LearningLayout({ modules, currentLesson, breadcrumbs, tocContent, children }: LearningLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expandedModules, setExpandedModules] = useState<string[]>(() => {
    if (currentLesson) return [currentLesson.moduleId];
    return modules.length > 0 ? [modules[0].id] : [];
  });
  const location = useLocation();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const toggleModule = useCallback((moduleId: string) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  }, []);

  const SidebarContent = () => (
    <div className="p-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] mb-4 px-2">
        Swift Curriculum
      </p>
      <nav aria-label="Course navigation">
        {modules.map((module) => (
          <div key={module.id} className="mb-2">
            <button
              onClick={() => toggleModule(module.id)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)] transition-all"
              aria-expanded={expandedModules.includes(module.id)}
            >
              <span className="text-left">{module.title}</span>
              {expandedModules.includes(module.id)
                ? <ChevronUp size={14} />
                : <ChevronDown size={14} />
              }
            </button>
            {expandedModules.includes(module.id) && (
              <ul className="mt-1 space-y-0.5 ml-3" role="list">
                {module.lessons.map((lesson) => {
                  const isActive = lesson.slug === currentLesson?.slug;
                  return (
                    <li key={lesson.slug}>
                      <Link
                        to={`/learn/swift/${lesson.slug}`}
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all
                          ${isActive
                            ? 'bg-brand-orange/10 text-brand-orange font-medium border-l-2 border-brand-orange'
                            : 'text-[var(--text-muted)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-secondary)]'
                          }
                        `}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="flex-1 line-clamp-1">{lesson.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)]">
      <Navbar />

      <div className="flex flex-1 relative">
        {/* Desktop Sidebar */}
        <aside
          className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[var(--border-color)] bg-[var(--bg-sidebar)] sticky top-16 h-[calc(100vh-64px)] overflow-y-auto"
          aria-label="Course sidebar"
        >
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-30" onClick={() => setIsSidebarOpen(false)}>
            <div className="absolute inset-0 bg-black/60" />
            <aside
              className="absolute left-0 top-0 bottom-0 w-72 bg-[var(--bg-sidebar)] border-r border-[var(--border-color)] overflow-y-auto animate-slide-down"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-[var(--border-color)]">
                <span className="font-semibold text-[var(--text-primary)]">Course Navigation</span>
                <button onClick={() => setIsSidebarOpen(false)} className="btn-ghost p-1.5" aria-label="Close navigation">
                  <X size={18} />
                </button>
              </div>
              <SidebarContent />
            </aside>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="flex">
            {/* Article */}
            <article className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-8 max-w-[850px]">
              {/* Mobile: Sidebar toggle */}
              <div className="lg:hidden mb-4">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="btn-secondary text-sm"
                >
                  <Menu size={16} />
                  Course Navigation
                </button>
              </div>

              {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}

              {children}
            </article>

            {/* Table of Contents (right sidebar) */}
            {tocContent && (
              <aside className="hidden xl:block w-56 shrink-0 py-8 pr-6">
                <TableOfContents content={tocContent} />
              </aside>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
