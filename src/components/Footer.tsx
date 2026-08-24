import { Github, Linkedin, Mail, ArrowUp, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-zinc-950 py-12" aria-label="Site Footer">
      {/* Top Faded Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo / Brand */}
        <div className="flex items-center gap-1">
          <span className="text-xl font-bold tracking-tight text-white">
            Gunasekaran
          </span>
          <span className="text-indigo-500 font-extrabold font-mono">.dev</span>
        </div>

        {/* Info & Copyright */}
        <div className="text-center md:text-left">
          <p className="text-sm text-zinc-400 font-medium">
            &copy; {currentYear} Gunasekaran Selvarasu. All rights reserved.
          </p>
        </div>

        {/* Social Icons & Back to top */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/gunasekaran-selvarasu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-zinc-400 hover:text-white transition-colors bg-zinc-900/40 rounded-full border border-zinc-800/60"
            aria-label="Gunasekaran's GitHub Profile (opens in new tab)"
          >
            <Github className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="https://linkedin.com/in/gunasekaran-selvarasu"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-zinc-400 hover:text-white transition-colors bg-zinc-900/40 rounded-full border border-zinc-800/60"
            aria-label="Gunasekaran's LinkedIn Profile (opens in new tab)"
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="mailto:sguna0100@gmail.com"
            className="p-2.5 text-zinc-400 hover:text-white transition-colors bg-zinc-900/40 rounded-full border border-zinc-800/60"
            aria-label="Send email to sguna0100@gmail.com"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="https://wa.me/918973221644?text=Hi%20Gunasekaran,%20I'd%20like%2520to%20connect!"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-zinc-400 hover:text-emerald-400 transition-colors bg-zinc-900/40 rounded-full border border-zinc-800/60"
            aria-label="Chat with Gunasekaran on WhatsApp (opens in new tab)"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
          </a>
          <button
            onClick={handleScrollToTop}
            className="p-2.5 text-zinc-400 hover:text-white transition-all bg-zinc-900/40 hover:bg-indigo-500/10 rounded-full border border-zinc-800 hover:border-indigo-500/30 ml-2 cursor-pointer"
            aria-label="Scroll back to top of the page"
          >
            <ArrowUp className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
