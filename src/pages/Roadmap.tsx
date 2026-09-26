import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { roadmapStages } from '../data/roadmap';
import { useProgress } from '../hooks/useProgress';
import { Helmet } from 'react-helmet-async';

export function Roadmap() {
  const { isRoadmapTopicCompleted, toggleRoadmapTopic } = useProgress();

  // Calculate total progress
  const totalTopics = roadmapStages.reduce((acc, stage) => acc + stage.topics.length, 0);
  const completedTopics = roadmapStages.reduce((acc, stage) => {
    return acc + stage.topics.filter(t => isRoadmapTopicCompleted(t.id)).length;
  }, 0);
  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

  return (
    <div className="container-content py-10 lg:py-16">
      <Helmet>
        <title>iOS Developer Roadmap | iOSCraft</title>
        <meta name="description" content="A complete step-by-step roadmap to becoming a professional iOS developer." />
      </Helmet>

      {/* Header */}
      <div className="mb-12 max-w-3xl">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          iOS Developer Roadmap
        </h1>
        <p className="text-lg text-[var(--text-secondary)] mb-8">
          A step-by-step guide to becoming a professional iOS developer. Track your progress as you learn Swift, master UI frameworks, and prepare for interviews.
        </p>

        {/* Progress Overview */}
        <div className="card p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">Roadmap Progress</h2>
            <span className="text-sm font-bold text-brand-orange">{progressPercent}%</span>
          </div>
          <div className="progress-bar mb-3 bg-[var(--bg-primary)]">
            <div 
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
            />
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            You have completed {completedTopics} of {totalTopics} topics. Data is saved locally in your browser.
          </p>
        </div>
      </div>

      {/* Roadmap Timeline */}
      <div className="relative max-w-4xl">
        {/* Vertical Line */}
        <div className="absolute left-6 sm:left-[3.25rem] top-8 bottom-8 w-px bg-[var(--border-color)]" />

        <div className="space-y-12 relative">
          {roadmapStages.map((stage, index) => {
            const stageCompletedTopics = stage.topics.filter(t => isRoadmapTopicCompleted(t.id)).length;
            const isStageComplete = stageCompletedTopics === stage.topics.length;

            return (
              <div key={stage.id} className="relative pl-16 sm:pl-28">
                {/* Number / Icon Bubble */}
                <div className={`absolute left-0 sm:left-6 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-md z-10 border-4 border-[var(--bg-primary)] ${
                  isStageComplete 
                    ? 'bg-brand-success text-dark-bg'
                    : stageCompletedTopics > 0
                      ? 'bg-brand-orange text-dark-bg'
                      : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)]'
                }`}>
                  {isStageComplete ? <CheckCircle2 size={24} /> : stage.icon}
                </div>

                <div className="card p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-[var(--text-primary)] mb-1">
                        <span className="text-[var(--text-muted)] mr-2 font-mono">
                          {String(stage.stage).padStart(2, '0')}.
                        </span>
                        {stage.title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {stage.description}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isStageComplete ? 'bg-brand-success/10 text-brand-success' : 'bg-[var(--bg-primary)] text-[var(--text-muted)]'
                      }`}>
                        {stageCompletedTopics} / {stage.topics.length}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] overflow-hidden mt-6">
                    <ul className="divide-y divide-[var(--border-color)]">
                      {stage.topics.map((topic) => {
                        const isCompleted = isRoadmapTopicCompleted(topic.id);
                        return (
                          <li key={topic.id} className="flex items-center gap-3 p-3 sm:p-4 hover:bg-[var(--bg-sidebar)] transition-colors group">
                            <button
                              onClick={() => toggleRoadmapTopic(topic.id)}
                              className={`shrink-0 transition-colors ${
                                isCompleted ? 'text-brand-success' : 'text-[var(--border-color)] group-hover:text-[var(--text-muted)]'
                              }`}
                              aria-label={isCompleted ? `Mark ${topic.title} as incomplete` : `Mark ${topic.title} as complete`}
                            >
                              {isCompleted ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                            </button>
                            
                            <span className={`flex-1 text-sm sm:text-base font-medium transition-colors ${
                              isCompleted ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text-primary)]'
                            }`}>
                              {topic.title}
                            </span>
                            
                            {topic.link && (
                              <Link 
                                to={topic.link}
                                className="shrink-0 btn-ghost text-xs hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                Learn <ArrowRight size={14} />
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
