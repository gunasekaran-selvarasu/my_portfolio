import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Tag, Cpu, ShoppingBag, LayoutDashboard } from 'lucide-react';

const getProjectIcon = (category: string) => {
  switch (category) {
    case 'Wordpress':
      return (
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-indigo-400">
          <path d="M12.158 12.786l-2.698 7.84a9.755 9.755 0 01-5.02-3.125l5.228-15.02a9.664 9.664 0 012.49 10.305zm1.155-7.391a6.666 6.666 0 00-2.317.426 3.09 3.09 0 00-1.83 2.808c0 1.258.625 2.115 1.288 3.126.74 1.127 1.54 2.348 1.54 4.298 0 1.636-.593 2.923-1.185 4.195l5.37-15.63a9.712 9.712 0 011.666 5.565c0 3.064-.972 5.617-2.42 7.755l-2.112-6.553c1.285-.386 2.21-1.396 2.21-2.906 0-1.57-.996-2.58-2.21-2.58zm-1.281 18.256c-.01.002-.02.003-.032.005a9.719 9.719 0 01-6.17-2.235l3.292-9.068 2.91 9.298zm7.158-4.945c1.173-1.897 1.81-4.108 1.81-6.356a9.75 9.75 0 00-.73-3.69l-3.328 9.68 2.248.366zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S17.627 0 12 0z"/>
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4.5 h-4.5 fill-none stroke-indigo-400" strokeWidth="1.5">
          <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
          <g stroke="currentColor" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'Next.js / SaaS':
      return (
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-indigo-400">
          <path d="M18.665 21.417L8.98 9.006v12.411H6.18V2.583h2.802l9.683 12.41V2.583h2.8v18.834h-2.802zM12 0a12 12 0 1012 12A12.014 12.014 0 0012 0z"/>
        </svg>
      );
    case 'Laravel':
      return (
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-none stroke-indigo-400" strokeWidth="1.5">
          <path d="M8.28 2.058l9.043 5.221v10.442l-9.043 5.221-9.043-5.221V7.279l9.043-5.221zm0 2.31L2.279 8.35v7.298l6.001 3.983 6.001-3.983V8.35L8.28 4.368z" />
          <path d="M8.28 2.058v10.373M17.323 7.279L8.28 12.431 2.279 7.279" />
        </svg>
      );
    case 'E-Commerce':
      return <ShoppingBag className="w-4.5 h-4.5 text-indigo-400" />;
    case 'Dashboards':
      return <LayoutDashboard className="w-4.5 h-4.5 text-indigo-400" />;
    default:
      return <Tag className="w-4.5 h-4.5 text-indigo-400" />;
  }
};

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
      title: 'RadPrix E-Commerce',
      category: 'E-Commerce',
      description: 'A premium, high-availability fashion storefront featuring automated inventory synchronization, smart search, and optimized checkout flow.',
      architecture: 'Powered by Next.js Server Components, Tailwind CSS styling, and auto-scaling EC2 instances. Configured CloudFront CDN for global caching.',
      tags: ['Next.js', 'React.js', 'Tailwind CSS', 'AWS EC2', 'RazorPay', 'PayPal'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: 'https://radprix.com'
    },
    {
      title: 'Velaan Mandi B2B',
      category: 'E-Commerce',
      description: 'Agricultural digital marketplace connecting local farming communities directly with wholesale vendors, providing real-time pricing indicators and regional demand metrics.',
      architecture: 'Engineered using server-side rendering for optimal dynamic catalog loading. Backed by scalable relational databases and highly secure transaction processors.',
      tags: ['Next.js', 'React.js', 'Tailwind CSS', 'RazorPay', 'Serverless APIs'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: '#'
    },
    {
      title: 'Sofa33 Customizer',
      category: 'E-Commerce',
      description: 'Interactive high-end home furnishing store featuring virtual customization logic, smart freight estimates, and responsive 3D model product previews.',
      architecture: 'Assembled utilizing responsive React states and optimized graphic content pipelines to deliver high-quality visual representation with low latency.',
      tags: ['Next.js', 'React.js', 'Tailwind CSS', 'AWS S3', 'Redis', 'PayPal'],
      github: 'https://github.com/gunasekaran-selvarasu/',
      demo: '#'
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
    <section id="projects" className="relative py-24 bg-zinc-950 overflow-hidden">
      {/* Top Faded Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" />
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
                <div className="relative p-6 pb-4 bg-zinc-900/10 flex items-start justify-between">
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight pt-2 leading-tight group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="p-2.5 bg-zinc-900/60 border border-zinc-850 rounded-xl text-zinc-500 shrink-0">
                    {getProjectIcon(project.category)}
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
                <div className="relative p-6 pt-4 flex items-center justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                    aria-label={`View GitHub source code for ${project.title}`}
                  >
                    <Github className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    aria-label={`View live demo of ${project.title}`}
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
