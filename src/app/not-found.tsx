import Link from 'next/link';
import { BookOpen, Home } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      <Header activeSection="" />

      <main className="flex-1 flex items-center justify-center pt-32 pb-24 px-6 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <span className="text-3xl font-extrabold">404</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The page or article you are looking for doesn't exist, has been moved, or the link may be broken.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-semibold text-sm hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-md shadow-indigo-500/20"
            >
              <Home className="w-4 h-4" />
              <span>Back Home</span>
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 font-medium text-sm transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Blog</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
