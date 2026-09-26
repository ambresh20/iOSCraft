import { useLocalStorage } from './useLocalStorage';

// ============================================================
// PROGRESS TYPES
// ============================================================

interface ProgressState {
  completedLessons: string[];      // lesson slugs
  solvedProblems: string[];        // DSA problem slugs
  completedRoadmapTopics: string[]; // topic ids
  lastVisited: string | null;      // last visited URL
  readingHistory: string[];        // recently read slugs
}

const PROGRESS_KEY = 'ioscraft_progress';

const defaultProgress: ProgressState = {
  completedLessons: [],
  solvedProblems: [],
  completedRoadmapTopics: [],
  lastVisited: null,
  readingHistory: [],
};

// ============================================================
// useProgress HOOK
// ============================================================

export function useProgress() {
  const [progress, setProgress] = useLocalStorage<ProgressState>(PROGRESS_KEY, defaultProgress);

  // Lessons
  const isLessonCompleted = (slug: string) => progress.completedLessons.includes(slug);
  const markLessonCompleted = (slug: string) => {
    if (isLessonCompleted(slug)) return;
    setProgress(p => ({ ...p, completedLessons: [...p.completedLessons, slug] }));
  };
  const unmarkLessonCompleted = (slug: string) => {
    setProgress(p => ({ ...p, completedLessons: p.completedLessons.filter(s => s !== slug) }));
  };

  // DSA Problems
  const isProblemSolved = (slug: string) => progress.solvedProblems.includes(slug);
  const markProblemSolved = (slug: string) => {
    if (isProblemSolved(slug)) return;
    setProgress(p => ({ ...p, solvedProblems: [...p.solvedProblems, slug] }));
  };
  const unmarkProblemSolved = (slug: string) => {
    setProgress(p => ({ ...p, solvedProblems: p.solvedProblems.filter(s => s !== slug) }));
  };

  // Roadmap
  const isRoadmapTopicCompleted = (id: string) => progress.completedRoadmapTopics.includes(id);
  const toggleRoadmapTopic = (id: string) => {
    setProgress(p => ({
      ...p,
      completedRoadmapTopics: p.completedRoadmapTopics.includes(id)
        ? p.completedRoadmapTopics.filter(t => t !== id)
        : [...p.completedRoadmapTopics, id],
    }));
  };

  // Reading history (last 10)
  const recordVisit = (slug: string) => {
    setProgress(p => ({
      ...p,
      lastVisited: slug,
      readingHistory: [slug, ...p.readingHistory.filter(s => s !== slug)].slice(0, 10),
    }));
  };

  // Stats
  const getTotalProgress = (total: number): number => {
    if (total === 0) return 0;
    return Math.round((progress.completedLessons.length / total) * 100);
  };

  // Reset
  const clearProgress = () => {
    setProgress(defaultProgress);
  };

  return {
    progress,
    // Lessons
    isLessonCompleted,
    markLessonCompleted,
    unmarkLessonCompleted,
    completedLessonsCount: progress.completedLessons.length,
    // DSA
    isProblemSolved,
    markProblemSolved,
    unmarkProblemSolved,
    solvedProblemsCount: progress.solvedProblems.length,
    // Roadmap
    isRoadmapTopicCompleted,
    toggleRoadmapTopic,
    completedRoadmapTopicsCount: progress.completedRoadmapTopics.length,
    // History
    recordVisit,
    lastVisited: progress.lastVisited,
    readingHistory: progress.readingHistory,
    // Utils
    getTotalProgress,
    clearProgress,
  };
}
