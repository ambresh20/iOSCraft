import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Code2, CheckCircle, Circle } from 'lucide-react';
import { dsaProblems, dsaCategories } from '../data/dsaProblems';
import { DifficultyBadge, TagBadge } from '../components/common/Badge';
import { useProgress } from '../hooks/useProgress';
import { Helmet } from 'react-helmet-async';

export function DSA() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const { isProblemSolved, getTotalProgress } = useProgress();

  // Progress calculation
  const totalProblems = dsaProblems.length;
  const solvedCount = dsaProblems.filter(p => isProblemSolved(p.slug)).length;
  const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  // Filter problems
  const filteredProblems = dsaProblems.filter((p) => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesDifficulty = difficultyFilter === 'All' || p.difficulty === difficultyFilter;
    const matchesStatus = 
      statusFilter === 'All' ? true :
      statusFilter === 'Solved' ? isProblemSolved(p.slug) :
      !isProblemSolved(p.slug);
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesDifficulty && matchesStatus && matchesSearch;
  });

  return (
    <div className="container-content py-10 lg:py-16">
      <Helmet>
        <title>DSA in Swift | iOSCraft</title>
        <meta name="description" content="Master coding interviews through problem statements, test cases, multiple approaches, optimized Swift solutions, and complexity analysis." />
      </Helmet>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Data Structures & Algorithms in Swift
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-3xl mb-8">
          Master coding interviews with step-by-step Swift solutions. Learn multiple approaches, time/space complexity analysis, and idiomatic Swift implementations.
        </p>

        {/* Progress Overview */}
        <div className="card p-6 max-w-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] flex items-center gap-2">
              <Code2 size={16} className="text-brand-success" />
              DSA Progress
            </h2>
            <span className="text-xs font-bold text-brand-success">{progressPercent}%</span>
          </div>
          <div className="progress-bar mb-3">
            <div 
              className="h-full bg-brand-success rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            You have solved {solvedCount} of {totalProblems} problems.
          </p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        {/* Search & Selects */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search problems or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="input-field sm:w-40 appearance-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input-field sm:w-40 appearance-none"
          >
            <option value="All">All Status</option>
            <option value="Solved">Solved</option>
            <option value="Unsolved">Unsolved</option>
          </select>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-2">
          {dsaCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-brand-success hover:text-brand-success'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Problem List (Table format for DSA) */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[var(--bg-sidebar)] border-b border-[var(--border-color)]">
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-12 text-center">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)]">
              {filteredProblems.length > 0 ? (
                filteredProblems.map((problem) => {
                  const solved = isProblemSolved(problem.slug);
                  return (
                    <tr key={problem.id} className="hover:bg-[var(--bg-primary)] transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {solved ? (
                          <CheckCircle size={18} className="text-brand-success mx-auto" />
                        ) : (
                          <Circle size={18} className="text-[var(--border-color)] mx-auto group-hover:text-[var(--text-muted)] transition-colors" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <Link to={`/dsa/${problem.slug}`} className="block">
                          <span className="text-[var(--text-primary)] font-medium group-hover:text-brand-success transition-colors">
                            {problem.title}
                          </span>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                        <span className="text-sm text-[var(--text-secondary)]">{problem.category}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-[var(--text-muted)]">
                    No problems found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
