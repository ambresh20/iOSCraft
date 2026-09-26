import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { getLessonBySlug, swiftModules } from '../data/swiftLessons';
import { LearningLayout } from '../components/layout/LearningLayout';
import { CodeBlock } from '../components/common/CodeBlock';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { DifficultyBadge } from '../components/common/Badge';
import { useProgress } from '../hooks/useProgress';
import { Helmet } from 'react-helmet-async';

export function LessonDetail() {
  const { slug } = useParams<{ slug: string }>();
  const lesson = slug ? getLessonBySlug(slug) : undefined;
  
  const { isLessonCompleted, markLessonCompleted, unmarkLessonCompleted, recordVisit } = useProgress();

  useEffect(() => {
    if (slug) {
      recordVisit(`/learn/swift/${slug}`);
    }
  }, [slug, recordVisit]);

  if (!lesson) {
    return <Navigate to="/404" replace />;
  }

  const completed = isLessonCompleted(lesson.slug);

  const breadcrumbs = [
    { label: 'Learn', href: '/learn' },
    { label: lesson.moduleName },
    { label: lesson.title },
  ];

  return (
    <LearningLayout
      modules={swiftModules}
      currentLesson={lesson}
      breadcrumbs={breadcrumbs}
      tocContent={lesson.content}
    >
      <Helmet>
        <title>{lesson.title} | iOSCraft</title>
        <meta name="description" content={lesson.description} />
      </Helmet>

      {/* Header */}
      <header className="mb-8 pb-8 border-b border-[var(--border-color)]">
        <div className="flex items-center justify-between gap-4 mb-4">
          <DifficultyBadge difficulty={lesson.difficulty!} />
          <BookmarkButton item={{...lesson, type: 'lesson', url: `/learn/swift/${lesson.slug}`}} showLabel />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">
          {lesson.title}
        </h1>
        
        <p className="text-lg text-[var(--text-secondary)] mb-6">
          {lesson.description}
        </p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)]">
          <span>{lesson.readingTime} min read</span>
          <span>•</span>
          <button
            onClick={() => completed ? unmarkLessonCompleted(lesson.slug) : markLessonCompleted(lesson.slug)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors ${
              completed 
                ? 'bg-brand-success/10 text-brand-success' 
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-brand-orange hover:text-brand-orange'
            }`}
          >
            {completed ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            {completed ? 'Completed' : 'Mark as complete'}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="prose-ios mb-16">
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
          {lesson.content}
        </ReactMarkdown>
      </div>

      {/* Navigation Footer */}
      <footer className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
        {lesson.prevSlug ? (
          <Link
            to={`/learn/swift/${lesson.prevSlug}`}
            className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 px-6 py-3 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-brand-orange hover:border-brand-orange transition-colors"
          >
            <ArrowLeft size={18} />
            Previous Lesson
          </Link>
        ) : (
          <div /> // Empty div to keep alignment
        )}
        
        <button
          onClick={() => {
            markLessonCompleted(lesson.slug);
            if (lesson.nextSlug) {
              window.location.href = `/learn/swift/${lesson.nextSlug}`;
            }
          }}
          className="w-full sm:w-auto btn-primary justify-center"
        >
          {lesson.nextSlug ? (
            <>
              Next Lesson
              <ArrowRight size={18} />
            </>
          ) : (
            'Complete Module'
          )}
        </button>
      </footer>
    </LearningLayout>
  );
}
