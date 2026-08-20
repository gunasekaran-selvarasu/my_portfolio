import { motion } from 'framer-motion';
import {
  Code, Cloud, CreditCard, Shield, Globe,
  Layers, CheckCircle, ExternalLink, Zap
} from 'lucide-react';

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 },
    },
  };

  const frontendSkills = [
    { name: 'React.js', level: 'Expert' },
    { name: 'Next.js', level: 'Expert' },
    { name: 'TypeScript', level: 'Expert' },
    { name: 'JavaScript', level: 'Expert' },
    { name: 'Tailwind CSS', level: 'Expert' },
    { name: 'PHP', level: 'Advanced' },
    { name: 'Laravel', level: 'Advanced' },
    { name: 'WordPress', level: 'Advanced' },
    { name: 'Redux Toolkit', level: 'Advanced' },
    { name: 'HTML5 / CSS3', level: 'Expert' },
    { name: 'Responsive UI/UX', level: 'Expert' },
    { name: 'RESTful APIs', level: 'Expert' },
  ];

  const cloudSkills = [
    { name: 'EC2', category: 'Compute' },
    { name: 'S3', category: 'Storage' },
    { name: 'Amplify', category: 'Deployment' },
    { name: 'CloudFront', category: 'CDN' },
    { name: 'Route 53', category: 'DNS' },
    { name: 'WAF', category: 'Security' },
    { name: 'CI/CD (GitHub Actions)', category: 'DevOps' },
    { name: 'Git & Gitflow', category: 'DevOps' },
  ];

  const integrationSkills = [
    { name: 'RESTful APIs', icon: Globe },
    { name: 'RazorPay Integration', icon: CreditCard },
    { name: 'PayPal Checkout', icon: CreditCard },
    { name: 'Performance Auditing', icon: Zap },
    { name: 'OTP & MFA Auth', icon: Shield },
  ];

  return (
    <section id="skills" className="relative py-24 border-t border-zinc-900 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/5 glow-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Technical Arsenal & Cloud Competencies
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A comprehensive overview of my backend-friendly frontend frameworks, DevOps practices, and cloud-native architecture solutions.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* 1. Frontend Skills Card (Span 2) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 glass-card p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-indigo-500/10 rounded-full glow-blur group-hover:bg-indigo-500/15 transition-colors" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Code className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Core Stack & Architecture</h3>
                <p className="text-xs text-indigo-400/80 font-medium">Frontend, Backend & CMS</p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Engineering web systems using robust frontend libraries (React/Next.js), structured backend frameworks (Laravel/PHP), modular databases, and custom WordPress child-themes.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {frontendSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/60 border border-zinc-850 hover:border-indigo-500/30 p-3.5 rounded-2xl flex flex-col justify-between transition-all group/item"
                >
                  <span className="text-sm font-semibold text-white group-hover/item:text-indigo-300 transition-colors">
                    {skill.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-zinc-500 mt-1">
                    {skill.level}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 2. AWS Practitioner Badge Card (Span 1, Row Span 2) */}
          <motion.div
            variants={cardVariants}
            className="md:row-span-2 bg-gradient-to-br from-indigo-950/40 via-zinc-900/40 to-cyan-950/40 backdrop-blur-xl p-8 rounded-3xl border border-indigo-500/20 relative overflow-hidden flex flex-col justify-between group shadow-xl shadow-indigo-500/5 hover:border-indigo-400/40 transition-all duration-300"
          >
            {/* Holographic glowing borders */}
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-500" />
            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-cyan-500/10 rounded-full glow-blur" />

            <div className="z-10 flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full uppercase tracking-wider">
                    Verified Credential
                  </span>
                </div>

                {/* Credly Badge Embed */}
                <div className="flex justify-center mb-6 min-h-[270px] w-full">
                  <iframe
                    src="https://www.credly.com/embedded_badge/da73f66c-5901-455c-a2c6-0748ee3e55af"
                    width="300"
                    height="300"
                    title="AWS Certified Cloud Practitioner Badge"
                    className="border-0"
                    scrolling="no"
                  />
                </div>

                <div className="mb-6 text-center">
                  <h3 className="text-2xl font-black text-white tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-300 transition-all duration-300">
                    AWS Certified
                  </h3>
                  <p className="text-sm font-semibold text-zinc-300">
                    Cloud Practitioner
                  </p>
                  <p className="text-xs text-zinc-500 mt-1 font-medium">
                    Amazon Web Services (AWS)
                  </p>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Cloud Design & Architecture</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AWS Global Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Security & Compliance Audits</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-400 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Billing, Pricing, & Optimization</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="z-10 mt-auto">
              <a
                href="https://www.credly.com/badges/da73f66c-5901-455c-a2c6-0748ee3e55af/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 font-semibold text-sm transition-all"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>

          {/* 3. Integrations & Architecture Card (Span 1) */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="absolute -right-20 -bottom-20 w-36 h-36 bg-cyan-500/10 rounded-full glow-blur" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <Layers className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Architecture</h3>
                <p className="text-xs text-cyan-400/80 font-medium">Integrations & Workflows</p>
              </div>
            </div>

            <div className="space-y-4">
              {integrationSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-zinc-900/60 last:border-0">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-zinc-500 group-hover:text-cyan-400 transition-colors shrink-0" />
                      <span className="text-sm font-medium text-zinc-350">{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-bold text-zinc-650 bg-zinc-900/50 px-2.5 py-0.5 rounded-full border border-zinc-850">
                      Active
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 4. Cloud & DevOps Card (Span 2) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 glass-card p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-cyan-500/10 rounded-full glow-blur" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <Cloud className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Cloud Deployments & DevOps</h3>
                <p className="text-xs text-cyan-400/80 font-medium">AWS Infrastructure & CI/CD Pipelines</p>
              </div>
            </div>

            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Managing AWS setups for security, low-latency asset delivery (CloudFront CDN), cost-efficiency (S3/EC2 optimization), custom routing (Route 53), and auto-triggered GitHub Action releases.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {cloudSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3.5 py-2 bg-zinc-900/50 border border-zinc-850/60 rounded-xl flex items-center gap-2 hover:border-zinc-700 hover:bg-zinc-900/80 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                  <span className="text-sm font-semibold text-zinc-200">{skill.name}</span>
                  <span className="text-[9px] font-bold text-zinc-550 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-850">
                    {skill.category}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
