import React, { useMemo } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, BookOpen, Bookmark } from 'lucide-react';
import { getDSATopic } from '../data/dsaTopics';
import { getProblemsByTopicOrdered } from '../data/dsaProblems';
import { DifficultyBadge } from '../components/common/Badge';
import { useProgress } from '../hooks/useProgress';
import { useBookmarks } from '../hooks/useBookmarks';
import { dsaTopics } from '../data/dsaTopics';
import { Helmet } from 'react-helmet-async';

export function DSATopicPage() {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const topic = topicSlug ? getDSATopic(topicSlug) : undefined;
  const { isProblemSolved } = useProgress();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  if (!topic) return <Navigate to="/dsa" replace />;

  const problems = getProblemsByTopicOrdered(topic.id, topic.problemIds);
  const solvedCount = problems.filter(p => isProblemSolved(p.slug)).length;
  const progressPercent = problems.length > 0 ? Math.round((solvedCount / problems.length) * 100) : 0;

  // Sibling topics for navigation
  const topicIndex = dsaTopics.findIndex(t => t.id === topic.id);
  const prevTopic = topicIndex > 0 ? dsaTopics[topicIndex - 1] : undefined;
  const nextTopic = topicIndex < dsaTopics.length - 1 ? dsaTopics[topicIndex + 1] : undefined;

  const colorMap: Record<string, string> = {
    blue: 'from-blue-500/20 to-transparent border-blue-500/30',
    purple: 'from-purple-500/20 to-transparent border-purple-500/30',
    cyan: 'from-cyan-500/20 to-transparent border-cyan-500/30',
    green: 'from-green-500/20 to-transparent border-green-500/30',
    yellow: 'from-yellow-500/20 to-transparent border-yellow-500/30',
    indigo: 'from-indigo-500/20 to-transparent border-indigo-500/30',
    orange: 'from-orange-500/20 to-transparent border-orange-500/30',
    pink: 'from-pink-500/20 to-transparent border-pink-500/30',
    emerald: 'from-emerald-500/20 to-transparent border-emerald-500/30',
    teal: 'from-teal-500/20 to-transparent border-teal-500/30',
    violet: 'from-violet-500/20 to-transparent border-violet-500/30',
    rose: 'from-rose-500/20 to-transparent border-rose-500/30',
  };

  const progressColorMap: Record<string, string> = {
    blue: 'bg-blue-500', purple: 'bg-purple-500', cyan: 'bg-cyan-500',
    green: 'bg-green-500', yellow: 'bg-yellow-500', indigo: 'bg-indigo-500',
    orange: 'bg-orange-500', pink: 'bg-pink-500', emerald: 'bg-emerald-500',
    teal: 'bg-teal-500', violet: 'bg-violet-500', rose: 'bg-rose-500',
  };

  return (
    <div className="container-content py-8 lg:py-12">
      <Helmet>
        <title>{topic.name} — DSA in Swift | iOSCraft</title>
        <meta name="description" content={topic.description} />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
        <Link to="/dsa" className="hover:text-brand-success transition-colors">DSA</Link>
        <span>▶</span>
        <span className="text-[var(--text-primary)] font-medium">{topic.name}</span>
      </nav>

      {/* Topic Header */}
      <div className={`rounded-2xl border bg-gradient-to-br p-6 sm:p-8 mb-10 ${colorMap[topic.color] || colorMap.blue}`}>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="text-4xl w-14 h-14 flex items-center justify-center bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]">
              {topic.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">{topic.name}</h1>
              <p className="text-[var(--text-secondary)] max-w-2xl">{topic.description}</p>
            </div>
          </div>
          {/* Progress */}
          <div className="md:text-right shrink-0">
            <div className="text-3xl font-bold text-[var(--text-primary)] mb-1">{progressPercent}%</div>
            <div className="text-sm text-[var(--text-muted)]">{solvedCount} / {problems.length} solved</div>
            <div className="mt-2 h-2 w-32 rounded-full bg-[var(--bg-primary)] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${progressColorMap[topic.color] || 'bg-blue-500'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* What you'll learn + Prerequisites */}
        <div className="grid sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[var(--border-color)]">
          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">What you'll learn</h3>
            <ul className="space-y-1.5">
              {topic.whatYouLearn.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                  <span className="text-brand-success mt-0.5 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {topic.prerequisites.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3 uppercase tracking-wider">Prerequisites</h3>
              <div className="flex flex-wrap gap-2">
                {topic.prerequisites.map(prereqId => {
                  const prereqTopic = dsaTopics.find(t => t.id === prereqId);
                  return prereqTopic ? (
                    <Link
                      key={prereqId}
                      to={`/dsa/${prereqTopic.slug}`}
                      className="px-3 py-1.5 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-sm text-[var(--text-secondary)] hover:border-brand-success hover:text-brand-success transition-colors"
                    >
                      {prereqTopic.icon} {prereqTopic.name}
                    </Link>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {topic.swiftNotes && (
          <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl text-sm text-blue-300">
            <span className="font-semibold text-blue-200">Swift Notes: </span>{topic.swiftNotes}
          </div>
        )}
      </div>

      {/* Problems Table */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4">
          Problems ({problems.length})
        </h2>

        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-sidebar)] border-b border-[var(--border-color)]">
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider w-10 text-center">#</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Problem</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden sm:table-cell">Pattern</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">Difficulty</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider hidden lg:table-cell"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)]">
                {problems.map((problem, index) => {
                  const solved = isProblemSolved(problem.slug);
                  const bookmarked = isBookmarked(problem.slug);
                  return (
                    <tr key={problem.id} className="hover:bg-[var(--bg-primary)] transition-colors group">
                      <td className="px-4 py-4 text-center text-sm text-[var(--text-muted)] font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {solved ? (
                          <CheckCircle2 size={18} className="text-brand-success mx-auto" />
                        ) : (
                          <Circle size={18} className="text-[var(--border-color)] mx-auto" />
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <Link to={`/dsa/${topic.slug}/${problem.slug}`} className="block">
                          <span className={`font-medium text-sm transition-colors group-hover:text-brand-success ${solved ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'}`}>
                            {problem.title}
                          </span>
                          {problem.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="ml-2 text-xs text-[var(--text-muted)] hidden sm:inline-block">
                              #{tag}
                            </span>
                          ))}
                        </Link>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell">
                        <span className="text-xs text-[var(--text-muted)] bg-[var(--bg-primary)] px-2 py-1 rounded">
                          {problem.pattern || problem.tags[0] || '—'}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <DifficultyBadge difficulty={problem.difficulty} />
                      </td>
                      <td className="px-4 py-4 hidden lg:table-cell">
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => toggleBookmark({
                              id: problem.id,
                              slug: problem.slug,
                              type: 'dsa',
                              title: problem.title,
                              url: `/dsa/${topic.slug}/${problem.slug}`,
                              category: topic.name,
                              difficulty: problem.difficulty,
                            })}
                            className="text-[var(--text-muted)] hover:text-brand-orange transition-colors"
                            aria-label="Bookmark"
                          >
                            <Bookmark size={14} className={bookmarked ? 'fill-brand-orange text-brand-orange' : ''} />
                          </button>
                          <Link
                            to={`/dsa/${topic.slug}/${problem.slug}`}
                            className="text-xs text-brand-success hover:underline flex items-center gap-1"
                          >
                            Solve <ArrowRight size={12} />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Topic Navigation */}
      <div className="flex justify-between gap-4">
        {prevTopic ? (
          <Link to={`/dsa/${prevTopic.slug}`} className="card px-4 py-3 flex items-center gap-3 hover:border-brand-success transition-colors group">
            <ArrowLeft size={16} className="text-[var(--text-muted)] group-hover:text-brand-success" />
            <div>
              <div className="text-xs text-[var(--text-muted)]">Previous Topic</div>
              <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-success transition-colors">
                {prevTopic.icon} {prevTopic.name}
              </div>
            </div>
          </Link>
        ) : <div />}
        {nextTopic ? (
          <Link to={`/dsa/${nextTopic.slug}`} className="card px-4 py-3 flex items-center gap-3 hover:border-brand-success transition-colors group text-right">
            <div>
              <div className="text-xs text-[var(--text-muted)]">Next Topic</div>
              <div className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-success transition-colors">
                {nextTopic.icon} {nextTopic.name}
              </div>
            </div>
            <ArrowRight size={16} className="text-[var(--text-muted)] group-hover:text-brand-success" />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
