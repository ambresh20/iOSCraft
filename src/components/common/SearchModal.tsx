import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Clock, ArrowRight, Code2, BookOpen, MessageSquare, FileText } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { DifficultyBadge } from './Badge';
import type { SearchResult } from '../../types/content';

const TypeIcon = ({ type }: { type: SearchResult['type'] }) => {
  switch (type) {
    case 'lesson': return <BookOpen size={14} className="text-blue-400" />;
    case 'interview': return <MessageSquare size={14} className="text-brand-purple" />;
    case 'dsa': return <Code2 size={14} className="text-brand-success" />;
    case 'blog': return <FileText size={14} className="text-brand-orange" />;
    default: return <FileText size={14} className="text-[var(--text-muted)]" />;
  }
};

const typeLabel: Record<SearchResult['type'], string> = {
  lesson: 'Lesson',
  interview: 'Interview',
  dsa: 'DSA',
  swiftui: 'SwiftUI',
  uikit: 'UIKit',
  architecture: 'Architecture',
  blog: 'Blog',
  project: 'Project',
};

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { query, results, isSearching, recentSearches, search, clearSearch, saveRecentSearch, clearRecentSearches } = useSearch();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(-1);
    } else {
      clearSearch();
    }
  }, [isOpen, clearSearch]);

  const handleSelect = (result: SearchResult) => {
    saveRecentSearch(query);
    navigate(result.url);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, -1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (selectedIndex >= 0 && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Search iOSCraft"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 bg-glass"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl shadow-2xl overflow-hidden animate-slide-down">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border-color)]">
          <Search size={20} className="text-[var(--text-muted)] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tutorials, questions, problems..."
            value={query}
            onChange={e => { search(e.target.value); setSelectedIndex(-1); }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-[15px] outline-none"
            aria-autocomplete="list"
            aria-expanded={results.length > 0}
          />
          {query && (
            <button onClick={clearSearch} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors" aria-label="Clear search">
              <X size={16} />
            </button>
          )}
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-[var(--text-muted)] border border-[var(--border-color)] rounded-md font-mono">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto" role="listbox">
          {/* Loading */}
          {isSearching && (
            <div className="p-4 text-center text-[var(--text-muted)] text-sm">
              Searching...
            </div>
          )}

          {/* Results */}
          {!isSearching && query && results.length > 0 && (
            <div className="p-2">
              <p className="px-3 py-1.5 text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">
                {results.length} Result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleSelect(result)}
                  role="option"
                  aria-selected={selectedIndex === index}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-100 group ${
                    selectedIndex === index
                      ? 'bg-brand-orange/10 text-brand-orange'
                      : 'hover:bg-[var(--bg-primary)] text-[var(--text-primary)]'
                  }`}
                >
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center">
                    <TypeIcon type={result.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{result.title}</p>
                    <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{result.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {result.difficulty && <DifficultyBadge difficulty={result.difficulty} />}
                    <span className="text-xs text-[var(--text-muted)] hidden sm:block bg-[var(--bg-primary)] px-2 py-0.5 rounded">
                      {typeLabel[result.type]}
                    </span>
                    <ArrowRight size={14} className="text-[var(--text-muted)] group-hover:text-brand-orange transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results */}
          {!isSearching && query && results.length === 0 && (
            <div className="p-8 text-center">
              <Search size={32} className="mx-auto text-[var(--text-muted)] mb-3 opacity-50" />
              <p className="text-[var(--text-secondary)] text-sm">No results for "<span className="font-medium text-[var(--text-primary)]">{query}</span>"</p>
              <p className="text-[var(--text-muted)] text-xs mt-1">Try different keywords or browse the sections above.</p>
            </div>
          )}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <div className="p-2">
              <div className="flex items-center justify-between px-3 py-1.5">
                <p className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">Recent</p>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-[var(--text-muted)] hover:text-brand-orange transition-colors"
                >
                  Clear
                </button>
              </div>
              {recentSearches.map((recent, i) => (
                <button
                  key={i}
                  onClick={() => search(recent)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[var(--bg-primary)] text-left transition-colors"
                >
                  <Clock size={14} className="text-[var(--text-muted)]" />
                  <span className="text-sm text-[var(--text-secondary)]">{recent}</span>
                </button>
              ))}
            </div>
          )}

          {/* Empty state */}
          {!query && recentSearches.length === 0 && (
            <div className="p-6 text-center text-[var(--text-muted)] text-sm">
              <Search size={24} className="mx-auto mb-2 opacity-40" />
              <p>Type to search tutorials, interview questions, and DSA problems</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--border-color)] flex items-center gap-4 text-xs text-[var(--text-muted)]">
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 border border-[var(--border-color)] rounded font-mono">↑↓</kbd> Navigate</span>
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 border border-[var(--border-color)] rounded font-mono">↵</kbd> Select</span>
          <span className="flex items-center gap-1"><kbd className="px-1.5 py-0.5 border border-[var(--border-color)] rounded font-mono">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
