// ============================================================
// DSA TYPES - Extended for topic-based architecture
// ============================================================

export type DSADifficulty = 'Easy' | 'Medium' | 'Hard';

export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface Approach {
  id: string;
  title: string;
  intuition: string;
  algorithm?: string[];
  code: string;
  timeComplexity: string;
  spaceComplexity: string;
  complexityExplanation?: string;
  limitations?: string[];
}

export interface DSAProblem {
  id: string;
  title: string;
  slug: string;
  topicId: string;           // canonical topic this problem belongs to
  topicIds?: string[];       // additional topics (multi-tag support)
  difficulty: DSADifficulty;
  category: string;          // display category (legacy / same as topic name)
  tags: string[];
  pattern?: string;          // e.g. "Two Pointers", "Sliding Window"
  readingTime: number;
  description: string;
  problemStatement: string;
  inputDescription: string;
  outputDescription: string;
  constraints: string[];
  examples: TestCase[];
  keyObservations?: string[];
  approaches: Approach[];
  edgeCases?: string[];
  commonMistakes: string[];
  relatedProblems: string[];
  sourceUrl?: string;
  completed?: boolean;
  bookmarked?: boolean;
  publishedAt?: string;
}

export interface DSATopic {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  icon: string;
  color: string;           // tailwind color token e.g. 'blue'
  whatYouLearn: string[];
  prerequisites: string[];
  problemIds: string[];    // ordered list of problem IDs in this topic
  swiftNotes?: string;     // relevant Swift APIs or notes
}

export interface DSAFilter {
  difficulty?: DSADifficulty | 'all';
  topicId?: string;
  completed?: boolean;
  search?: string;
}
