import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  ArrowLeft, ArrowRight, CheckCircle2, Bookmark, ExternalLink, 
  Clock, Zap, LayoutList, Code2, AlertTriangle, Lightbulb
} from 'lucide-react';
import { getDSAProblem, getAdjacentProblems } from '../data/dsaProblems';
import { getDSATopic } from '../data/dsaTopics';
import { CodeBlock } from '../components/common/CodeBlock';
import { DifficultyBadge } from '../components/common/Badge';
import { useProgress } from '../hooks/useProgress';
import { useBookmarks } from '../hooks/useBookmarks';
import type { Approach } from '../types/dsa';

export function DSAProblemPage() {
  const { topicSlug, problemSlug } = useParams<{ topicSlug: string, problemSlug: string }>();
  const [activeApproach, setActiveApproach] = useState<number>(0);
  
  const problem = problemSlug ? getDSAProblem(problemSlug) : undefined;
  const topic = topicSlug ? getDSATopic(topicSlug) : undefined;
  
  const { isProblemSolved, markProblemSolved, unmarkProblemSolved } = useProgress();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  useEffect(() => {
    // Reset active approach when switching problems
    setActiveApproach(0);
    window.scrollTo(0, 0);
  }, [problemSlug]);

  if (!problem || !topic) {
    return <Navigate to="/dsa" replace />;
  }

  const { prev, next } = getAdjacentProblems(problem.slug, topic.id);
  const solved = isProblemSolved(problem.slug);
  const bookmarked = isBookmarked(problem.slug);

  const handleToggleSolved = () => {
    if (solved) {
      unmarkProblemSolved(problem.slug);
    } else {
      markProblemSolved(problem.slug);
    }
  };

  const handleToggleBookmark = () => {
    toggleBookmark({
      id: problem.id,
      slug: problem.slug,
      type: 'dsa',
      title: problem.title,
      url: `/dsa/${topic.slug}/${problem.slug}`,
      category: topic.name,
      difficulty: problem.difficulty,
    });
  };

  const approach: Approach | undefined = problem.approaches[activeApproach];

  return (
    <div className="container-content py-8 lg:py-12">
      <Helmet>
        <title>{problem.title} — Swift DSA | iOSCraft</title>
        <meta name="description" content={problem.description} />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="flex items-center flex-wrap gap-2 text-sm text-[var(--text-muted)] mb-8">
        <Link to="/dsa" className="hover:text-brand-success transition-colors">DSA</Link>
        <span>▶</span>
        <Link to={`/dsa/${topic.slug}`} className="hover:text-brand-success transition-colors">{topic.name}</Link>
        <span>▶</span>
        <span className="text-[var(--text-primary)] font-medium truncate">{problem.title}</span>
      </nav>

      {/* Header Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <Link 
          to={`/dsa/${topic.slug}`}
          className="btn-secondary py-2 px-4 text-sm inline-flex items-center gap-2 group"
        >
          <ArrowLeft size={16} className="text-[var(--text-muted)] group-hover:-translate-x-1 transition-transform" />
          Back to {topic.name}
        </Link>
        
        <div className="flex items-center gap-2">
          {problem.sourceUrl && (
            <a 
              href={problem.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-secondary py-2 px-3 text-sm inline-flex items-center gap-2"
              title="View on LeetCode"
            >
              <ExternalLink size={16} />
              <span className="hidden sm:inline">LeetCode</span>
            </a>
          )}
          <button 
            onClick={handleToggleBookmark}
            className={`btn-secondary py-2 px-3 text-sm inline-flex items-center gap-2 ${bookmarked ? 'border-brand-orange text-brand-orange' : ''}`}
            title={bookmarked ? "Remove Bookmark" : "Add Bookmark"}
          >
            <Bookmark size={16} className={bookmarked ? 'fill-brand-orange' : ''} />
            <span className="hidden sm:inline">{bookmarked ? 'Saved' : 'Save'}</span>
          </button>
          <button 
            onClick={handleToggleSolved}
            className={`btn-primary py-2 px-4 text-sm inline-flex items-center gap-2 ${solved ? 'bg-brand-success/20 text-brand-success border-brand-success hover:bg-brand-success/30' : ''}`}
          >
            <CheckCircle2 size={16} className={solved ? 'text-brand-success' : ''} />
            {solved ? 'Solved' : 'Mark as Solved'}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
        {/* Left Column: Content */}
        <div className="space-y-8">
          
          {/* Problem Title & Meta */}
          <div>
            <div className="flex items-center flex-wrap gap-3 mb-3">
              <h1 className="text-3xl md:text-4xl font-bold text-[var(--text-primary)]">
                {problem.title}
              </h1>
              <DifficultyBadge difficulty={problem.difficulty} />
              {solved && (
                <span className="px-2.5 py-1 rounded-full bg-brand-success/10 text-brand-success text-xs font-semibold flex items-center gap-1">
                  <CheckCircle2 size={14} /> Solved
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-[var(--text-muted)]">
              <div className="flex items-center gap-1.5">
                <LayoutList size={16} />
                {topic.name}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={16} />
                {problem.readingTime} min read
              </div>
              {problem.pattern && (
                <div className="flex items-center gap-1.5">
                  <Zap size={16} />
                  Pattern: {problem.pattern}
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          {problem.tags && problem.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {problem.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Problem Statement */}
          <section className="prose-ios max-w-none">
            <h2>Problem Statement</h2>
            <p>{problem.problemStatement}</p>
            
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 my-6">
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2 mt-0 uppercase tracking-wider">Input/Output Details</h4>
              <ul className="text-sm space-y-1 mb-0 mt-0">
                <li><span className="font-medium text-[var(--text-secondary)]">Input:</span> {problem.inputDescription}</li>
                <li><span className="font-medium text-[var(--text-secondary)]">Output:</span> {problem.outputDescription}</li>
              </ul>
            </div>
            
            <h3>Examples</h3>
            <div className="space-y-4">
              {problem.examples.map((example, i) => (
                <div key={i} className="bg-[var(--bg-primary)] rounded-lg p-4 border border-[var(--border-color)] font-mono text-sm">
                  <div className="text-[var(--text-primary)]"><span className="text-[var(--text-muted)] font-semibold select-none">Input: </span>{example.input}</div>
                  <div className="text-[var(--text-primary)] mt-1.5"><span className="text-[var(--text-muted)] font-semibold select-none">Output: </span>{example.output}</div>
                  {example.explanation && (
                    <div className="mt-2 pt-2 border-t border-[var(--border-color)] text-[var(--text-secondary)] font-sans">
                      <span className="font-semibold text-[var(--text-muted)] text-xs uppercase tracking-wider">Explanation:</span> {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <h3>Constraints</h3>
            <ul>
              {problem.constraints.map((constraint, i) => (
                <li key={i}><code>{constraint}</code></li>
              ))}
            </ul>
            
            {problem.keyObservations && problem.keyObservations.length > 0 && (
              <div className="bg-brand-success/5 border border-brand-success/20 rounded-xl p-5 my-8">
                <h3 className="text-brand-success flex items-center gap-2 mt-0 mb-3 text-lg">
                  <Lightbulb size={20} /> Key Observations
                </h3>
                <ul className="text-brand-success/80 mb-0 space-y-1 text-sm list-disc pl-5">
                  {problem.keyObservations.map((obs, i) => (
                    <li key={i}>{obs}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Approaches Tabs */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <Code2 className="text-brand-success" /> Solutions
            </h2>
            
            {problem.approaches.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-6 p-1 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)]">
                {problem.approaches.map((app, idx) => (
                  <button
                    key={app.id}
                    onClick={() => setActiveApproach(idx)}
                    className={`flex-1 min-w-[120px] py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeApproach === idx 
                        ? 'bg-[var(--bg-sidebar)] text-brand-success shadow-sm ring-1 ring-[var(--border-color)]' 
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                    }`}
                  >
                    {app.title}
                  </button>
                ))}
              </div>
            )}

            {/* Active Approach Detail */}
            {approach && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="prose-ios max-w-none">
                  <h3>Intuition</h3>
                  <p>{approach.intuition}</p>
                  
                  {approach.algorithm && approach.algorithm.length > 0 && (
                    <>
                      <h3>Algorithm</h3>
                      <ol>
                        {approach.algorithm.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>
                    </>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-4">Swift Implementation</h3>
                  <CodeBlock
                    code={approach.code}
                    language="swift"
                    filename={`${problem.slug}.swift`}
                  />
                </div>

                {/* Complexity Analysis */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]">
                    <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Time Complexity</div>
                    <div className="text-xl font-bold text-[var(--text-primary)] mb-2">{approach.timeComplexity}</div>
                    {approach.complexityExplanation && (
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{approach.complexityExplanation}</p>
                    )}
                  </div>
                  <div className="bg-[var(--bg-card)] rounded-xl p-5 border border-[var(--border-color)]">
                    <div className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-1">Space Complexity</div>
                    <div className="text-xl font-bold text-[var(--text-primary)] mb-2">{approach.spaceComplexity}</div>
                    {approach.complexityExplanation && (
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed hidden sm:block opacity-0 select-none">Spacer</p>
                    )}
                  </div>
                </div>
                
                {approach.limitations && approach.limitations.length > 0 && (
                  <div className="p-4 bg-brand-orange/5 border border-brand-orange/20 rounded-xl">
                    <div className="text-brand-orange font-semibold text-sm mb-2">Limitations</div>
                    <ul className="text-sm text-brand-orange/80 space-y-1 list-disc pl-4 mb-0">
                      {approach.limitations.map((limit, i) => <li key={i}>{limit}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </section>

        </div>

        {/* Right Column: Sidebar (Sticky) */}
        <div className="space-y-6 lg:sticky lg:top-24">
          
          {/* Edge Cases & Common Mistakes */}
          {(problem.edgeCases || problem.commonMistakes) && (
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <AlertTriangle size={16} className="text-brand-orange" />
                Gotchas
              </h3>
              
              {problem.edgeCases && problem.edgeCases.length > 0 && (
                <div className="mb-5">
                  <div className="text-xs font-semibold text-[var(--text-muted)] mb-2">EDGE CASES</div>
                  <ul className="text-sm space-y-2 text-[var(--text-secondary)]">
                    {problem.edgeCases.map((case_, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-[var(--border-color)] mt-0.5">•</span>
                        <span>{case_}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {problem.commonMistakes && problem.commonMistakes.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-[var(--text-muted)] mb-2">COMMON MISTAKES</div>
                  <ul className="text-sm space-y-2 text-[var(--text-secondary)]">
                    {problem.commonMistakes.map((mistake, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-red-500/50 mt-0.5">✗</span>
                        <span>{mistake}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Related Problems */}
          {problem.relatedProblems && problem.relatedProblems.length > 0 && (
            <div className="card p-5">
              <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider mb-4 flex items-center gap-2">
                <Link to="/dsa" className="hover:text-brand-success transition-colors">
                  <LayoutList size={16} />
                </Link>
                Related Problems
              </h3>
              <div className="flex flex-col gap-2">
                {problem.relatedProblems.map(relatedSlug => {
                  const related = getDSAProblem(relatedSlug);
                  if (!related) return null;
                  
                  return (
                    <Link 
                      key={related.slug}
                      to={`/dsa/${related.topicId}/${related.slug}`}
                      className="group flex flex-col p-2.5 rounded-lg hover:bg-[var(--bg-primary)] transition-colors border border-transparent hover:border-[var(--border-color)]"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-[var(--text-primary)] group-hover:text-brand-success transition-colors truncate">
                          {related.title}
                        </span>
                        <span className="scale-90 origin-right"><DifficultyBadge difficulty={related.difficulty} /></span>
                      </div>
                      {related.pattern && (
                        <div className="text-xs text-[var(--text-muted)] truncate">
                          {related.pattern}
                        </div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-16 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row justify-between gap-4">
        {prev ? (
          <Link 
            to={`/dsa/${topic.slug}/${prev.slug}`}
            className="flex flex-col items-start gap-1 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-brand-success transition-colors group flex-1"
          >
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Previous
            </span>
            <span className="font-medium text-[var(--text-primary)] group-hover:text-brand-success transition-colors">{prev.title}</span>
          </Link>
        ) : <div className="flex-1" />}
        
        {next ? (
          <Link 
            to={`/dsa/${topic.slug}/${next.slug}`}
            className="flex flex-col items-end gap-1 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] hover:border-brand-success transition-colors group flex-1 text-right"
          >
            <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider flex items-center gap-1">
              Next <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <span className="font-medium text-[var(--text-primary)] group-hover:text-brand-success transition-colors">{next.title}</span>
          </Link>
        ) : <div className="flex-1" />}
      </div>

    </div>
  );
}
