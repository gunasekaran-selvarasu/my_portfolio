'use client';

import { useEffect, useRef } from 'react';

interface ArticleBodyProps {
  htmlContent: string;
}

export default function ArticleBody({ htmlContent }: ArticleBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleCopyClick = async (e: MouseEvent) => {
      const button = (e.target as HTMLElement).closest('.copy-code-btn') as HTMLButtonElement | null;
      if (!button) return;

      const wrapper = button.closest('.code-block-wrapper');
      if (!wrapper) return;

      const codeEl = wrapper.querySelector('pre code');
      if (!codeEl) return;

      const textToCopy = codeEl.textContent || '';

      try {
        await navigator.clipboard.writeText(textToCopy);

        const originalContent = button.innerHTML;
        button.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-400 animate-scale-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span class="text-[11px] text-emerald-400 font-semibold">Copied!</span>
        `;
        button.classList.add('bg-emerald-500/10', 'border-emerald-500/30');

        setTimeout(() => {
          button.innerHTML = originalContent;
          button.classList.remove('bg-emerald-500/10', 'border-emerald-500/30');
        }, 2000);
      } catch (err) {
        console.error('Failed to copy code to clipboard:', err);
      }
    };

    container.addEventListener('click', handleCopyClick);
    return () => {
      container.removeEventListener('click', handleCopyClick);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="prose prose-invert prose-zinc max-w-none my-8 sm:my-10 space-y-6 text-zinc-300 leading-relaxed text-base sm:text-lg break-words
        [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:sm:mt-12 [&_h2]:mb-4 [&_h2]:scroll-mt-24
        [&_h3]:text-xl [&_h3]:sm:text-2xl [&_h3]:font-bold [&_h3]:text-zinc-100 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:scroll-mt-24
        [&_p]:my-4 [&_p]:leading-relaxed
        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:sm:pl-6 [&_ul]:my-4 [&_ul]:space-y-2
        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:sm:pl-6 [&_ol]:my-4 [&_ol]:space-y-2
        [&_li]:text-zinc-300
        [&_code:not(pre_code)]:px-1.5 [&_code:not(pre_code)]:py-0.5 [&_code:not(pre_code)]:rounded-md [&_code:not(pre_code)]:bg-zinc-900 [&_code:not(pre_code)]:text-indigo-300 [&_code:not(pre_code)]:font-mono [&_code:not(pre_code)]:text-xs [&_code:not(pre_code)]:sm:text-sm [&_code:not(pre_code)]:border [&_code:not(pre_code)]:border-zinc-800
        [&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:border-none [&_pre]:p-4 [&_pre]:sm:p-5 [&_pre]:overflow-x-auto
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:border-none [&_pre_code]:text-zinc-200 [&_pre_code]:text-xs [&_pre_code]:sm:text-sm [&_pre_code]:leading-relaxed
        [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:text-xs [&_table]:sm:text-sm
        [&_.table-container]:overflow-x-auto [&_.table-container]:my-6 [&_.table-container]:rounded-xl [&_.table-container]:border [&_.table-container]:border-zinc-800
        [&_th]:bg-zinc-900/80 [&_th]:p-2.5 [&_th]:sm:p-3 [&_th]:text-left [&_th]:font-bold [&_th]:text-white [&_th]:border [&_th]:border-zinc-800
        [&_td]:p-2.5 [&_td]:sm:p-3 [&_td]:border [&_td]:border-zinc-800/80 [&_td]:text-zinc-300
        [&_blockquote]:border-l-4 [&_blockquote]:border-indigo-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_blockquote]:my-6
        [&_hr]:border-zinc-800/80 [&_hr]:my-10"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
