import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { marked } from 'marked';
import {
  Calendar,
  Clock,
  ArrowLeft,
  ChevronRight,
  ArrowRight,
  Tag,
  ShieldCheck,
} from 'lucide-react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ReadingProgress from './ReadingProgress';
import TableOfContents from './TableOfContents';
import ShareButtons from './ShareButtons';
import ArticleBody from './ArticleBody';
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '../../../lib/blog';

// Configure custom marked renderer for headings, code blocks with copy button, and responsive tables
const renderer = new marked.Renderer();

renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const headingSlug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  return `<h${depth} id="${headingSlug}" class="scroll-mt-24">${text}</h${depth}>`;
};

renderer.code = function ({ text, lang }: { text: string; lang?: string; escaped?: boolean }) {
  const cleanLang = (lang || '').trim().split(/\s+/)[0] || 'code';
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

  return `<div class="code-block-wrapper group relative my-6 rounded-2xl overflow-hidden border border-zinc-800/90 bg-zinc-950/90 shadow-xl transition-all">
  <div class="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800/80 text-xs font-mono select-none">
    <div class="flex items-center gap-2 text-zinc-400">
      <span class="inline-block w-2.5 h-2.5 rounded-full bg-indigo-500/80 shadow-sm shadow-indigo-500/50"></span>
      <span class="uppercase font-semibold tracking-wider text-[11px] text-zinc-300">${cleanLang}</span>
    </div>
    <button
      type="button"
      class="copy-code-btn inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-zinc-400 hover:text-white bg-zinc-800/60 hover:bg-zinc-800 border border-zinc-700/50 hover:border-zinc-600 transition-all cursor-pointer active:scale-95"
      aria-label="Copy code to clipboard"
    >
      <svg class="w-3.5 h-3.5 copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
      </svg>
      <span class="copy-text text-[11px]">Copy</span>
    </button>
  </div>
  <pre class="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200 leading-relaxed"><code class="language-${cleanLang}">${escapedText}</code></pre>
</div>`;
};

renderer.table = function ({ header, rows }) {
  return `<div class="table-container overflow-x-auto my-6 rounded-xl border border-zinc-800/80"><table class="w-full text-left border-collapse text-xs sm:text-sm"><thead>${header}</thead><tbody>${rows}</tbody></table></div>`;
};

marked.setOptions({
  renderer,
  gfm: true,
  breaks: true,
});

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const postUrl = `https://guna.dev/blog/${post.slug}`;
  const coverUrl = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `https://guna.dev${post.coverImage || '/og-image.png'}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      title: `${post.title} | Gunasekaran Selvarasu`,
      description: post.description,
      url: postUrl,
      publishedTime: post.publishedAt,
      authors: ['Gunasekaran Selvarasu'],
      images: [
        {
          url: coverUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Gunasekaran Selvarasu`,
      description: post.description,
      images: [coverUrl],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev: prevPost, next: nextPost } = getAdjacentPosts(slug);

  // Convert markdown to HTML on the server
  const htmlContent = marked.parse(post.content) as string;

  // Extract table of contents (H2 headings)
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

  const postUrl = `https://guna.dev/blog/${post.slug}`;
  const coverUrl = post.coverImage?.startsWith('http')
    ? post.coverImage
    : `https://guna.dev${post.coverImage || '/og-image.png'}`;

  // TechArticle structured data for rich snippets
  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    url: postUrl,
    image: coverUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: 'Gunasekaran Selvarasu',
      url: 'https://guna.dev/',
      jobTitle: 'Senior Fullstack Developer & AWS Certified Practitioner',
    },
    publisher: {
      '@type': 'Person',
      name: 'Gunasekaran Selvarasu',
    },
    keywords: post.tags.join(', '),
    articleSection: post.category,
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <ReadingProgress />
      <Header activeSection="blog" />

      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />

      <main className="flex-1 pt-32 pb-24">
        <article className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Breadcrumb Navigation */}
          <nav
            className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-8"
            aria-label="Breadcrumb"
          >
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog
            </Link>
            <ChevronRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
            <span className="text-indigo-400 font-medium truncate max-w-[180px] sm:max-w-xs">
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

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight break-words">
              {post.title}
            </h1>

            <p className="text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed">
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
                  <div className="text-xs text-zinc-400">
                    Senior Fullstack Developer &amp; AWS Certified
                  </div>
                </div>
              </div>

              {/* Share buttons */}
              <ShareButtons title={post.title} slug={post.slug} />
            </div>
          </header>

          {/* Table of Contents */}
          <TableOfContents headings={headings} />

          {/* Article Body Content with Interactive Code Copy */}
          <ArticleBody htmlContent={htmlContent} />

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
                Senior Fullstack Developer with 5+ years of experience designing scalable SaaS web
                platforms, high-throughput Node.js microservices, and automated AWS cloud
                architectures.
              </p>
              <div className="pt-2 flex items-center gap-4 text-xs font-semibold">
                <Link
                  href="/#contact"
                  className="text-indigo-400 hover:text-indigo-300 hover:underline"
                >
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
                href={`/blog/${prevPost.slug}`}
                className="p-5 rounded-2xl glass-card border border-zinc-800/50 hover:border-zinc-700 group transition-all"
              >
                <div className="text-xs text-zinc-400 flex items-center gap-1 mb-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Post
                </div>
                <div className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {prevPost.title}
                </div>
              </Link>
            ) : (
              <div />
            )}

            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
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
              href="/blog"
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
