import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Zap, Code, ShieldCheck } from 'lucide-react';
import profileWebp from '../assets/profile/gunasekaran_selvarasu.webp';
import profileAvif from '../assets/profile/gunasekaran_selvarasu.avif';
import profileFallback from '../assets/profile/gunasekaran_selvarasu.jpeg';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 },
    },
  };

  const handleScrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const metrics = [
    { label: 'Experience', value: '5+ Years', icon: Code, color: 'text-indigo-400' },
    { label: 'Enterprise & SaaS', value: '10+ Projects', icon: Zap, color: 'text-cyan-400' },
    { label: 'Avg. Optimization Boost', value: '35%+', icon: Award, color: 'text-purple-400' },
    { label: 'AWS Certification', value: 'Cloud Practitioner', icon: ShieldCheck, color: 'text-amber-400' },
  ];

  return (
    <section 
      id="about" 
      className="relative min-h-[92svh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
      aria-label="About and Introduction"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-indigo-500/10 glow-blur opacity-60" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-cyan-500/10 glow-blur opacity-60" />
        <div className="absolute top-1/3 right-1/3 w-[300px] h-[300px] rounded-full bg-purple-500/5 glow-blur opacity-40" />
        
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Text & CTA Content */}
          <div className="col-span-1 lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* AWS Certification Tagline */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs md:text-sm font-semibold tracking-wide mb-6 shadow-sm backdrop-blur-md"
            >
              <ShieldCheck className="w-4.5 h-4.5 text-indigo-400 animate-pulse" aria-hidden="true" />
              <span>AWS CERTIFIED CLOUD PRACTITIONER</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6"
            >
              Gunasekaran Selvarasu
              <span className="block mt-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Senior Frontend Engineer
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-zinc-300 font-normal leading-relaxed max-w-2xl mb-10"
            >
              Architecting high-performance, scalable web applications with React.js, Next.js, and Cloud Infrastructure. 
              5+ years of delivering enterprise-grade SaaS and e-commerce platforms.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-4 w-full sm:w-auto"
            >
              <button
                onClick={() => handleScrollTo('#projects')}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-sm md:text-base font-semibold bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white shadow-xl shadow-indigo-500/15 hover:shadow-indigo-500/25 transition-all duration-300 active:scale-95 group cursor-pointer"
                aria-label="View Featured Work and Projects"
              >
                <span>View Featured Work</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
              </button>
              <button
                onClick={() => handleScrollTo('#contact')}
                className="flex items-center justify-center px-8 py-4 rounded-full text-sm md:text-base font-semibold border border-zinc-700/80 text-zinc-200 hover:text-white hover:bg-zinc-800/30 hover:border-zinc-500/50 backdrop-blur-sm transition-all duration-300 active:scale-95 cursor-pointer"
                aria-label="Get in Touch with Gunasekaran"
              >
                Get in Touch
              </button>
            </motion.div>
          </div>

          {/* Right Column: Profile Photo Card */}
          <div className="col-span-1 lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              variants={itemVariants}
              className="relative group"
            >
              {/* Ambient glow backdrop */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-cyan-500 opacity-20 blur-2xl group-hover:opacity-45 group-hover:blur-3xl transition-all duration-500 scale-95" aria-hidden="true" />
              
              {/* Image Frame Card */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-[320px] lg:h-[320px] xl:w-[360px] xl:h-[360px] rounded-full p-[3px] bg-gradient-to-tr from-zinc-800/60 via-zinc-700/60 to-zinc-800/60 group-hover:from-indigo-500 group-hover:via-purple-500 group-hover:to-cyan-500 transition-all duration-500 shadow-2xl shadow-black/80 overflow-hidden">
                <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900/90">
                  <picture>
                    <source srcSet={profileAvif} type="image/avif" />
                    <source srcSet={profileWebp} type="image/webp" />
                    <img
                      src={profileFallback}
                      alt="Gunasekaran Selvarasu - Senior Frontend Engineer"
                      width={360}
                      height={360}
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      style={{ aspectRatio: '1 / 1' }}
                      className="w-full h-full object-cover object-top scale-100 group-hover:scale-103 transition-transform duration-500 ease-out"
                    />
                  </picture>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Metrics Bar (Bottom anchor spanning all columns) */}
          <motion.div
            variants={itemVariants}
            className="relative col-span-1 lg:col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full pt-8 mt-8"
          >
            {/* Faded Divider */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" aria-hidden="true" />
            {metrics.map((metric, i) => {
              const IconComponent = metric.icon;
              return (
                <div
                  key={i}
                  className="glass-card p-5 rounded-2xl flex flex-col items-center justify-center text-center relative group overflow-hidden border border-zinc-800/40 hover:border-zinc-700/50 transition-colors duration-300"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-indigo-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
                  <div className="p-3 bg-zinc-900/50 rounded-xl mb-3 text-zinc-400 group-hover:text-white transition-colors">
                    <IconComponent className={`w-5 h-5 ${metric.color}`} aria-hidden="true" />
                  </div>
                  <span className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {metric.value}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">
                    {metric.label}
                  </span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
