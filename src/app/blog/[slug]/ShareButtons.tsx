'use client';

import { useState } from 'react';
import { Linkedin, Twitter, Copy, Check } from 'lucide-react';

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://guna.dev/blog/${slug}`;
  };

  const handleCopyLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinkedIn = () => {
    const url = getUrl();
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  const shareTwitter = () => {
    const url = getUrl();
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={shareLinkedIn}
        aria-label="Share on LinkedIn"
        className="p-2 text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors cursor-pointer"
      >
        <Linkedin className="w-4 h-4" />
      </button>
      <button
        onClick={shareTwitter}
        aria-label="Share on Twitter"
        className="p-2 text-zinc-400 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors cursor-pointer"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={handleCopyLink}
        aria-label="Copy link to clipboard"
        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900/60 hover:bg-zinc-800 rounded-lg border border-zinc-800 transition-colors cursor-pointer"
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
  );
}
