import { motion } from 'framer-motion';
import { GraduationCap, Users, Bookmark, FileCheck, ShieldCheck } from 'lucide-react';

export default function Education() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
    }
  };

  const leadershipStrengths = [
    {
      title: 'Team Leadership',
      description: 'Headed multiple frontend squads. Championed developer alignment, agile tasks management, and target delivery velocities.',
      icon: Users,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10'
    },
    {
      title: 'Mentoring & Growth',
      description: 'Mentored junior developers, guided modern React hooks best practices, and provided clean typescript patterns.',
      icon: Bookmark,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10'
    },
    {
      title: 'Rigorous Code Reviews',
      description: 'Instituted coding standards, review guidelines, and accessibility audits. Decreased production UI bugs noticeably.',
      icon: FileCheck,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10'
    },
    {
      title: 'Cross-Collaboration',
      description: 'Worked alongside UI/UX designers, backend squads, product owners, and AWS sysops to orchestrate robust solutions.',
      icon: ShieldCheck,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10'
    }
  ];

  return (
    <section id="cloud" className="relative py-24 bg-zinc-950/60 overflow-hidden">
      {/* Top Faded Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />
      {/* Background Gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-10 left-1/4 w-[400px] h-[300px] rounded-full bg-cyan-500/5 glow-blur" />
        <div className="absolute top-10 right-1/4 w-[400px] h-[300px] rounded-full bg-indigo-500/5 glow-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          {/* Left Column: Education (Span 5) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Education & Qualifications
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Academic foundation of computer applications, algorithm structures, and web technologies.
              </p>
            </div>

            <div className="space-y-6">
              {/* MCA */}
              <motion.div
                variants={itemVariants}
                className="glass-card p-6 rounded-2xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-full group-hover:bg-indigo-500/10 transition-colors" />
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-indigo-400">Postgraduate Degree</span>
                      <h3 className="text-lg font-bold text-white leading-snug">
                        Master of Computer Applications (MCA)
                      </h3>
                      <p className="text-sm font-semibold text-zinc-400">
                        E.G.S. Pillay Engineering College (Autonomous)
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 shrink-0">
                        CGPA: 8.95 / 10
                      </span>
                      <span className="text-xs font-semibold text-zinc-550">
                        First Class with Distinction
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* BCA */}
              <motion.div
                variants={itemVariants}
                className="glass-card p-6 rounded-2xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-bl-full group-hover:bg-cyan-500/10 transition-colors" />
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-bold text-cyan-400">Undergraduate Degree</span>
                      <h3 className="text-lg font-bold text-white leading-snug">
                        Bachelor of Computer Applications (BCA)
                      </h3>
                      <p className="text-sm font-semibold text-zinc-400">
                        E.G.S. Pillay Arts and Science College
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 shrink-0">
                        Score: 79.5%
                      </span>
                      <span className="text-xs font-semibold text-zinc-550">
                        First Class
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Leadership & Strengths (Span 7) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Leadership & Interpersonal Strengths
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Core philosophies for cultivating collaborative engineering culture and accelerating software deliverables.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {leadershipStrengths.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemVariants}
                    className="glass-card p-6 rounded-2xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 hover:bg-zinc-900/10 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${item.bg} ${item.color}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
