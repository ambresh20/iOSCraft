import type { SearchResult } from '../types/content';

// ============================================================
// ALL NAVIGATION ITEMS
// ============================================================

export interface NavItem {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
  {
    label: 'Learn',
    href: '/learn',
    children: [
      { label: 'Swift Basics', href: '/learn', description: 'Variables, types, control flow' },
      { label: 'Functions & Closures', href: '/learn', description: 'Functions, closures, higher-order' },
      { label: 'OOP & POP', href: '/learn', description: 'Classes, structs, protocols' },
      { label: 'Memory Management', href: '/learn', description: 'ARC, retain cycles, capture lists' },
      { label: 'Advanced Swift', href: '/learn', description: 'Concurrency, generics, Codable' },
    ],
  },
  {
    label: 'Interview Prep',
    href: '/interview',
    children: [
      { label: 'Swift Questions', href: '/interview', description: 'Core Swift language questions' },
      { label: 'SwiftUI Questions', href: '/interview', description: 'SwiftUI interview topics' },
      { label: 'UIKit Questions', href: '/interview', description: 'UIKit and lifecycle questions' },
      { label: 'Architecture', href: '/interview', description: 'Design patterns and architecture' },
      { label: 'Concurrency', href: '/interview', description: 'async/await, actors, GCD' },
    ],
  },
  { label: 'DSA', href: '/dsa' },
  { label: 'SwiftUI', href: '/swiftui' },
  { label: 'UIKit', href: '/uikit' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Blog', href: '/blog' },
];

export const footerLinks = {
  learn: [
    { label: 'Swift Basics', href: '/learn' },
    { label: 'SwiftUI', href: '/swiftui' },
    { label: 'UIKit', href: '/uikit' },
    { label: 'Architecture', href: '/architecture' },
    { label: 'Projects', href: '/projects' },
  ],
  interview: [
    { label: 'All Questions', href: '/interview' },
    { label: 'Swift', href: '/interview?category=swift' },
    { label: 'SwiftUI', href: '/interview?category=swiftui' },
    { label: 'Concurrency', href: '/interview?category=concurrency' },
    { label: 'Architecture', href: '/interview?category=architecture' },
  ],
  dsa: [
    { label: 'Arrays', href: '/dsa?category=arrays' },
    { label: 'Strings', href: '/dsa?category=strings' },
    { label: 'Linked Lists', href: '/dsa?category=linked-lists' },
    { label: 'Trees', href: '/dsa?category=trees' },
    { label: 'Dynamic Programming', href: '/dsa?category=dynamic-programming' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export type { SearchResult };
