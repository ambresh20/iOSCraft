// ============================================================
// CONTENT TYPES
// ============================================================

export type Difficulty = 'Beginner' | 'Easy' | 'Intermediate' | 'Medium' | 'Advanced' | 'Hard';

export interface ContentItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  difficulty?: Difficulty;
  tags: string[];
  readingTime: number;
  publishedAt?: string;
  updatedAt?: string;
  content: string;
}

export interface Lesson extends ContentItem {
  moduleId: string;
  moduleName: string;
  order: number;
  nextSlug?: string;
  prevSlug?: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
  category: string;
}

export interface InterviewQuestion extends ContentItem {
  shortAnswer: string;
  followUpQuestions: string[];
  interviewTips: string[];
  relatedQuestions: string[];
  nextSlug?: string;
  prevSlug?: string;
}

export interface BlogPost extends ContentItem {
  author: string;
  authorRole?: string;
  featured?: boolean;
  relatedPosts?: string[];
  excerpt: string;
}

export interface Project extends ContentItem {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  architecture: string;
  apis?: string[];
  repositoryUrl?: string;
  features: string[];
}

export interface RoadmapStage {
  id: string;
  stage: number;
  title: string;
  description: string;
  topics: RoadmapTopic[];
  icon: string;
}

export interface RoadmapTopic {
  id: string;
  title: string;
  link?: string;
  completed?: boolean;
}

export type ContentType = 'lesson' | 'interview' | 'dsa' | 'swiftui' | 'uikit' | 'architecture' | 'blog' | 'project';

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  type: ContentType;
  slug: string;
  url: string;
  difficulty?: Difficulty;
  tags: string[];
}
