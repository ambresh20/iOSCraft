import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Circle, AlertTriangle, Lightbulb } from 'lucide-react';
import { getDSAProblem } from '../data/dsaProblems';
import { CodeBlock } from '../components/common/CodeBlock';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { DifficultyBadge } from '../components/common/Badge';
import { useProgress } from '../hooks/useProgress';
import { Helmet } from 'react-helmet-async';

export function DSADetail() {
  const { slug } = useParams<{ slug: string }>();
  const problem = slug ? getDSAProblem(slug) : undefined;
  
  const { isProblemSolved, markProblemSolved, unmarkProblemSolved, recordVisit } = useProgress();
  const [activeApproach, setActiveApproach] = useState(0);

  useEffect(() => {
    if (slug) {
      recordVisit(`/dsa/${slug}`);
    }
  }, [slug, recordVisit]);

  if (!problem) {
    return <Navigate to="/404" replace />;
  }

  const solved = isProblemSolved(problem.slug);

  return (
    <div className="container-content py-8 lg:py-12">
      <Helmet>
        <title>{problem.title} | DSA in Swift | iOSCraft</title>
        <meta name="description" content={problem.description} />
      </Helmet>

      {/* Breadcrumb & Navigation */}
      <nav className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
          <Link to="/dsa" className="hover:text-brand-success transition-colors">DSA</Link>
          <span className="text-[10px]">▶</span>
          <span>{problem.category}</span>
        </div>
        <Link to="/dsa" className="btn-ghost text-xs hidden sm:flex">
          <ArrowLeft size={14} /> Back to Problems
        </Link>
      </nav>

      <div className="grid xl:grid-cols-3 gap-8">
        {/* Left Column: Problem Description */}
        <div className="xl:col-span-1 space-y-6">
          <article className="card p-6 h-full">
            <header className="mb-6 pb-6 border-b border-[var(--border-color)]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <DifficultyBadge difficulty={problem.difficulty} size="md" />
                <BookmarkButton item={{...problem, type: 'dsa', url: `/dsa/${problem.slug}`}} showLabel />
              </div>
              
              <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4 leading-tight">
                {problem.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {problem.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded text-xs text-[var(--text-muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            <div className="prose-ios prose-sm">
              <h3>Problem Statement</h3>
              <p>{problem.problemStatement}</p>

              <h3>Examples</h3>
              <div className="space-y-4">
                {problem.examples.map((ex, i) => (
                  <div key={i} className="bg-[var(--bg-primary)] p-4 rounded-lg border border-[var(--border-color)]">
                    <p className="font-mono text-sm mb-2"><span className="text-[var(--text-muted)] font-sans">Input:</span> {ex.input}</p>
                    <p className="font-mono text-sm"><span className="text-[var(--text-muted)] font-sans">Output:</span> {ex.output}</p>
                    {ex.explanation && (
                      <p className="text-sm mt-3 pt-3 border-t border-[var(--border-color)] text-[var(--text-secondary)]">
                        <span className="font-medium">Explanation:</span> {ex.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <h3>Constraints</h3>
              <ul>
                {problem.constraints.map((c, i) => <li key={i}><code>{c}</code></li>)}
              </ul>
            </div>
          </article>
        </div>

        {/* Right Column: Approaches & Code */}
        <div className="xl:col-span-2 space-y-6">
          {/* Approaches Tabs */}
          <div className="card overflow-hidden flex flex-col h-full">
            <div className="flex overflow-x-auto border-b border-[var(--border-color)] bg-[var(--bg-sidebar)]">
              {problem.approaches.map((approach, index) => (
                <button
                  key={index}
                  onClick={() => setActiveApproach(index)}
                  className={`
                    flex-1 min-w-[120px] px-4 py-3 text-sm font-medium transition-colors whitespace-nowrap
                    ${activeApproach === index
                      ? 'bg-[var(--bg-card)] text-brand-success border-b-2 border-brand-success'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]/50'
                    }
                  `}
                >
                  Approach {index + 1}: {approach.title}
                </button>
              ))}
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">
                  {problem.approaches[activeApproach].title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">
                  {problem.approaches[activeApproach].description}
                </p>
              </div>

              {/* Complexity */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-4 py-2 flex items-center gap-3">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">Time</span>
                  <code className="text-sm text-brand-success font-bold">{problem.approaches[activeApproach].timeComplexity}</code>
                </div>
                <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg px-4 py-2 flex items-center gap-3">
                  <span className="text-xs font-semibold text-[var(--text-muted)] uppercase">Space</span>
                  <code className="text-sm text-brand-purple font-bold">{problem.approaches[activeApproach].spaceComplexity}</code>
                </div>
              </div>

              {/* Code Editor Mockup */}
              <div className="flex-1 min-h-[300px]">
                <CodeBlock
                  code={problem.approaches[activeApproach].code}
                  language="swift"
                  filename={`${problem.slug}.swift`}
                  copyable={true}
                />
                
                {/* Note about browser execution */}
                <div className="flex items-start gap-2 mt-4 p-3 bg-blue-500/10 rounded-lg text-blue-400 text-sm">
                  <Lightbulb size={16} className="shrink-0 mt-0.5" />
                  <p>
                    Native Swift code execution in the browser is currently in development. You can copy this solution to try it in Xcode or an online Swift compiler.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Bar */}
            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-sidebar)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => solved ? unmarkProblemSolved(problem.slug) : markProblemSolved(problem.slug)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                    solved 
                      ? 'bg-brand-success/10 text-brand-success' 
                      : 'bg-brand-success text-dark-bg hover:bg-green-500'
                  }`}
                >
                  {solved ? <CheckCircle2 size={16} /> : <Circle size={16} />}
                  {solved ? 'Solved' : 'Mark as Solved'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      {problem.commonMistakes && problem.commonMistakes.length > 0 && (
        <div className="mt-8 card p-6 border-l-4 border-l-brand-orange">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-brand-orange" size={24} />
            <h3 className="text-lg font-bold text-[var(--text-primary)]">Common Mistakes</h3>
          </div>
          <ul className="space-y-3">
            {problem.commonMistakes.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)] text-sm">
                <span className="text-brand-orange mt-1">•</span>
                <span>{mistake}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
