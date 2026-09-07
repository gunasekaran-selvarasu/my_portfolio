import { m as motion } from 'framer-motion';
import {
  Code, Cloud, Database, Shield,
  Layers, CheckCircle, ExternalLink, Server, Cpu
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
    { name: 'React.js', level: 'Expert', tag: 'Core UI' },
    { name: 'Next.js (SSR)', level: 'Expert', tag: 'Server-Side' },
    { name: 'TypeScript', level: 'Expert', tag: 'Type Safety' },
    { name: 'JavaScript', level: 'Expert', tag: 'ES6+ Engine' },
    { name: 'Tailwind CSS', level: 'Expert', tag: 'Styling' },
    { name: 'Material UI', level: 'Advanced', tag: 'Component UI' },
    { name: 'Ant Design', level: 'Advanced', tag: 'Design System' },
    { name: 'Redux Toolkit', level: 'Expert', tag: 'State Mgmt' },
  ];

  const backendAndDbSkills = [
    { name: 'Node.js', role: 'Runtime Environment', icon: Server },
    { name: 'Express.js', role: 'REST Microservices', icon: Cpu },
    { name: 'MongoDB', role: 'NoSQL & Aggregations', icon: Database },
    { name: 'MySQL', role: 'Relational Schema & SQL', icon: Database },
    { name: 'Server-Side Rendering', role: 'Next.js SSR & SEO', icon: Layers },
    { name: 'RESTful APIs', role: 'Contract & Middleware', icon: Server },
  ];

  const authAndIntegrations = [
    { name: 'JWT (JSON Web Tokens)', tag: 'Stateless Auth', desc: 'Secure token signing, refresh rotation & middleware' },
    { name: 'OAuth 2.0 (SSO)', tag: 'Federated Identity', desc: 'Third-party authorization (Google, GitHub)' },
    { name: 'OTP & MFA Auth', tag: '2-Factor Security', desc: 'Multi-factor login flows and SMS/Email verification' },
    { name: 'Payment Pipelines', tag: 'Transactional', desc: 'RazorPay & PayPal webhooks with idempotency' },
  ];

  const cloudSkills = [
    { name: 'EC2', category: 'Compute' },
    { name: 'S3', category: 'Storage' },
    { name: 'Amplify', category: 'Deployment' },
    { name: 'CloudFront', category: 'CDN' },
    { name: 'Route 53', category: 'DNS' },
    { name: 'WAF & Security', category: 'Firewall' },
    { name: 'CI/CD (GitHub Actions)', category: 'DevOps' },
    { name: 'Git & Gitflow', category: 'DevOps' },
  ];

  return (
    <section id="skills" className="relative py-24 bg-zinc-950 overflow-hidden" aria-label="Technical Skills and Fullstack Architecture">
      {/* Top Faded Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-cyan-500/5 glow-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Fullstack Technical Arsenal & Cloud Stack
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg">
            End-to-end expertise spanning modern React & Next.js UI systems, robust Node.js backend services, relational/NoSQL datastores, secure JWT/OAuth auth, and AWS cloud infrastructure.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* 1. Frontend & UI Systems Card (Span 2) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 glass-card p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="absolute -right-20 -top-20 w-48 h-48 bg-indigo-500/10 rounded-full glow-blur group-hover:bg-indigo-500/15 transition-colors" aria-hidden="true" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Code className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Frontend & UI Systems</h3>
                <p className="text-xs text-indigo-300 font-medium">React, Next.js (SSR), TypeScript, Tailwind & UI Frameworks</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              Crafting reactive, high-performance interfaces with React.js and Next.js SSR. Experienced building design-system scale components with Tailwind CSS, Material UI, and Ant Design with rigorous TypeScript typing.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {frontendSkills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-zinc-900/60 border border-zinc-800 hover:border-indigo-500/30 p-3.5 rounded-2xl flex flex-col justify-between transition-all group/item"
                >
                  <span className="text-sm font-semibold text-white group-hover/item:text-indigo-300 transition-colors">
                    {skill.name}
                  </span>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">
                      {skill.level}
                    </span>
                    <span className="text-[9px] font-semibold text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded">
                      {skill.tag}
                    </span>
                  </div>
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
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-indigo-500 to-cyan-500" aria-hidden="true" />
            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-cyan-500/10 rounded-full glow-blur" aria-hidden="true" />

            <div className="z-10 flex flex-col justify-between h-full w-full">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="px-3 py-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full uppercase tracking-wider">
                    Verified Credential
                  </span>
                </div>

                {/* Credly Badge Embed with lazy loading & layout preservation */}
                <div className="flex justify-center mb-6 min-h-[270px] w-full">
                  <iframe
                    src="https://www.credly.com/embedded_badge/da73f66c-5901-455c-a2c6-0748ee3e55af"
                    width="300"
                    height="300"
                    title="AWS Certified Cloud Practitioner Credly Verification Badge"
                    loading="lazy"
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
                  <p className="text-xs text-zinc-400 mt-1 font-medium">
                    Amazon Web Services (AWS)
                  </p>
                </div>

                <div className="space-y-3.5 mb-8">
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>Cloud Native Backend & Hosting</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>AWS Global Infrastructure & CDN</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>Security, Auth & Compliance Audits</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium justify-center">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
                    <span>Database Scaling & Cost Optimization</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="z-10 mt-auto">
              <a
                href="https://www.credly.com/badges/da73f66c-5901-455c-a2c6-0748ee3e55af/public_url"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-white hover:border-zinc-700 font-semibold text-sm transition-all"
                aria-label="Verify AWS Cloud Practitioner Credential on Credly (opens in new tab)"
              >
                <span>Verify Credential</span>
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* 3. Backend, APIs & Databases Card (Span 1) */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="absolute -right-20 -bottom-20 w-36 h-36 bg-cyan-500/10 rounded-full glow-blur" aria-hidden="true" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <Server className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Backend & Databases</h3>
                <p className="text-xs text-cyan-300 font-medium">Node.js, Express, MongoDB, MySQL & SSR</p>
              </div>
            </div>

            <div className="space-y-3.5">
              {backendAndDbSkills.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-zinc-900/60 last:border-0">
                    <div className="flex items-center gap-3">
                      <IconComponent className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors shrink-0" aria-hidden="true" />
                      <span className="text-sm font-medium text-zinc-200">{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-semibold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                      {skill.role}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* 4. Authentication, Security & Payments Card (Span 1) */}
          <motion.div
            variants={cardVariants}
            className="glass-card p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-purple-500/10 rounded-full glow-blur" aria-hidden="true" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-purple-500/10 text-purple-400 rounded-xl">
                <Shield className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Auth & Security</h3>
                <p className="text-xs text-purple-300 font-medium">JWT, OAuth 2.0, OTP & Gateways</p>
              </div>
            </div>

            <div className="space-y-3">
              {authAndIntegrations.map((item, index) => (
                <div key={index} className="p-3 bg-zinc-900/40 border border-zinc-800/70 rounded-xl">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    <span className="text-[9px] font-bold text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 5. Cloud Deployments & DevOps Card (Span 2) */}
          <motion.div
            variants={cardVariants}
            className="md:col-span-2 glass-card p-8 rounded-3xl border border-zinc-800/40 relative overflow-hidden group hover:border-zinc-700/50 transition-all duration-300"
          >
            <div className="absolute -left-10 -bottom-10 w-44 h-44 bg-cyan-500/10 rounded-full glow-blur" aria-hidden="true" />

            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-cyan-500/10 text-cyan-400 rounded-xl">
                <Cloud className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Cloud Infrastructure & DevOps</h3>
                <p className="text-xs text-cyan-300 font-medium">AWS Deployment, CDN Acceleration & CI/CD Pipelines</p>
              </div>
            </div>

            <p className="text-sm text-zinc-300 mb-6 leading-relaxed">
              Deploying production fullstack architectures on AWS with auto-scaling compute (EC2), scalable storage (S3), global low-latency CDN distribution (CloudFront), secure DNS routing (Route 53), and automated deployment pipelines via GitHub Actions.
            </p>

            <div className="flex flex-wrap gap-2.5">
              {cloudSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3.5 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl flex items-center gap-2 hover:border-zinc-700 hover:bg-zinc-900/80 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" aria-hidden="true" />
                  <span className="text-sm font-semibold text-zinc-200">{skill.name}</span>
                  <span className="text-[9px] font-bold text-zinc-400 bg-zinc-950/80 px-2 py-0.5 rounded border border-zinc-800">
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

