import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ArrowRight, Search, Star } from 'lucide-react';
import { blogPosts, blogCategories, getFeaturedPosts } from '../data/blogPosts';
import { Helmet } from 'react-helmet-async';

export function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPosts = getFeaturedPosts();
  
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container-content py-10 lg:py-16">
      <Helmet>
        <title>iOS Development Blog | iOSCraft</title>
        <meta name="description" content="Read the latest tutorials, tips, and guides on Swift, SwiftUI, and iOS development." />
      </Helmet>

      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
          iOSCraft Blog
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl">
          Deep dives, tutorials, and tips for iOS developers. Learn modern Swift, master architectures, and level up your career.
        </p>
      </div>

      {/* Featured Posts (Only show when not searching/filtering) */}
      {activeCategory === 'All' && !searchQuery && featuredPosts.length > 0 && (
        <div className="mb-16">
          <h2 className="text-sm font-bold text-[var(--text-muted)] uppercase tracking-wider mb-6 flex items-center gap-2">
            <Star size={16} className="text-brand-orange" />
            Featured Articles
          </h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {featuredPosts.slice(0, 2).map(post => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="card-hover group flex flex-col h-full overflow-hidden">
                <div className="h-48 bg-[var(--bg-primary)] border-b border-[var(--border-color)] relative overflow-hidden flex items-center justify-center">
                  {/* Decorative background instead of real image for now */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/20 to-brand-purple/20 group-hover:scale-105 transition-transform duration-700" />
                  <div className="relative z-10 font-bold text-3xl text-brand-orange mix-blend-overlay opacity-60">iOSCraft</div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="badge badge-orange">{post.category}</span>
                    <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                      <Clock size={12} /> {post.readingTime}m read
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-brand-orange/20 flex items-center justify-center text-[10px] font-bold text-brand-orange">
                        IC
                      </div>
                      <span className="text-xs font-medium text-[var(--text-primary)]">{post.author}</span>
                    </div>
                    <span className="text-xs font-medium text-brand-orange flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">All Articles</h2>
          <div className="relative w-full sm:w-64">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 gap-2">
          {blogCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-brand-orange hover:text-brand-orange'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Article Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="card-hover p-6 group flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="badge badge-gray">{post.category}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-brand-orange transition-colors mb-3 leading-snug line-clamp-2">
                {post.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] line-clamp-3 mb-6 flex-1 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  {new Date(post.publishedAt || '').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  {post.readingTime}m
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-16 text-center">
            <Search size={48} className="mx-auto text-[var(--border-color)] mb-4" />
            <h3 className="text-lg font-medium text-[var(--text-primary)] mb-2">No articles found</h3>
            <p className="text-[var(--text-muted)]">
              Try adjusting your search or category filters.
            </p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="mt-6 btn-ghost"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
