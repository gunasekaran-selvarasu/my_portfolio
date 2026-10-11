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
import { getAllPosts, getPostBySlug, getAdjacentPosts } from '../../../lib/blog';

// Configure custom marked renderer for headings with anchor IDs
const renderer = new marked.Renderer();

renderer.heading = function ({ tokens, depth }) {
  const text = this.parser.parseInline(tokens);
  const headingSlug = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
  return `<h${depth} id="${headingSlug}" class="scroll-mt-24">${text}</h${depth}>`;
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
        <article className="max-w-4xl mx-auto px-6">
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
