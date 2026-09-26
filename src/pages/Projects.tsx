import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutTemplate, ArrowRight, Clock, Star, Code2 } from 'lucide-react';
import { projectCatalog } from '../data/roadmap';
import { DifficultyBadge } from '../components/common/Badge';
import { Helmet } from 'react-helmet-async';

export function Projects() {
  return (
    <div className="container-content py-10 lg:py-16">
      <Helmet>
        <title>Portfolio Projects | iOSCraft</title>
        <meta name="description" content="Build real-world iOS portfolio projects step by step." />
      </Helmet>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          Portfolio Projects
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-6">
          Build real-world applications to showcase your skills. Each project comes with requirements, architecture suggestions, and step-by-step guides.
        </p>
        <div className="inline-flex items-center gap-2 bg-brand-orange/10 text-brand-orange px-4 py-2 rounded-lg text-sm font-medium">
          <Star size={16} /> Premium feature (Coming Soon)
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projectCatalog.map((project) => (
          <div key={project.id} className="card p-6 flex flex-col group relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-brand-orange text-dark-bg text-[10px] font-bold px-3 py-1 rounded-bl-lg z-10">
              COMING SOON
            </div>
            
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-secondary)]">
                <LayoutTemplate size={24} />
              </div>
              <DifficultyBadge difficulty={project.level as any} />
            </div>
            
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:text-brand-orange transition-colors">
              {project.title}
            </h3>
            
            <p className="text-sm text-[var(--text-secondary)] mb-6 flex-1">
              {project.description}
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Skills you'll learn</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded text-xs text-[var(--text-muted)]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">Architecture</h4>
                <span className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                  <Code2 size={14} /> {project.architecture}
                </span>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                <Clock size={14} /> {project.readingTime}h est. time
              </div>
              <button disabled className="btn-secondary opacity-50 cursor-not-allowed text-sm">
                View Project <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
