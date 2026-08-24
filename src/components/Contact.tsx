import { useState, useRef, lazy, Suspense } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send, Copy, Check, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import type ReCAPTCHAType from 'react-google-recaptcha';

// Lazy load ReCAPTCHA component only on interaction
const LazyReCAPTCHA = lazy(() => import('react-google-recaptcha'));

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [showRecaptcha, setShowRecaptcha] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHAType>(null);

  const activateFormInteraction = () => {
    if (!showRecaptcha) {
      setShowRecaptcha(true);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('sguna0100@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    activateFormInteraction();
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    if (!recaptchaToken) return;

    setFormState('sending');

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateAdminId = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMIN;
    const templateCustomerId = import.meta.env.VITE_EMAILJS_TEMPLATE_CUSTOMER;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateAdminId || !templateCustomerId || !publicKey) {
      console.error('EmailJS configuration variables are missing. Please verify your .env file.');
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
      return;
    }

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      'g-recaptcha-response': recaptchaToken,
    };

    try {
      // Dynamic import to avoid loading EmailJS script upfront
      const emailjs = await import('@emailjs/browser');

      await Promise.all([
        emailjs.default.send(serviceId, templateAdminId, templateParams, publicKey),
        emailjs.default.send(serviceId, templateCustomerId, templateParams, publicKey)
      ]);

      setFormState('success');
      setFormData({ name: '', email: '', message: '' });
      setRecaptchaToken(null);
      recaptchaRef.current?.reset();

      setTimeout(() => setFormState('idle'), 4000);
    } catch (error) {
      console.error('Failed to send email:', error);
      setFormState('error');
      setTimeout(() => setFormState('idle'), 4000);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-zinc-950 overflow-hidden" aria-label="Contact and Inquiries">
      {/* Top Faded Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-indigo-500/5 glow-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg">
            Let's collaborate on enterprise frontend products, performance audits, or cloud infrastructure setups.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          {/* Left Column: Direct info (Span 5) */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xl font-bold text-white tracking-tight mb-4">
              Contact Information
            </h3>

            {/* Copyable Email Card */}
            <div
              onClick={copyEmail}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); copyEmail(); } }}
              className="glass-card p-5 rounded-2xl border border-zinc-800/40 hover:border-indigo-500/30 hover:bg-zinc-900/10 cursor-pointer flex items-center justify-between group transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
              aria-label="Click to copy email address sguna0100@gmail.com"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">Email Address</span>
                  <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    sguna0100@gmail.com
                  </span>
                </div>
              </div>
              <button
                type="button"
                className={`p-2 rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-white transition-all duration-300 shrink-0 ${copied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-zinc-900/60'}`}
                aria-label="Copy email address"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 animate-scale-up" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-card p-5 rounded-2xl border border-zinc-800/40 flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <MapPin className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-400 block">Location</span>
                <span className="text-sm font-semibold text-zinc-200">
                  Chennai, Tamil Nadu, India
                </span>
              </div>
            </div>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/918973221644?text=Hi%20Gunasekaran,%20I'd%20love%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl border border-zinc-800/40 hover:border-emerald-500/35 hover:bg-zinc-900/10 cursor-pointer flex items-center justify-between group transition-all duration-300"
              aria-label="Chat with Gunasekaran on WhatsApp (opens in new tab)"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-400 block">WhatsApp Chat</span>
                  <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    +91 89732 21644
                  </span>
                </div>
              </div>
              <span
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-emerald-400 bg-zinc-900/60 transition-all duration-300 shrink-0"
                aria-hidden="true"
              >
                <ExternalLink className="w-4 h-4" />
              </span>
            </a>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://linkedin.com/in/gunasekaran-selvarasu"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 rounded-2xl border border-zinc-800/40 hover:border-zinc-700/60 hover:bg-zinc-900/10 flex flex-col justify-between h-28 group transition-all duration-300"
                aria-label="View Gunasekaran's LinkedIn Profile (opens in new tab)"
              >
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl self-start">
                  <Linkedin className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                  LinkedIn Profile
                </span>
              </a>

              <a
                href="https://github.com/gunasekaran-selvarasu"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 rounded-2xl border border-zinc-800/40 hover:border-zinc-700/60 hover:bg-zinc-900/10 flex flex-col justify-between h-28 group transition-all duration-300"
                aria-label="View Gunasekaran's GitHub Profile (opens in new tab)"
              >
                <div className="p-2.5 bg-zinc-900/60 text-zinc-300 rounded-xl self-start border border-zinc-800">
                  <Github className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-xs font-bold text-zinc-300 group-hover:text-white transition-colors">
                  GitHub Profile
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Contact form (Span 7) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-zinc-800/40">
              <h3 className="text-xl font-bold text-white tracking-tight mb-6">
                Send a Message
              </h3>

              <form 
                onSubmit={handleSubmit} 
                className="space-y-5"
                onFocusCapture={activateFormInteraction}
                onClick={activateFormInteraction}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
                      Full Name <span className="text-rose-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      aria-required="true"
                      value={formData.name}
                      onFocus={activateFormInteraction}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
                      Email Address <span className="text-rose-400" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      aria-required="true"
                      value={formData.email}
                      onFocus={activateFormInteraction}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-zinc-300 uppercase tracking-wide">
                    Message <span className="text-rose-400" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    aria-required="true"
                    rows={5}
                    value={formData.message}
                    onFocus={activateFormInteraction}
                    onChange={handleInputChange}
                    placeholder="Describe your project, timeline, and requirements..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* Google reCAPTCHA: On-Demand Lazy Interaction */}
                <div className="flex justify-center sm:justify-start pt-2 min-h-[78px]">
                  {showRecaptcha ? (
                    <Suspense
                      fallback={
                        <div className="h-[78px] w-[304px] bg-zinc-900/60 border border-zinc-800/80 rounded-xl flex items-center justify-center text-xs text-zinc-400 animate-pulse">
                          Loading verification...
                        </div>
                      }
                    >
                      <LazyReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'dummy_site_key'}
                        onChange={(token) => setRecaptchaToken(token)}
                        theme="dark"
                      />
                    </Suspense>
                  ) : (
                    <button
                      type="button"
                      onClick={activateFormInteraction}
                      className="h-[78px] w-full max-w-[304px] bg-zinc-900/60 hover:bg-zinc-900/90 border border-zinc-800 hover:border-indigo-500/40 rounded-xl px-4 py-3 flex items-center gap-3 transition-all duration-300 text-left group cursor-pointer"
                      aria-label="Click to activate reCAPTCHA security verification"
                    >
                      <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-lg group-hover:bg-indigo-500/20 transition-colors">
                        <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-zinc-200 block group-hover:text-white transition-colors">
                          Security Verification
                        </span>
                        <span className="text-[11px] text-zinc-400 block">
                          Click to load reCAPTCHA
                        </span>
                      </div>
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={formState !== 'idle' || !recaptchaToken}
                  aria-label="Send contact form message"
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold tracking-wide shadow-md active:scale-[0.98] transition-all duration-300 cursor-pointer ${formState === 'success'
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/10'
                    : formState === 'error'
                      ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/10'
                      : 'bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-indigo-500/10 hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-indigo-500 disabled:hover:to-cyan-500'
                    }`}
                >
                  {formState === 'idle' && (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </>
                  )}
                  {formState === 'sending' && (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                      <span>Sending...</span>
                    </>
                  )}
                  {formState === 'success' && (
                    <>
                      <Check className="w-4 h-4 text-white" aria-hidden="true" />
                      <span>Message Sent Successfully!</span>
                    </>
                  )}
                  {formState === 'error' && (
                    <>
                      <span>Failed to Send Message</span>
                    </>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {formState === 'success' && (
                  <motion.div
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs text-center rounded-xl font-medium"
                  >
                    Thank you! I will get back to you as soon as possible.
                  </motion.div>
                )}
                {formState === 'error' && (
                  <motion.div
                    role="alert"
                    aria-live="assertive"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs text-center rounded-xl font-medium"
                  >
                    Failed to send email. Please check your internet connection or configurations.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
