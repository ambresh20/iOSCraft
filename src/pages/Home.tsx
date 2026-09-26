import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageSquare, Code2, Layers, Cpu, GitBranch, Clock, Star, CheckCircle2, Zap, Target, TrendingUp } from 'lucide-react';
import { DifficultyBadge } from '../components/common/Badge';
import { CodeBlock } from '../components/common/CodeBlock';
import { interviewQuestions } from '../data/interviewQuestions';
import { dsaProblems } from '../data/dsaProblems';
import { blogPosts } from '../data/blogPosts';

// ============================================================
// HERO CODE EXAMPLE
// ============================================================
const heroCode = `import SwiftUI

struct ContentView: View {
    @State private var isLearning = true
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Hello, iOSCraft! 👋")
                .font(.largeTitle)
                .fontWeight(.bold)
            
            Text(isLearning ? "Keep learning!" : "Great job!")
                .foregroundStyle(.orange)
            
            Button("Toggle") {
                isLearning.toggle()
            }
            .buttonStyle(.borderedProminent)
        }
        .padding()
    }
}`;

// ============================================================
// CATEGORY CARDS
// ============================================================
const categories = [
  {
    icon: <BookOpen size={22} className="text-blue-400" />,
    iconBg: 'bg-blue-500/10',
    title: 'Swift Fundamentals',
    description: 'Learn Swift syntax, functions, closures, optionals, protocols, and advanced language concepts.',
    link: '/learn',
    tag: '9 Modules',
  },
  {
    icon: <MessageSquare size={22} className="text-brand-purple" />,
    iconBg: 'bg-brand-purple/10',
    title: 'iOS Interview Prep',
    description: 'Practice frequently asked Swift, iOS, UIKit, and SwiftUI interview questions.',
    link: '/interview',
    tag: '100+ Questions',
  },
  {
    icon: <Code2 size={22} className="text-brand-success" />,
    iconBg: 'bg-brand-success/10',
    title: 'DSA in Swift',
    description: 'Solve coding problems with multiple approaches, Swift solutions, and complexity analysis.',
    link: '/dsa',
    tag: '35 Problems',
  },
  {
    icon: <Layers size={22} className="text-brand-orange" />,
    iconBg: 'bg-brand-orange/10',
    title: 'SwiftUI',
    description: 'Learn declarative UI, state management, navigation, and reusable components.',
    link: '/swiftui',
    tag: '6 Modules',
  },
  {
    icon: <Cpu size={22} className="text-pink-400" />,
    iconBg: 'bg-pink-500/10',
    title: 'UIKit',
    description: 'Master UIKit fundamentals, Auto Layout, view controllers, and application lifecycle.',
    link: '/uikit',
    tag: '15 Topics',
  },
  {
    icon: <GitBranch size={22} className="text-cyan-400" />,
    iconBg: 'bg-cyan-500/10',
    title: 'Architecture',
    description: 'Understand MVVM, MVC, Clean Architecture, dependency injection, and SOLID principles.',
    link: '/architecture',
    tag: '12 Patterns',
  },
];

// ============================================================
// ROADMAP STEPS
// ============================================================
const roadmapSteps = [
  { step: 1, title: 'Swift Fundamentals', link: '/learn' },
  { step: 2, title: 'OOP & Protocol-Oriented Programming', link: '/learn' },
  { step: 3, title: 'Data Structures & Algorithms', link: '/dsa' },
  { step: 4, title: 'UIKit & SwiftUI', link: '/swiftui' },
  { step: 5, title: 'Networking & Persistence', link: '/uikit' },
  { step: 6, title: 'Architecture & Design Patterns', link: '/architecture' },
  { step: 7, title: 'Testing, Debugging & Performance', link: '/architecture' },
  { step: 8, title: 'Interview Preparation & Projects', link: '/interview' },
];

// ============================================================
// WHY iOSCRAFT FEATURES
// ============================================================
const features = [
  {
    icon: <TrendingUp size={20} className="text-brand-orange" />,
    title: 'Structured Learning',
    description: 'Follow organized paths from fundamentals to advanced concepts, with a clear iOS developer roadmap.',
  },
  {
    icon: <Target size={20} className="text-brand-purple" />,
    title: 'Interview-Focused',
    description: 'Understand concepts through practical interview questions with detailed, code-backed answers.',
  },
  {
    icon: <Zap size={20} className="text-brand-success" />,
    title: 'Swift Solutions',
    description: 'Learn DSA using readable, idiomatic Swift code with time and space complexity analysis.',
  },
  {
    icon: <CheckCircle2 size={20} className="text-blue-400" />,
    title: 'Practical Development',
    description: 'Build a solid foundation in modern iOS app development with real-world SwiftUI and UIKit examples.',
  },
];

// ============================================================
// HOME PAGE
// ============================================================
export function Home() {
  const featuredQuestions = interviewQuestions.slice(0, 6);
  const featuredProblems = dsaProblems.slice(0, 6);
  const latestPosts = blogPosts.slice(0, 6);

  return (
    <div className="overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="section bg-[var(--bg-primary)] relative overflow-hidden" aria-labelledby="hero-heading">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-purple/5 rounded-full blur-[100px]" />
        </div>

        <div className="container-content relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <p className="section-eyebrow">The iOS Developer Learning Platform</p>
              <h1
                id="hero-heading"
                className="text-5xl lg:text-6xl font-extrabold text-[var(--text-primary)] leading-[1.1] mb-6"
              >
                Build Skills.
                <br />
                Master{' '}
                <span className="text-gradient">Swift.</span>
                <br />
                Crack iOS Interviews.
              </h1>
              <p className="text-lg text-[var(--text-secondary)] mb-8 max-w-lg leading-relaxed">
                Learn Swift, solve DSA problems, master SwiftUI and UIKit, and prepare for real-world iOS developer interviews with structured tutorials and practical coding examples.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/learn" className="btn-primary text-base px-6 py-3">
                  Start Learning
                  <ArrowRight size={18} />
                </Link>
                <Link to="/interview" className="btn-secondary text-base px-6 py-3">
                  Interview Questions
                </Link>
              </div>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-[var(--border-color)]">
                {[
                  { value: '9+', label: 'Swift Modules' },
                  { value: '35+', label: 'DSA Problems' },
                  { value: '100+', label: 'Interview Q&As' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-brand-orange">{stat.value}</p>
                    <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Code Editor */}
            <div className="lg:block hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-brand-orange/10 rounded-2xl blur-2xl" />
                <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] shadow-2xl">
                  <CodeBlock
                    code={heroCode}
                    language="swift"
                    filename="ContentView.swift"
                    showLineNumbers={true}
                    copyable={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="section bg-[var(--bg-secondary)]" aria-labelledby="categories-heading">
        <div className="container-content">
          <div className="text-center mb-12">
            <h2 id="categories-heading" className="section-title">
              Everything You Need to Grow as an iOS Developer
            </h2>
            <p className="section-description mx-auto">
              Structured content across all major iOS development topics — from fundamentals to advanced patterns.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat) => (
              <Link
                key={cat.link}
                to={cat.link}
                className="card-hover p-6 group block"
                aria-label={`${cat.title} — ${cat.description}`}
              >
                <div className={`w-11 h-11 ${cat.iconBg} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                  {cat.icon}
                </div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-base font-semibold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors">
                    {cat.title}
                  </h3>
                  <span className="badge badge-orange shrink-0 mt-0.5">{cat.tag}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{cat.description}</p>
                <div className="flex items-center gap-1 mt-4 text-xs text-brand-orange font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROADMAP ===== */}
      <section className="section" aria-labelledby="roadmap-heading">
        <div className="container-content">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="section-eyebrow">Structured Path</p>
              <h2 id="roadmap-heading" className="section-title">
                iOS Developer Learning Roadmap
              </h2>
              <p className="section-description mb-6">
                Follow a proven step-by-step path from programming fundamentals to landing your first iOS developer job.
              </p>
              <Link to="/roadmap" className="btn-primary">
                View Full Roadmap
                <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-3">
              {roadmapSteps.map((step, index) => (
                <Link
                  key={step.step}
                  to={step.link}
                  className="flex items-center gap-4 p-4 card-hover group"
                >
                  <div className="w-9 h-9 rounded-full bg-brand-orange/10 border border-brand-orange/30 flex items-center justify-center shrink-0 text-sm font-bold text-brand-orange group-hover:bg-brand-orange group-hover:text-dark-bg transition-all">
                    {step.step}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors flex-1">
                    {step.title}
                  </span>
                  {index < roadmapSteps.length - 1 && (
                    <ArrowRight size={14} className="text-[var(--text-muted)] group-hover:text-brand-orange transition-colors" />
                  )}
                  {index === roadmapSteps.length - 1 && (
                    <Star size={14} className="text-brand-orange" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERVIEW QUESTIONS ===== */}
      <section className="section bg-[var(--bg-secondary)]" aria-labelledby="interview-heading">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow">Interview Preparation</p>
              <h2 id="interview-heading" className="section-title mb-2">
                Popular Interview Questions
              </h2>
              <p className="text-[var(--text-muted)] text-sm">Detailed answers for the most asked iOS interview questions</p>
            </div>
            <Link to="/interview" className="btn-secondary hidden sm:flex items-center gap-1">
              All Questions <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredQuestions.map((q, index) => (
              <Link
                key={q.id}
                to={`/interview/${q.slug}`}
                className="card-hover p-5 group block"
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <span className="text-xs font-mono text-[var(--text-muted)]">#{String(index + 1).padStart(2, '0')}</span>
                  <DifficultyBadge difficulty={q.difficulty!} />
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors mb-2 leading-tight line-clamp-2">
                  {q.title}
                </h3>
                <div className="flex items-center justify-between mt-4">
                  <span className="badge badge-gray">{q.category}</span>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock size={11} />
                    {q.readingTime}m
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link to="/interview" className="btn-secondary w-full justify-center">
              View All Questions <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== DSA PROBLEMS ===== */}
      <section className="section" aria-labelledby="dsa-heading">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow">Coding Challenges</p>
              <h2 id="dsa-heading" className="section-title mb-2">
                DSA Problems in Swift
              </h2>
              <p className="text-[var(--text-muted)] text-sm">Solve classic problems with idiomatic Swift solutions and complexity analysis</p>
            </div>
            <Link to="/dsa" className="btn-secondary hidden sm:flex items-center gap-1">
              All Problems <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/dsa/${problem.slug}`}
                className="card-hover p-5 group block"
              >
                <div className="flex items-center justify-between mb-3">
                  <DifficultyBadge difficulty={problem.difficulty} />
                  <span className="badge badge-gray text-[10px]">{problem.category}</span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors mb-3">
                  {problem.title}
                </h3>
                <div className="flex flex-wrap gap-1 mb-3">
                  {problem.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--border-color)] text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs font-medium text-brand-orange group-hover:gap-2 transition-all">
                  Solve Problem <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 sm:hidden">
            <Link to="/dsa" className="btn-secondary w-full justify-center">
              View All Problems <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== WHY iOSCRAFT ===== */}
      <section className="section bg-[var(--bg-secondary)]" aria-labelledby="features-heading">
        <div className="container-content">
          <div className="text-center mb-12">
            <p className="section-eyebrow">Why iOSCraft?</p>
            <h2 id="features-heading" className="section-title">
              Built for Serious iOS Developers
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card p-6">
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== LATEST BLOG ===== */}
      <section className="section" aria-labelledby="blog-heading">
        <div className="container-content">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-eyebrow">Latest Content</p>
              <h2 id="blog-heading" className="section-title mb-2">
                Latest Tutorials & Guides
              </h2>
            </div>
            <Link to="/blog" className="btn-secondary hidden sm:flex items-center gap-1">
              All Articles <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="card-hover p-5 group flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="badge badge-orange">{post.category}</span>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <Clock size={11} />
                    {post.readingTime}m read
                  </div>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors leading-tight mb-2 flex-1 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-1 mt-4 text-xs text-brand-orange font-medium">
                  Read article <ArrowRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="section bg-[var(--bg-secondary)]" aria-labelledby="newsletter-heading">
        <div className="container-content max-w-2xl text-center">
          <p className="section-eyebrow">Stay Updated</p>
          <h2 id="newsletter-heading" className="section-title">
            Get iOS Tips in Your Inbox
          </h2>
          <p className="text-[var(--text-muted)] mb-8">
            Swift tips, new tutorials, and interview questions — when they're published.
            No spam, unsubscribe anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="input-field flex-1"
              aria-label="Email address for newsletter"
            />
            <button
              disabled
              className="btn-primary opacity-75 cursor-not-allowed"
              aria-label="Newsletter signup coming soon"
              title="Newsletter signup coming soon"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-3">
            Newsletter signup is coming soon — backend not yet connected.
          </p>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section" aria-label="Call to action">
        <div className="container-content text-center">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Master iOS Development?
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
            Start with Swift fundamentals, practice DSA problems, and prepare for interviews — all in one place.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/learn" className="btn-primary text-base px-7 py-3">
              Start Learning for Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/roadmap" className="btn-secondary text-base px-7 py-3">
              View Roadmap
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
