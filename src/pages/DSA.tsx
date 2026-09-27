import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, CheckCircle2, BookOpen, Zap } from 'lucide-react';
import { dsaTopics } from '../data/dsaTopics';
import { dsaProblems } from '../data/dsaProblems';
import { useProgress } from '../hooks/useProgress';
import { DifficultyBadge } from '../components/common/Badge';
import { Helmet } from 'react-helmet-async';

export function DSA() {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');

  const { isProblemSolved } = useProgress();

  // Global stats
  const totalProblems = dsaProblems.length;
  const solvedCount = dsaProblems.filter(p => isProblemSolved(p.slug)).length;
  const progressPercent = totalProblems > 0 ? Math.round((solvedCount / totalProblems) * 100) : 0;

  // Last unsolved problem for "Continue Learning"
  const nextProblem = useMemo(() => {
    for (const topic of dsaTopics) {
      for (const slug of topic.problemIds) {
        const problem = dsaProblems.find(p => p.slug === slug);
        if (problem && !isProblemSolved(slug)) return { problem, topic };
      }
    }
    return null;
  }, [isProblemSolved]);

  // Topic-level stats and filtering
  const topicData = useMemo(() => {
    return dsaTopics.map(topic => {
      const problems = dsaProblems.filter(p =>
        p.topicId === topic.id || p.topicIds?.includes(topic.id)
      );
      const solved = problems.filter(p => isProblemSolved(p.slug)).length;
      const easy = problems.filter(p => p.difficulty === 'Easy').length;
      const medium = problems.filter(p => p.difficulty === 'Medium').length;
      const hard = problems.filter(p => p.difficulty === 'Hard').length;
      const pct = problems.length > 0 ? Math.round((solved / problems.length) * 100) : 0;

      // Filter by difficulty if active
      const filteredProblems = difficultyFilter === 'All'
        ? problems
        : problems.filter(p => p.difficulty === difficultyFilter);

      return { topic, problems, filteredProblems, solved, easy, medium, hard, pct };
    });
  }, [isProblemSolved, difficultyFilter]);

  // Search — filter both topics and their problems
  const visibleTopics = useMemo(() => {
    if (!searchQuery.trim()) return topicData.filter(t => t.filteredProblems.length > 0);
    const q = searchQuery.toLowerCase();
    return topicData.filter(t =>
      t.topic.name.toLowerCase().includes(q) ||
      t.topic.description.toLowerCase().includes(q) ||
      t.filteredProblems.some(p =>
        p.title.toLowerCase().includes(q) ||
        p.tags.some(tag => tag.toLowerCase().includes(q))
      )
    ).filter(t => t.filteredProblems.length > 0);
  }, [topicData, searchQuery]);

  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
    green: 'bg-green-500/10 text-green-400 border-green-500/20',
    yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    pink: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    teal: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    violet: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  };

  const progressColorMap: Record<string, string> = {
    blue: 'bg-blue-500', purple: 'bg-purple-500', cyan: 'bg-cyan-500',
    green: 'bg-green-500', yellow: 'bg-yellow-500', indigo: 'bg-indigo-500',
    orange: 'bg-orange-500', pink: 'bg-pink-500', emerald: 'bg-emerald-500',
    teal: 'bg-teal-500', violet: 'bg-violet-500', rose: 'bg-rose-500',
  };

  return (
    <div className="container-content py-10 lg:py-16">
      <Helmet>
        <title>DSA in Swift | iOSCraft</title>
        <meta name="description" content="Master Data Structures and Algorithms with structured topics, Swift solutions, and coding interview prep. Topics include Arrays, Strings, Trees, Graphs, and Dynamic Programming." />
      </Helmet>

      {/* ── Header ── */}
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--text-primary)] mb-4">
          Data Structures &amp; Algorithms
          <span className="block text-brand-success">in Swift</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-8">
          Master coding interviews with structured topics, multiple solution approaches, optimized Swift implementations, and clear complexity analysis.
        </p>

        {/* Stats + CTA Row */}
        <div className="flex flex-wrap gap-6 items-start mb-8">
          {/* Overall Progress */}
          <div className="card p-5 min-w-[280px] flex-1 max-w-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-[var(--text-primary)]">Overall Progress</span>
              <span className="text-sm font-bold text-brand-success">{progressPercent}%</span>
            </div>
            <div className="h-2 rounded-full bg-[var(--bg-primary)] mb-3 overflow-hidden">
              <div
                className="h-full bg-brand-success rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-[var(--text-muted)]">
              {solvedCount} of {totalProblems} problems solved
            </p>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-4">
            <div className="card p-4 text-center min-w-[80px]">
              <div className="text-2xl font-bold text-[var(--text-primary)]">{dsaTopics.length}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">Topics</div>
            </div>
            <div className="card p-4 text-center min-w-[80px]">
              <div className="text-2xl font-bold text-[var(--text-primary)]">{totalProblems}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">Problems</div>
            </div>
            <div className="card p-4 text-center min-w-[80px]">
              <div className="text-2xl font-bold text-brand-success">{solvedCount}</div>
              <div className="text-xs text-[var(--text-muted)] mt-1">Solved</div>
            </div>
          </div>

          {/* Continue Learning */}
          {nextProblem && (
            <Link
              to={`/dsa/${nextProblem.topic.slug}/${nextProblem.problem.slug}`}
              className="card p-4 flex items-center gap-3 hover:border-brand-success transition-colors group min-w-[240px] flex-1 max-w-xs"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-success/10 flex items-center justify-center shrink-0">
                <Zap size={18} className="text-brand-success" />
              </div>
              <div className="min-w-0">
                <div className="text-xs text-[var(--text-muted)] mb-0.5">Continue Learning</div>
                <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-success transition-colors truncate">
                  {nextProblem.problem.title}
                </div>
                <div className="text-xs text-[var(--text-muted)]">{nextProblem.topic.name}</div>
              </div>
              <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-brand-success ml-auto shrink-0" />
            </Link>
          )}
        </div>

        {/* ── Filters & Search ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search topics or problems..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input-field pl-10"
              id="dsa-search"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(['All', 'Easy', 'Medium', 'Hard'] as const).map(d => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  difficultyFilter === d
                    ? d === 'Easy' ? 'bg-brand-success text-dark-bg border-brand-success'
                      : d === 'Medium' ? 'bg-brand-orange text-dark-bg border-brand-orange'
                      : d === 'Hard' ? 'bg-red-500 text-white border-red-500'
                      : 'bg-[var(--text-primary)] text-[var(--bg-primary)] border-transparent'
                    : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--text-muted)]'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Topic Cards Grid ── */}
      {visibleTopics.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">No results found</h3>
          <p className="text-[var(--text-secondary)]">Try a different search term or filter.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visibleTopics.map(({ topic, filteredProblems, solved, easy, medium, hard, pct }) => {
            const totalInTopic = dsaProblems.filter(p => p.topicId === topic.id || p.topicIds?.includes(topic.id)).length;
            const solvedInTopic = dsaProblems.filter(p =>
              (p.topicId === topic.id || p.topicIds?.includes(topic.id)) && isProblemSolved(p.slug)
            ).length;
            const colorClass = colorMap[topic.color] || colorMap.blue;
            const progressColor = progressColorMap[topic.color] || 'bg-blue-500';
            const firstUnsolvedSlug = topic.problemIds.find(id => !isProblemSolved(id));

            return (
              <div key={topic.id} className="card p-5 flex flex-col gap-4 hover:border-[var(--text-muted)] transition-colors group">
                {/* Icon + Name */}
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center text-xl shrink-0 ${colorClass}`}>
                    {topic.icon}
                  </div>
                  {solvedInTopic === totalInTopic && totalInTopic > 0 && (
                    <CheckCircle2 size={18} className="text-brand-success shrink-0 mt-1" />
                  )}
                </div>

                <div>
                  <Link to={`/dsa/${topic.slug}`}>
                    <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-brand-success transition-colors mb-1">
                      {topic.name}
                    </h2>
                  </Link>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {topic.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[var(--text-muted)]">{solvedInTopic} / {totalInTopic} problems</span>
                    <span className="font-semibold text-[var(--text-secondary)]">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Difficulty distribution */}
                <div className="flex gap-2 text-xs">
                  {easy > 0 && <span className="px-2 py-0.5 bg-brand-success/10 text-brand-success rounded">{easy} Easy</span>}
                  {medium > 0 && <span className="px-2 py-0.5 bg-brand-orange/10 text-brand-orange rounded">{medium} Medium</span>}
                  {hard > 0 && <span className="px-2 py-0.5 bg-red-500/10 text-red-400 rounded">{hard} Hard</span>}
                </div>

                {/* Search-matched problems preview */}
                {searchQuery && filteredProblems.length > 0 && filteredProblems.length < totalInTopic && (
                  <div className="bg-[var(--bg-primary)] rounded-lg border border-[var(--border-color)] p-2 space-y-1">
                    <div className="text-xs text-[var(--text-muted)] px-1 mb-1.5">Matching problems:</div>
                    {filteredProblems.slice(0, 3).map(p => (
                      <Link
                        key={p.slug}
                        to={`/dsa/${topic.slug}/${p.slug}`}
                        className="flex items-center justify-between gap-2 px-2 py-1.5 rounded hover:bg-[var(--bg-sidebar)] transition-colors"
                      >
                        <span className="text-sm text-[var(--text-primary)] truncate">{p.title}</span>
                        <DifficultyBadge difficulty={p.difficulty} />
                      </Link>
                    ))}
                    {filteredProblems.length > 3 && (
                      <div className="text-xs text-[var(--text-muted)] px-2">
                        +{filteredProblems.length - 3} more
                      </div>
                    )}
                  </div>
                )}

                {/* Action Button */}
                <Link
                  to={firstUnsolvedSlug ? `/dsa/${topic.slug}/${firstUnsolvedSlug}` : `/dsa/${topic.slug}`}
                  className="btn-secondary mt-auto text-sm flex items-center justify-center gap-2 group/btn"
                >
                  <BookOpen size={14} />
                  {solvedInTopic === 0 ? 'Start Learning' : solvedInTopic === totalInTopic ? 'Review' : 'Continue'}
                  <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
