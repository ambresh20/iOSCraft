import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';
import { swiftModules } from '../data/swiftLessons';
import { useProgress } from '../hooks/useProgress';

export function Learn() {
  const { isLessonCompleted, getTotalProgress } = useProgress();
  
  // Calculate total lessons and completed count for progress
  const totalLessons = swiftModules.reduce((acc, mod) => acc + mod.lessons.length, 0);
  const progressPercent = getTotalProgress(totalLessons);

  return (
    <div className="container-content py-10 lg:py-16">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Learn Swift Programming
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-8">
          A structured Swift curriculum designed for aspiring and professional iOS developers.
          From basic syntax to advanced concepts like concurrency.
        </p>

        {/* Progress Overview */}
        <div className="card p-6 max-w-xl">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Your Progress</h2>
            <span className="text-xs font-bold text-brand-orange">{progressPercent}%</span>
          </div>
          <div className="progress-bar mb-3 bg-[var(--border-color)]">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            You have completed {progressPercent > 0 ? Math.round((progressPercent / 100) * totalLessons) : 0} of {totalLessons} lessons.
          </p>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-12">
        {swiftModules.map((module) => (
          <section key={module.id} aria-labelledby={`module-${module.id}`}>
            <div className="mb-6">
              <h2 id={`module-${module.id}`} className="text-2xl font-bold text-[var(--text-primary)] mb-2 flex items-center gap-2">
                <span className="text-brand-orange text-lg">Module {module.order}</span>
                <span className="text-[var(--text-muted)] hidden sm:inline">•</span>
                {module.title}
              </h2>
              <p className="text-[var(--text-secondary)]">
                {module.description}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {module.lessons.map((lesson) => {
                const isCompleted = isLessonCompleted(lesson.slug);
                return (
                  <Link
                    key={lesson.id}
                    to={`/learn/swift/${lesson.slug}`}
                    className="card-hover p-5 group flex flex-col h-full"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-orange/10 flex items-center justify-center text-brand-orange">
                        <BookOpen size={18} />
                      </div>
                      {isCompleted && (
                        <CheckCircle size={18} className="text-brand-success" />
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-4 flex-1">
                      {lesson.description}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-color)]">
                      <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                        <Clock size={14} />
                        {lesson.readingTime} min
                      </div>
                      <span className="text-xs font-medium text-brand-orange">
                        {isCompleted ? 'Review' : 'Start'}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
