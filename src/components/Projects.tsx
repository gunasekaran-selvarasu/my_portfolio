import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Tag, Cpu, ShoppingBag, LayoutDashboard } from 'lucide-react';

const getProjectIcon = (category: string) => {
  switch (category) {
    case 'Wordpress':
      return (
        <svg viewBox="0 0 291.282 291.282" className="w-4.5 h-4.5 fill-indigo-400" aria-hidden="true" focusable="false">
          <path d="M0.013,145.641c0,57.627,33.502,107.479,82.088,131.039L12.63,86.358   C4.537,104.483,0.013,124.512,0.013,145.641z M243.974,138.285c0-17.998-6.482-30.479-12.017-40.166   c-7.374-11.999-14.284-22.149-14.284-34.157c0-13.392,10.123-25.845,24.471-25.845l1.866,0.127C218.101,14.511,183.58,0,145.672,0   C95.656,0,51.558,25.226,25.348,63.626c10.943,0.209,46.83,0.337,46.83,0.337c7.829-0.437,8.758,11.07,0.91,12.017   c0,0-7.875,0.919-16.66,1.384l53.047,157.74l31.872-95.58l-22.705-62.16c-7.838-0.473-15.267-1.384-15.267-1.384   c-7.857-0.473-6.928-12.454,0.938-12.017h77.181c7.82-0.437,8.758,11.07,0.91,12.017c0,0-7.875,0.919-16.66,1.384l52.638,156.529   l14.539-48.505C240.269,166.443,243.974,150.758,243.974,138.285z M148.221,158.386l-43.716,126.979   c13.046,3.842,26.829,5.917,41.158,5.917c16.942,0,33.219-2.931,48.359-8.266l-1.029-1.994L148.221,158.386z M273.443,75.752   c0.637,4.661,1.001,9.632,1.001,15.003c0,14.766-2.777,31.371-11.097,52.155l-44.472,128.599   c43.288-25.226,72.393-72.138,72.393-125.868C291.277,120.315,284.813,96.509,273.443,75.752z" />
        </svg>
      );
    case 'React':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" className="w-4.5 h-4.5 fill-none stroke-indigo-400" strokeWidth="1.5" aria-hidden="true" focusable="false">
          <circle cx="0" cy="0" r="2.05" fill="currentColor" />
          <g stroke="currentColor" fill="none">
            <ellipse rx="11" ry="4.2" />
            <ellipse rx="11" ry="4.2" transform="rotate(60)" />
            <ellipse rx="11" ry="4.2" transform="rotate(120)" />
          </g>
        </svg>
      );
    case 'Next.js / SaaS':
      return (
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-indigo-400" aria-hidden="true" focusable="false">
          <path d="M18.665 21.417L8.98 9.006v12.411H6.18V2.583h2.802l9.683 12.41V2.583h2.8v18.834h-2.802zM12 0a12 12 0 1012 12A12.014 12.014 0 0012 0z" />
        </svg>
      );
    case 'Laravel':
      return (
        <svg viewBox="0 0 64 64" className="w-5 h-5 fill-indigo-400" aria-hidden="true" focusable="false">
          <path fillRule="evenodd" clipRule="evenodd" d="M47.982 23.453c.012.044.018.089.018.134v7.071a.516.516 0 0 1-.26.448l-5.934 3.417v6.772a.517.517 0 0 1-.258.447L29.16 48.874c-.029.016-.06.026-.09.037-.012.004-.023.011-.035.015a.519.519 0 0 1-.264 0c-.015-.004-.027-.012-.041-.017-.028-.01-.058-.02-.085-.035l-12.386-7.132a.517.517 0 0 1-.259-.447V20.082c0-.046.006-.091.018-.135.004-.015.013-.028.018-.043.01-.027.019-.055.033-.08.01-.017.024-.03.035-.046.015-.02.029-.042.046-.06.015-.015.034-.026.051-.039.019-.015.035-.032.057-.044l6.194-3.566a.517.517 0 0 1 .515 0l6.194 3.566c.021.013.039.029.057.044.017.013.036.024.05.038.019.02.032.04.047.061.011.016.026.029.035.046.015.025.023.053.034.08.005.015.014.028.017.044a.52.52 0 0 1 .019.134v13.25l5.16-2.972v-6.773a.52.52 0 0 1 .019-.134c.004-.016.012-.03.018-.044.01-.027.019-.055.033-.08.01-.017.024-.03.035-.046.015-.02.028-.042.046-.06.015-.015.034-.025.05-.038.02-.016.037-.033.057-.045l6.195-3.566a.516.516 0 0 1 .515 0l6.194 3.566c.022.013.038.03.058.044.016.013.034.024.05.039.017.018.03.04.046.06.011.016.025.03.034.046.015.025.024.053.034.08.006.015.014.028.018.044zm-1.014 6.907v-5.88L44.8 25.728l-2.994 1.724v5.88l5.162-2.972zm-6.194 10.637v-5.884l-2.945 1.682-8.41 4.8v5.94l11.355-6.538zM17.032 20.975v20.022l11.355 6.537v-5.938l-5.932-3.357-.002-.002-.003-.001c-.02-.012-.036-.028-.055-.043-.016-.012-.035-.023-.049-.037l-.001-.002c-.017-.016-.029-.036-.043-.054-.013-.017-.028-.032-.038-.05l-.001-.002c-.012-.02-.019-.043-.027-.065-.009-.019-.02-.037-.025-.058-.006-.025-.007-.05-.01-.076-.003-.02-.008-.038-.008-.058V23.946L19.2 22.222l-2.168-1.247zm5.678-3.863-5.16 2.97 5.159 2.97 5.16-2.97-5.16-2.97h.001zm2.684 18.537 2.993-1.723V20.975l-2.167 1.247-2.994 1.724v12.951l2.168-1.248zM41.29 20.617l-5.16 2.97 5.16 2.97 5.158-2.97-5.158-2.97zm-.517 6.835-2.994-1.724-2.167-1.248v5.88l2.993 1.723 2.168 1.249v-5.88zm-11.872 13.25 7.568-4.32 3.783-2.16-5.156-2.968-5.936 3.418-5.41 3.115 5.151 2.915z" />
        </svg>
      );
    case 'E-Commerce':
      return <ShoppingBag className="w-4.5 h-4.5 text-indigo-400" aria-hidden="true" />;
    case 'Dashboards':
      return <LayoutDashboard className="w-4.5 h-4.5 text-indigo-400" aria-hidden="true" />;
    default:
      return <Tag className="w-4.5 h-4.5 text-indigo-400" aria-hidden="true" />;
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
    <section id="projects" className="relative py-24 bg-zinc-950 overflow-hidden" aria-label="Featured Projects & Case Studies">
      {/* Top Faded Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-indigo-500/5 glow-blur" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Featured Projects & Case Studies
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg">
            A curated list of enterprise software platforms, production-ready SaaS dashboards, and scalable e-commerce systems.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center items-center mb-12">
          <div 
            className="flex flex-wrap gap-2 p-1.5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl backdrop-blur-sm"
            role="toolbar"
            aria-label="Project categories filter"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
                className={`relative px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
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
                  <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight pt-2 leading-tight group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                  <span className="p-2.5 bg-zinc-900/60 border border-zinc-800 rounded-xl text-zinc-400 shrink-0">
                    {getProjectIcon(project.category)}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4 flex-1">
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="p-3.5 bg-zinc-950/80 rounded-xl border border-zinc-900/80 flex gap-3">
                    <Cpu className="w-4.5 h-4.5 text-cyan-400 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="space-y-0.5">
                      <span className="text-[10px] uppercase font-extrabold text-cyan-400 tracking-wider">Architecture Highlight</span>
                      <p className="text-[11px] leading-relaxed text-zinc-300 font-medium">
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
                      className="text-[11px] font-semibold text-zinc-300 bg-zinc-900/40 border border-zinc-800 px-2.5 py-1 rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Actions */}
                <div className="relative p-6 pt-4 flex items-center justify-between">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
                    aria-label={`View GitHub source code repository for ${project.title}`}
                  >
                    <Github className="w-4 h-4" aria-hidden="true" />
                    <span>Source Code</span>
                  </a>
                  {project.demo !== '#' ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                      aria-label={`View live demo of ${project.title} (opens in new tab)`}
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-zinc-500">Internal Enterprise</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
