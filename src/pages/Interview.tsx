import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, ChevronRight } from 'lucide-react';
import { interviewQuestions, interviewCategories } from '../data/interviewQuestions';
import { DifficultyBadge } from '../components/common/Badge';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { Helmet } from 'react-helmet-async';

export function Interview() {
  const [activeCategory, setActiveCategory] = useState('All Questions');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');

  // Filter questions
  const filteredQuestions = interviewQuestions.filter((q) => {
    const matchesCategory = activeCategory === 'All Questions' || q.category === activeCategory;
    const matchesDifficulty = difficultyFilter === 'All' || q.difficulty === difficultyFilter;
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          q.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="container-content py-10 lg:py-16">
      <Helmet>
        <title>iOS Interview Questions | iOSCraft</title>
        <meta name="description" content="Prepare for iOS technical interviews with detailed explanations, code examples, and topic-wise questions." />
      </Helmet>

      {/* Header */}
      <div className="mb-10 text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          iOS Developer Interview Questions
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Prepare for your next interview with our curated list of Swift, SwiftUI, UIKit, and architecture questions. Each includes detailed answers and code examples.
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        {/* Search & Difficulty */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="input-field sm:w-48 appearance-none bg-no-repeat"
            style={{
              backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%239CA3AF%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")',
              backgroundPosition: 'right 12px top 50%',
              backgroundSize: '10px auto',
            }}
          >
            <option value="All">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Categories (Scrollable horizontally) */}
        <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-2">
          {interviewCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((q) => (
            <Link
              key={q.id}
              to={`/interview/${q.slug}`}
              className="card-hover p-6 group flex flex-col h-full"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <DifficultyBadge difficulty={q.difficulty!} />
                <div onClick={(e) => e.preventDefault()}>
                  <BookmarkButton item={{...q, type: 'interview', url: `/interview/${q.slug}`}} />
                </div>
              </div>
              
              <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors mb-3 line-clamp-2">
                {q.title}
              </h3>
              
              <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-6 flex-1">
                {q.shortAnswer}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-color)]">
                <span className="badge badge-gray">{q.category}</span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock size={12} />
                    {q.readingTime}m
                  </div>
                  <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:text-brand-orange transition-colors" />
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <Search size={48} className="mx-auto text-[var(--border-color)] mb-4" />
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No questions found</h3>
            <p className="text-[var(--text-muted)]">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All Questions');
                setDifficultyFilter('All');
              }}
              className="mt-6 btn-ghost"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
