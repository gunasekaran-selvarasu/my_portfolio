import { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { marked } from 'marked';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Linkedin,
  Twitter,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ArrowRight,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getPostBySlug, getAllPosts } from '../utils/blog';

// Configure marked renderer for custom headers and code styling
const renderer = new marked.Renderer();

renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const slug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  return `<h${depth} id="${slug}" class="scroll-mt-24">${text}</h${depth}>`;
};

marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
});

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);

  const post = useMemo(() => (slug ? getPostBySlug(slug) : undefined), [slug]);
  const allPosts = useMemo(() => getAllPosts(), []);

  // Adjacent posts
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Convert markdown body to HTML
  const htmlContent = useMemo(() => {
    if (!post) return '';
    return marked.parse(post.content) as string;
  }, [post]);

  // Extract table of contents (H2 headings)
  const tableOfContents = useMemo(() => {
    if (!post) return [];
    const lines = post.content.split('\n');
    const headings: { title: string; id: string }[] = [];

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        const title = line.replace('## ', '').trim();
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-');
        headings.push({ title, id });
      }
    });

    return headings;
  }, [post]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Update document title for client-side navigation
  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Gunasekaran Selvarasu`;
    }
  }, [post]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(
        post?.title || ''
      )}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
        <Header activeSection="blog" />
        <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6 text-center">
          <div className="max-w-md space-y-4">
            <BookOpen className="w-16 h-16 text-zinc-600 mx-auto" aria-hidden="true" />
            <h1 className="text-3xl font-extrabold text-white">Article Not Found</h1>
            <p className="text-zinc-400 text-sm">
              The article you are looking for doesn't exist or has been moved.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500 text-white font-medium text-sm hover:bg-indigo-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header activeSection="blog" />

      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-6">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-8" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
            <Link to="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
            <span className="text-indigo-400 font-medium truncate max-w-[200px] sm:max-w-xs">
              {post.title}
            </span>
          </nav>

          {/* Article Header */}
          <header className="space-y-6 pb-8 border-b border-zinc-800/80">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                {post.category}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                {post.publishedAt}
              </span>
              <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              {post.description}
            </p>

            {/* Author info & Social Share Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  GS
                </div>
                <div>
                  <div className="text-sm font-bold text-white flex items-center gap-1.5">
                    Gunasekaran Selvarasu
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  </div>
                  <div className="text-xs text-zinc-400">Senior Fullstack Developer &amp; AWS Certified</div>
                </div>
              </div>

              {/* Share buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={shareLinkedIn}
                  aria-label="Share on LinkedIn"
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
                <button
                  onClick={shareTwitter}
                  aria-label="Share on Twitter"
                  className="p-2 text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={handleCopyLink}
                  aria-label="Copy link to clipboard"
                  className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </header>

          {/* Table of Contents */}
          {tableOfContents.length > 0 && (
            <div className="my-10 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 mb-3">
                Table of Contents
              </h4>
              <ul className="space-y-2 text-sm">
                {tableOfContents.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className="text-zinc-300 hover:text-white transition-colors hover:underline flex items-center gap-2"
                    >
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />
                      {heading.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Article Body Content */}
          <div
            className="prose prose-invert prose-zinc max-w-none my-10 space-y-6 text-zinc-300 leading-relaxed text-base sm:text-lg
              [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:my-4 [&_p]:leading-relaxed
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:my-4 [&_ul]:space-y-2
              [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:my-4 [&_ol]:space-y-2
              [&_li]:text-zinc-300
              [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:bg-zinc-900 [&_code]:text-indigo-300 [&_code]:font-mono [&_code]:text-sm [&_code]:border [&_code]:border-zinc-800
              [&_pre]:bg-zinc-950 [&_pre]:p-5 [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-zinc-800 [&_pre]:overflow-x-auto [&_pre]:my-6
              [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-none [&_pre_code]:text-zinc-200 [&_pre_code]:text-sm
              [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:text-sm
              [&_th]:bg-zinc-900/80 [&_th]:p-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-white [&_th]:border [&_th]:border-zinc-800
              [&_td]:p-3 [&_td]:border [&_td]:border-zinc-800/80 [&_td]:text-zinc-300
              [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_blockquote]:my-6
              [&_hr]:border-zinc-800/80 [&_hr]:my-10"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />

          {/* Tags */}
          <div className="pt-8 border-t border-zinc-800/80 flex flex-wrap gap-2 items-center">
            <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1.5 mr-2">
              <Tag className="w-3.5 h-3.5" /> Tags:
            </span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Card Footer */}
          <div className="my-12 p-8 rounded-2xl glass-card border border-zinc-800/60 flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-lg shadow-indigo-500/20">
              GS
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-bold text-white">Gunasekaran Selvarasu</h4>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  AWS Certified
                </span>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Senior Fullstack Developer with 5+ years of experience designing scalable SaaS web platforms, high-throughput Node.js microservices, and automated AWS cloud architectures.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold">
                <Link to="/#contact" className="text-indigo-400 hover:text-indigo-300 hover:underline">
                  Get in touch →
                </Link>
                <a
                  href="https://linkedin.com/in/gunasekaran-selvarasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/gunasekaran-selvarasu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-400 hover:text-white"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Adjacent Article Pagination */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10">
            {prevPost ? (
              <Link
                to={`/blog/${prevPost.slug}`}
                className="p-5 rounded-2xl glass-card border border-zinc-800/50 hover:border-zinc-700 group transition-all"
              >
                <div className="text-xs text-zinc-400 flex items-center gap-1 mb-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Post
                </div>
                <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {prevPost.title}
                </div>
              </Link>
            ) : <div />}

            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="p-5 rounded-2xl glass-card border border-zinc-800/50 hover:border-zinc-700 group transition-all text-right sm:text-right"
              >
                <div className="text-xs text-zinc-400 flex items-center justify-end gap-1 mb-2">
                  Next Post <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {nextPost.title}
                </div>
              </Link>
            )}
          </div>

          {/* Back to Blog Button */}
          <div className="text-center pt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Articles</span>
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
