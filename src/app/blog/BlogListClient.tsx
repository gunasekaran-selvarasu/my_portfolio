'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { m as motion, LazyMotion, domMax } from 'framer-motion';
import { Calendar, Clock, Search, ArrowRight, BookOpen, Sparkles, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import type { BlogPost } from '../../lib/blog';

interface BlogListClientProps {
  allPosts: BlogPost[];
  categories: string[];
}

export default function BlogListClient({ allPosts, categories }: BlogListClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const allCategories = useMemo(() => ['All', ...categories], [categories]);

  const filteredPosts = useMemo(() => {
    return allPosts.filter((post) => {
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [allPosts, selectedCategory, searchQuery]);

  const featuredPost = useMemo(() => {
    return allPosts.find((p) => p.featured) || allPosts[0];
  }, [allPosts]);

  return (
    <LazyMotion features={domMax} strict>
      <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
        <Header activeSection="blog" />

        <main className="flex-1 pt-32 pb-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-zinc-600" aria-hidden="true" />
              <span className="text-indigo-400 font-medium">Blog</span>
            </nav>

            {/* Header Title */}
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Engineering &amp; Cloud Insights</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                Architectural Insights &amp; Technical Deep Dives
              </h1>
              <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
                Battle-tested patterns, system architecture case studies, and performance engineering lessons from building scalable fullstack applications.
              </p>
            </div>

            {/* Featured Post Card */}
            {featuredPost && selectedCategory === 'All' && !searchQuery && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <div className="relative rounded-3xl overflow-hidden glass-card border border-indigo-500/30 p-8 sm:p-10 bg-gradient-to-br from-indigo-950/20 via-zinc-900/40 to-cyan-950/20">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      Featured Post
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                      {featuredPost.publishedAt}
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <Link href={`/blog/${featuredPost.slug}`} className="group block space-y-4">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                      {featuredPost.title}
                    </h2>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed max-w-4xl">
                      {featuredPost.description}
                    </p>
                  </Link>

                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-6 border-t border-zinc-800/60">
                    <div className="flex flex-wrap gap-2">
                      {featuredPost.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2.5 py-1 rounded-md bg-zinc-900 text-zinc-300 border border-zinc-800">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/blog/${featuredPost.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 group-hover:text-indigo-300 hover:translate-x-1 transition-all"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10">
              {/* Category Pills */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto" role="tablist" aria-label="Blog categories">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                        : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-zinc-800/80 hover:bg-zinc-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search articles or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-zinc-900/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Articles Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <motion.article
                    key={post.slug}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="glass-card rounded-2xl border border-zinc-800/50 hover:border-zinc-700/80 p-6 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-xs text-zinc-400">
                        <span className="px-2.5 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 font-medium text-indigo-400">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                            {post.readTime}
                          </span>
                        </div>
                      </div>

                      <Link href={`/blog/${post.slug}`} className="block group">
                        <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-zinc-400 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed">
                          {post.description}
                        </p>
                      </Link>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                      <span className="text-xs text-zinc-400 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                        {post.publishedAt}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 inline-flex items-center gap-1"
                        aria-label={`Read article: ${post.title}`}
                      >
                        Read Post
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-zinc-900/20 rounded-2xl border border-zinc-800/40">
                <BookOpen className="w-12 h-12 text-zinc-600 mx-auto mb-4" aria-hidden="true" />
                <h3 className="text-xl font-bold text-white">No articles found</h3>
                <p className="text-zinc-400 text-sm mt-1">Try adjusting your search query or selected category.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="mt-4 px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-lg text-xs font-semibold hover:bg-indigo-500/30 transition-colors cursor-pointer"
                >
                  Reset filters
                </button>
              </div>
            )}

            {/* Newsletter / Contact CTA */}
            <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-zinc-900 via-indigo-950/40 to-zinc-900 border border-zinc-800 text-center space-y-4">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Looking for Technical Consulting or Custom Fullstack Architecture?
              </h3>
              <p className="text-zinc-300 text-sm sm:text-base max-w-2xl mx-auto">
                I help startups and enterprise teams build scalable cloud backends, SSR web apps, and automated AWS infrastructures.
              </p>
              <div className="pt-2">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                >
                  <span>Discuss Your Project</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </LazyMotion>
  );
}
