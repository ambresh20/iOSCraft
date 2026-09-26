import { useState, useCallback, useEffect, useRef } from 'react';
import type { SearchResult } from '../types/content';
import { interviewQuestions } from '../data/interviewQuestions';
import { dsaProblems } from '../data/dsaProblems';
import { blogPosts } from '../data/blogPosts';
import { getAllLessons } from '../data/swiftLessons';

// ============================================================
// SEARCH INDEX BUILDER
// ============================================================

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Lessons
  const lessons = getAllLessons();
  for (const lesson of lessons) {
    results.push({
      id: lesson.id,
      title: lesson.title,
      description: lesson.description,
      category: lesson.category,
      type: 'lesson',
      slug: lesson.slug,
      url: `/learn/swift/${lesson.slug}`,
      difficulty: lesson.difficulty,
      tags: lesson.tags,
    });
  }

  // Interview Questions
  for (const q of interviewQuestions) {
    results.push({
      id: q.id,
      title: q.title,
      description: q.description,
      category: q.category,
      type: 'interview',
      slug: q.slug,
      url: `/interview/${q.slug}`,
      difficulty: q.difficulty,
      tags: q.tags,
    });
  }

  // DSA Problems
  for (const p of dsaProblems) {
    results.push({
      id: p.id,
      title: p.title,
      description: p.description,
      category: p.category,
      type: 'dsa',
      slug: p.slug,
      url: `/dsa/${p.slug}`,
      difficulty: p.difficulty,
      tags: p.tags,
    });
  }

  // Blog Posts
  for (const post of blogPosts) {
    results.push({
      id: post.id,
      title: post.title,
      description: post.description,
      category: post.category,
      type: 'blog',
      slug: post.slug,
      url: `/blog/${post.slug}`,
      tags: post.tags,
    });
  }

  return results;
}

const SEARCH_INDEX = buildSearchIndex();

// ============================================================
// SEARCH FUNCTION
// ============================================================

function performSearch(query: string): SearchResult[] {
  if (!query.trim() || query.length < 2) return [];

  const q = query.toLowerCase().trim();
  const words = q.split(/\s+/);

  return SEARCH_INDEX.filter(item => {
    const searchText = [
      item.title,
      item.description,
      item.category,
      ...item.tags,
    ].join(' ').toLowerCase();

    return words.every(word => searchText.includes(word));
  }).slice(0, 20);
}

// ============================================================
// useSearch HOOK
// ============================================================

const RECENT_SEARCHES_KEY = 'ioscraft_recent_searches';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const search = useCallback((searchQuery: string) => {
    setQuery(searchQuery);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (!searchQuery.trim()) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(() => {
      const searchResults = performSearch(searchQuery);
      setResults(searchResults);
      setIsSearching(false);
    }, 200);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery('');
    setResults([]);
    setIsSearching(false);
  }, []);

  const openSearch = useCallback(() => setIsOpen(true), []);
  const closeSearch = useCallback(() => {
    setIsOpen(false);
    clearSearch();
  }, [clearSearch]);

  const saveRecentSearch = useCallback((q: string) => {
    if (!q.trim()) return;
    setRecentSearches(prev => {
      const updated = [q, ...prev.filter(s => s !== q)].slice(0, 8);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  }, []);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) closeSearch();
        else openSearch();
      }
      if (e.key === 'Escape' && isOpen) {
        closeSearch();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, openSearch, closeSearch]);

  return {
    query,
    results,
    isSearching,
    isOpen,
    recentSearches,
    search,
    clearSearch,
    openSearch,
    closeSearch,
    saveRecentSearch,
    clearRecentSearches,
  };
}
