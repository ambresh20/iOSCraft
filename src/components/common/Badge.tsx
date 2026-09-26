import React from 'react';
import type { Difficulty } from '../../types/content';
import type { DSADifficulty } from '../../types/dsa';

interface DifficultyBadgeProps {
  difficulty: Difficulty | DSADifficulty;
  size?: 'sm' | 'md';
}

export function DifficultyBadge({ difficulty, size = 'sm' }: DifficultyBadgeProps) {
  const classMap: Record<string, string> = {
    Easy: 'difficulty-easy',
    Medium: 'difficulty-medium',
    Hard: 'difficulty-hard',
    Beginner: 'difficulty-beginner',
    Intermediate: 'difficulty-intermediate',
    Advanced: 'difficulty-advanced',
  };

  const className = classMap[difficulty] || 'badge-gray';
  const sizeClass = size === 'md' ? 'text-sm px-3 py-1' : '';

  return (
    <span className={`${className} ${sizeClass}`}>
      {difficulty}
    </span>
  );
}

interface CategoryBadgeProps {
  category: string;
}

export function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <span className="badge badge-gray">
      {category}
    </span>
  );
}

interface TagBadgeProps {
  tag: string;
}

export function TagBadge({ tag }: TagBadgeProps) {
  return (
    <span className="badge bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">
      #{tag}
    </span>
  );
}
