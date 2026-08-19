import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Tag, Cpu } from 'lucide-react';

interface Project {
  title: string;
  category: 'Next.js / SaaS' | 'E-Commerce' | 'Dashboards' | 'Laravel' | 'React' | 'Wordpress';
  description: string;
  architecture: string;
  tags: string[];
  github: string;
  demo: string;
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'Next.js / SaaS', 'E-Commerce', 'Dashboards', 'Laravel', 'React', 'Wordpress'];

  const projects: Project[] = [
    {
      title: 'Asian School of Business (ASB)',
      category: 'Next.js / SaaS',
      description: 'Enterprise educational platform supporting academic portals, dynamic course scheduling, and real-time student dashboards.',
      architecture: 'Robust Next.js app router structure synced with server-side rendered course catalogues, stateful client components, and security filters.',
      tags: ['Next.js', 'TypeScript', 'Redux Toolkit', 'REST APIs', 'Tailwind CSS'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: '#'
    },
    {
      title: 'Meii AI Platform',
      category: 'Dashboards',
      description: 'Sophisticated AI analytics dashboard displaying predictive charts, model metrics, and automated conversational prompts.',
      architecture: 'Developed with lightweight React components and custom Ant Design systems, boosting UI velocity by 40% using modular structures.',
      tags: ['React.js', 'TypeScript', 'Ant Design', 'AWS S3', 'Chart.js'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://meii.ai'
    },
    {
      title: 'E-Commerce Suite (RadPrix, Velaan Mandi, Sofa33)',
      category: 'E-Commerce',
      description: 'High-availability multi-tenant online storefronts serving automated billing systems, inventory, and cross-border currencies.',
      architecture: 'Powered by Next.js Server Components, Tailwind CSS styling, and auto-scaling EC2 instances. Configured CloudFront CDN for global caching.',
      tags: ['Next.js', 'React.js', 'Tailwind CSS', 'AWS EC2', 'RazorPay', 'PayPal'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://radprix.com'
    },
    {
      title: 'GS Audit Report System',
      category: 'Dashboards',
      description: 'Real-time auditing dashboard capturing system logs, generating comprehensive PDF files, and securing admin tasks.',
      architecture: 'Uses AWS Amplify for authentication processes, S3 for secure report storage, and OTP auth tokens. Rich charting utilizing Material UI.',
      tags: ['React.js', 'Material UI', 'Chart.js', 'AWS Amplify', 'AWS S3', 'OTP Auth'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: '#'
    },
    {
      title: 'Dgiverse Web Application',
      category: 'Next.js / SaaS',
      description: 'Fast-loading marketing and business portal engineered for high-speed search engine indexing and responsive scaling.',
      architecture: 'Next.js SSR architecture with static path generation, search optimized indexing headers, and custom Material UI layout setups.',
      tags: ['Next.js', 'Material UI', 'SSR Architecture', 'SEO Optimization', 'TypeScript'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://dgiverse.com'
    },
    {
      title: 'Tradewave International',
      category: 'Laravel',
      description: 'Global trading and import-export catalog portal supporting inquiry channels, products directory, and logistics checklists.',
      architecture: 'Built with Laravel MVC framework, PHP controllers, and relational MySQL schemas. Optimized for speed and local hosting.',
      tags: ['Laravel', 'PHP', 'MySQL', 'TailwindCSS', 'CPanel'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://tradewaveintl.com'
    },
    {
      title: 'Touchmark Descience',
      category: 'React',
      description: 'Interactive corporate portfolio website for a creative design agency, focusing on premium branding, smooth scroll dynamics, and responsive grid layouts.',
      architecture: 'Built with React.js, Custom CSS Animations, and Framer Motion. Engineered for low-latency graphics loading and high accessibility scores.',
      tags: ['React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://touchmarkdes.com'
    },
    {
      title: 'HireMe Platform',
      category: 'React',
      description: 'Custom recruitment and talent placement portal facilitating resumes indexing, vacancy updates, and candidate assessment pipelines.',
      architecture: 'React.js architecture styled with Tailwind CSS. Integrates responsive forms, client-side pagination, and clean modular structures.',
      tags: ['React.js', 'Tailwind CSS', 'TypeScript', 'Modular UI'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: '#'
    },
    {
      title: 'Origin Corporate Portal',
      category: 'React',
      description: 'Marketing and business consultation portal presenting service catalogs, contact forms, and client success metrics.',
      architecture: 'React client-side interface coupled with optimized asset bundles and clean typography to drive higher engagement rates.',
      tags: ['React.js', 'Tailwind CSS', 'Asset Optimization'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: '#'
    },
    {
      title: 'SriMurugan Hardwares',
      category: 'Wordpress',
      description: 'Comprehensive product catalog and corporate site for a large retail hardware and machinery merchant.',
      architecture: 'Custom WordPress configuration with optimized Elementor layouts, database query optimization, and localized search options.',
      tags: ['WordPress', 'PHP', 'MySQL', 'Elementor', 'SEO Caching'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://srimuruganhardwares.com/'
    },
    {
      title: 'Rupinis',
      category: 'Wordpress',
      description: 'Elegant corporate website for a premium beauty salon chain, detailing services catalogs, location mapping, and booking links.',
      architecture: 'WordPress child-theme customization, responsive typography, media loading optimizations, and localized SEO plugins.',
      tags: ['WordPress', 'PHP', 'Elementor', 'Responsive Grid'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://rupinis.com/'
    },
    {
      title: 'Raincentre',
      category: 'Wordpress',
      description: 'Information and resources hub for an environmental NGO specializing in rain-water harvesting initiatives and public education programs.',
      architecture: 'WordPress CMS structure, accessibility-focused grids, and optimized asset hosting to deliver low-bandwidth resources.',
      tags: ['WordPress', 'PHP', 'CMS', 'NGO Portal', 'SEO'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://raincentre.net/'
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="relative py-24 border-t border-zinc-900 bg-zinc-950 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-indigo-500/5 glow-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Featured Projects & Case Studies
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg">
            A curated list of enterprise software platforms, production-ready SaaS dashboards, and scalable e-commerce systems.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center items-center mb-12">
          <div className="flex flex-wrap gap-2 p-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl backdrop-blur-sm">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 ${activeFilter === filter
                  ? 'text-white'
                  : 'text-zinc-400 hover:text-zinc-250'
                  }`}
              >
                {activeFilter === filter && (
                  <motion.span
                    layoutId="activeFilterIndicator"
                    className="absolute inset-0 bg-indigo-500/85 rounded-xl -z-10 shadow-md shadow-indigo-500/20"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={project.title}
                className="glass-card rounded-2xl border border-zinc-800/40 hover:border-zinc-700/60 overflow-hidden flex flex-col justify-between group transition-all duration-300 shadow-md"
              >
                {/* Visual Header */}
                <div className="p-6 pb-4 border-b border-zinc-850/50 bg-zinc-900/10 flex items-start justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight pt-2 leading-tight group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="p-2.5 bg-zinc-900/60 border border-zinc-850 rounded-xl text-zinc-500 shrink-0">
                    <Tag className="w-4 h-4 text-indigo-400" />
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1">
                  <p className="text-sm text-zinc-350 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-900/80 flex gap-3">
                    <Cpu className="w-4.5 h-4.5 text-cyan-400 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-extrabold text-cyan-400 tracking-wider">Architecture Highlight</span>
                      <p className="text-[11px] leading-relaxed text-zinc-400 font-medium">
                        {project.architecture}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tech Tags */}
                <div className="px-6 pb-4 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-semibold text-zinc-450 bg-zinc-900/40 border border-zinc-850 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-4 border-t border-zinc-850/50 flex items-center justify-between">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
