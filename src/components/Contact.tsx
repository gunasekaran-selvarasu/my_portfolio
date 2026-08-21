import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MapPin, Linkedin, Github, Send, Copy, Check, MessageCircle, ExternalLink } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText('sguna0100@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      await Promise.all([
        emailjs.send(serviceId, templateAdminId, templateParams, publicKey),
        emailjs.send(serviceId, templateCustomerId, templateParams, publicKey)
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
    <section id="contact" className="relative py-24 border-t border-zinc-900 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-10 w-[400px] h-[400px] bg-indigo-500/5 glow-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Get In Touch
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
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
              className="glass-card p-5 rounded-2xl border border-zinc-800/40 hover:border-indigo-500/30 hover:bg-zinc-900/10 cursor-pointer flex items-center justify-between group transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl group-hover:bg-indigo-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-550 block">Email Address</span>
                  <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    sguna0100@gmail.com
                  </span>
                </div>
              </div>
              <button
                className={`p-2 rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-white transition-all duration-300 shrink-0 ${copied ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-zinc-900/60'}`}
                aria-label="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400 animate-scale-up" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Location Card */}
            <div className="glass-card p-5 rounded-2xl border border-zinc-800/40 flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-zinc-550 block">Location</span>
                <span className="text-sm font-semibold text-zinc-200">
                  Chennai, Tamil Nadu, India
                </span>
              </div>
            </div>

            {/* WhatsApp Card */}
            <a
              href="https://wa.me/918973221644?text=Hi%20Gunasekaran,%20I'd%20love%2520to%2520connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-5 rounded-2xl border border-zinc-800/40 hover:border-emerald-500/35 hover:bg-zinc-900/10 cursor-pointer flex items-center justify-between group transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl group-hover:bg-emerald-500/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-zinc-550 block">WhatsApp Chat</span>
                  <span className="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
                    +91 89732 21644
                  </span>
                </div>
              </div>
              <button
                className="p-2 rounded-lg border border-zinc-800 text-zinc-400 group-hover:text-emerald-450 bg-zinc-900/60 transition-all duration-300 shrink-0"
                aria-label="Chat on WhatsApp"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </a>

            {/* Social Links Grid */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://linkedin.com/in/gunasekaran-selvarasu"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card p-5 rounded-2xl border border-zinc-800/40 hover:border-zinc-700/60 hover:bg-zinc-900/10 flex flex-col justify-between h-28 group transition-all duration-300"
              >
                <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl self-start">
                  <Linkedin className="w-5 h-5" />
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
              >
                <div className="p-2.5 bg-zinc-900/60 text-zinc-300 rounded-xl self-start border border-zinc-850">
                  <Github className="w-5 h-5" />
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

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-550 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-550 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your project, timeline, and requirements..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-550 focus:outline-none transition-all duration-300 resize-none"
                  />
                </div>

                {/* Google reCAPTCHA Checkbox */}
                <div className="flex justify-center sm:justify-start pt-2">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY || 'dummy_site_key'}
                    onChange={(token) => setRecaptchaToken(token)}
                    theme="dark"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState !== 'idle' || !recaptchaToken}
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
                      <Send className="w-4 h-4" />
                    </>
                  )}
                  {formState === 'sending' && (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  )}
                  {formState === 'success' && (
                    <>
                      <Check className="w-4 h-4 text-white" />
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-450 text-xs text-center rounded-xl font-medium"
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
