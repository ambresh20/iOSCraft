import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Clock, Calendar, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { getBlogPost } from '../data/blogPosts';
import { CodeBlock } from '../components/common/CodeBlock';
import { BookmarkButton } from '../components/common/BookmarkButton';
import { useProgress } from '../hooks/useProgress';
import { Helmet } from 'react-helmet-async';

export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;
  
  const { recordVisit } = useProgress();

  useEffect(() => {
    if (slug) {
      recordVisit(`/blog/${slug}`);
    }
  }, [slug, recordVisit]);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  const shareUrl = window.location.href;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  return (
    <div className="container-content py-8 lg:py-12 max-w-4xl">
      <Helmet>
        <title>{post.title} | iOSCraft Blog</title>
        <meta name="description" content={post.excerpt} />
        {/* Open Graph for Social Sharing */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
        <Link to="/blog" className="hover:text-brand-orange transition-colors">Blog</Link>
        <span className="text-[10px]">▶</span>
        <span>{post.category}</span>
      </nav>

      <article className="card overflow-hidden mb-12">
        {/* Hero Image (Gradient placeholder) */}
        <div className="h-64 sm:h-80 w-full bg-gradient-to-br from-[var(--bg-sidebar)] to-[var(--bg-primary)] border-b border-[var(--border-color)] relative flex flex-col items-center justify-center p-8 text-center">
          <span className="badge badge-orange mb-4">{post.category}</span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] leading-tight max-w-3xl">
            {post.title}
          </h1>
        </div>

        <div className="p-6 md:p-10">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-10 pb-8 border-b border-[var(--border-color)]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-orange/20 flex items-center justify-center font-bold text-brand-orange text-lg">
                IC
              </div>
              <div>
                <p className="font-semibold text-[var(--text-primary)]">{post.author}</p>
                <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {new Date(post.publishedAt || '').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {post.readingTime} min read
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={handleShare}
                className="btn-ghost p-2"
                aria-label="Share article"
              >
                <Share2 size={18} />
              </button>
              <BookmarkButton item={{...post, type: 'blog', url: `/blog/${post.slug}`}} showLabel />
            </div>
          </div>

          {/* Content */}
          <div className="prose-ios">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }: any) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock
                      code={String(children).replace(/\n$/, '')}
                      language={match[1]}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </div>

        {/* Footer Share */}
        <div className="bg-[var(--bg-sidebar)] border-t border-[var(--border-color)] p-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-medium text-[var(--text-primary)]">Share this article</p>
          <div className="flex items-center gap-2">
            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary p-2">
              <Twitter size={18} />
            </a>
            <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary p-2">
              <Linkedin size={18} />
            </a>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="btn-secondary p-2">
              <Facebook size={18} />
            </a>
          </div>
        </div>
      </article>

      <div className="text-center">
        <Link to="/blog" className="btn-secondary inline-flex items-center gap-2">
          <ArrowLeft size={16} />
          Back to Blog
        </Link>
      </div>
    </div>
  );
}
