import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Clock, ArrowRight, BookOpen, MessageSquare, Code2, FileText, LayoutTemplate, Trash2 } from 'lucide-react';
import { useBookmarks } from '../hooks/useBookmarks';
import { Helmet } from 'react-helmet-async';
import { DifficultyBadge } from '../components/common/Badge';

export function Bookmarks() {
  const { bookmarks, removeBookmark, clearBookmarks, totalCount } = useBookmarks();
  const [filter, setFilter] = useState<string>('all');

  const filteredBookmarks = filter === 'all' 
    ? bookmarks 
    : bookmarks.filter(b => b.type === filter);

  const getIcon = (type: string) => {
    switch(type) {
      case 'lesson': return <BookOpen size={16} className="text-blue-400" />;
      case 'interview': return <MessageSquare size={16} className="text-brand-purple" />;
      case 'dsa': return <Code2 size={16} className="text-brand-success" />;
      case 'blog': return <FileText size={16} className="text-brand-orange" />;
      case 'project': return <LayoutTemplate size={16} className="text-pink-400" />;
      default: return <Bookmark size={16} className="text-[var(--text-muted)]" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'lesson': return 'Lesson';
      case 'interview': return 'Interview Q';
      case 'dsa': return 'DSA Problem';
      case 'blog': return 'Article';
      case 'project': return 'Project';
      default: return type;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Helmet>
        <title>My Bookmarks | iOSCraft</title>
      </Helmet>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-3">
            <Bookmark className="text-brand-orange" />
            My Bookmarks
          </h1>
          <p className="text-[var(--text-secondary)]">
            You have {totalCount} saved item{totalCount !== 1 ? 's' : ''}.
          </p>
        </div>
        {totalCount > 0 && (
          <button 
            onClick={() => {
              if (window.confirm('Are you sure you want to clear all bookmarks?')) {
                clearBookmarks();
              }
            }}
            className="btn-ghost text-red-400 hover:text-red-500 hover:bg-red-500/10 self-start sm:self-auto"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        )}
      </div>

      {totalCount === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center mx-auto mb-4 text-[var(--text-muted)]">
            <Bookmark size={24} />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-2">No bookmarks yet</h2>
          <p className="text-[var(--text-secondary)] mb-6 max-w-md mx-auto">
            Save lessons, interview questions, and DSA problems to easily find them later.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/learn" className="btn-secondary">Browse Lessons</Link>
            <Link to="/interview" className="btn-secondary">Interview Questions</Link>
          </div>
        </div>
      ) : (
        <>
          {/* Filters */}
          <div className="flex overflow-x-auto pb-4 scrollbar-hide gap-2 mb-4">
            <button
              onClick={() => setFilter('all')}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              All Items ({totalCount})
            </button>
            {['lesson', 'interview', 'dsa', 'blog'].map((type) => {
              const count = bookmarks.filter(b => b.type === type).length;
              if (count === 0) return null;
              return (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    filter === type
                      ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                      : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-brand-orange hover:text-brand-orange'
                  }`}
                >
                  {getTypeLabel(type)} ({count})
                </button>
              );
            })}
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark) => (
              <div key={bookmark.id} className="card p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center group">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex items-center gap-1.5 text-xs font-medium bg-[var(--bg-primary)] px-2 py-1 rounded border border-[var(--border-color)]">
                      {getIcon(bookmark.type)}
                      {getTypeLabel(bookmark.type)}
                    </span>
                    <span className="text-xs text-[var(--text-muted)] hidden sm:inline">
                      Saved {new Date(bookmark.bookmarkedAt).toLocaleDateString()}
                    </span>
                    {bookmark.difficulty && (
                      <DifficultyBadge difficulty={bookmark.difficulty as any} />
                    )}
                  </div>
                  <Link to={bookmark.url} className="block">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors truncate">
                      {bookmark.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[var(--text-muted)] mt-1 truncate">
                    {bookmark.category}
                  </p>
                </div>
                
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:w-auto w-full pt-3 sm:pt-0 border-t sm:border-t-0 border-[var(--border-color)]">
                  <button 
                    onClick={() => removeBookmark(bookmark.id)}
                    className="text-xs text-[var(--text-muted)] hover:text-red-400 transition-colors"
                  >
                    Remove
                  </button>
                  <Link to={bookmark.url} className="btn-secondary py-1.5 px-3 text-sm">
                    View <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
            
            {filteredBookmarks.length === 0 && (
              <div className="text-center py-12 text-[var(--text-muted)]">
                No items found for this filter.
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
