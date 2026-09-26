import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, Lightbulb, HelpCircle, List } from 'lucide-react';
import { getInterviewQuestion } from '../data/interviewQuestions';
import { CodeBlock } from '../components/common/CodeBlock';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { DifficultyBadge, TagBadge } from '../components/common/Badge';
import { useProgress } from '../hooks/useProgress';
import { Helmet } from 'react-helmet-async';

export function InterviewDetail() {
  const { slug } = useParams<{ slug: string }>();
  const question = slug ? getInterviewQuestion(slug) : undefined;
  
  const { recordVisit } = useProgress();

  useEffect(() => {
    if (slug) {
      recordVisit(`/interview/${slug}`);
    }
  }, [slug, recordVisit]);

  if (!question) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="container-content py-8 lg:py-12 max-w-4xl">
      <Helmet>
        <title>{question.title} | iOS Interview Prep</title>
        <meta name="description" content={question.description} />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
        <Link to="/interview" className="hover:text-brand-orange transition-colors">Interview Prep</Link>
        <span className="text-[10px]">▶</span>
        <span>{question.category}</span>
      </nav>

      <article className="card p-6 md:p-10 mb-8">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-[var(--border-color)]">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <DifficultyBadge difficulty={question.difficulty!} size="md" />
              <span className="badge badge-gray px-3 py-1 text-sm">{question.category}</span>
            </div>
            <BookmarkButton item={{...question, type: 'interview', url: `/interview/${question.slug}`}} showLabel />
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            {question.title}
          </h1>

          <div className="bg-[var(--bg-primary)] border-l-4 border-brand-orange p-5 rounded-r-lg">
            <h3 className="text-sm font-bold text-brand-orange uppercase tracking-wider mb-2">Short Answer (TL;DR)</h3>
            <p className="text-[var(--text-primary)] font-medium leading-relaxed">
              {question.shortAnswer}
            </p>
          </div>
        </header>

        {/* Detailed Explanation */}
        <div className="prose-ios">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <CodeBlock
                    code={String(children).replace(/\n$/, '')}
                    language={match[1]}
                  />
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {question.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Extras Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {/* Interview Tips */}
        {question.interviewTips && question.interviewTips.length > 0 && (
          <div className="card p-6 border-l-4 border-l-brand-success">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="text-brand-success" size={24} />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Interview Tips</h3>
            </div>
            <ul className="space-y-3">
              {question.interviewTips.map((tip, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)] text-sm">
                  <span className="text-brand-success mt-1">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Follow-up Questions */}
        {question.followUpQuestions && question.followUpQuestions.length > 0 && (
          <div className="card p-6 border-l-4 border-l-brand-purple">
            <div className="flex items-center gap-2 mb-4">
              <HelpCircle className="text-brand-purple" size={24} />
              <h3 className="text-lg font-bold text-[var(--text-primary)]">Expect Follow-ups</h3>
            </div>
            <ul className="space-y-3">
              {question.followUpQuestions.map((q, i) => (
                <li key={i} className="flex items-start gap-2 text-[var(--text-secondary)] text-sm">
                  <span className="text-brand-purple mt-1">•</span>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-[var(--border-color)]">
        {question.prevSlug ? (
          <Link
            to={`/interview/${question.prevSlug}`}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-brand-orange hover:border-brand-orange transition-colors"
          >
            <ArrowLeft size={18} />
            Previous Question
          </Link>
        ) : (
          <div />
        )}
        
        {question.nextSlug && (
          <Link
            to={`/interview/${question.nextSlug}`}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-2 px-6 py-3 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium hover:border-brand-orange hover:text-brand-orange transition-colors shadow-sm"
          >
            Next Question
            <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}
