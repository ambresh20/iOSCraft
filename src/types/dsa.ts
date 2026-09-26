// ============================================================
// DSA TYPES
// ============================================================

export type DSADifficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface Approach {
  title: string;
  description: string;
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
}

export interface DSAProblem {
  id: string;
  title: string;
  slug: string;
  difficulty: DSADifficulty;
  category: string;
  tags: string[];
  readingTime: number;
  description: string;
  problemStatement: string;
  inputDescription: string;
  outputDescription: string;
  constraints: string[];
  examples: TestCase[];
  approaches: Approach[];
  commonMistakes: string[];
  relatedProblems: string[];
  completed?: boolean;
  bookmarked?: boolean;
  publishedAt?: string;
}

export interface DSACategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  problems: DSAProblem[];
}

export interface DSAFilter {
  difficulty?: DSADifficulty | 'all';
  category?: string;
  completed?: boolean;
  search?: string;
}
