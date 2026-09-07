import { useState } from 'react';
import { m as motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

interface Position {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  tech: string[];
}

export default function Experience() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const experiences: Position[] = [
    {
      role: 'Senior Software Engineer',
      company: 'Doodleblue Innovations',
      period: 'Jun 2025 – Apr 2026',
      location: 'Chennai, India',
      summary: 'Led engineering squads delivering fullstack TypeScript web applications, scalable Node.js/Express REST microservices, and modular React/Ant Design frontends.',
      bullets: [
        'Headed full-stack squads, mentoring engineers on end-to-end TypeScript, Node.js API best practices, and clean architecture.',
        'Designed and integrated resilient RESTful microservices using Node.js, Express, and MongoDB, optimizing database querying and data pipelines.',
        'Implemented secure stateless authentication using JWT and OAuth 2.0 with automated token refresh cycles and role-based permissions.',
        'Established modular React + TS enterprise architectures using Ant Design & Tailwind CSS, boosting development cycle velocity by 30%.',
        'Spearheaded state management pipelines using Redux Toolkit to seamlessly synchronize real-time data flows between client and backend.'
      ],
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'TypeScript', 'Redux Toolkit', 'Ant Design', 'Tailwind CSS', 'JWT', 'REST APIs']
    },
    {
      role: 'Software Developer',
      company: 'W2S Solutions',
      period: 'Jan 2024 – May 2025',
      location: 'Chennai, India',
      summary: 'Engineered cloud-native full-stack client and server applications, focusing on Next.js SSR, MySQL database schemas, and automated AWS DevOps pipelines.',
      bullets: [
        'Architected full-featured cloud SaaS applications using Next.js (SSR / Server Components) and Node.js backend services.',
        'Designed high-traffic relational MySQL database schemas, indexing strategies, and multi-tenancy auth flows with secure JWT session management.',
        'Optimized AWS cloud infrastructure (S3 bucket configurations, CloudFront CDN caching, EC2 provisioning) reducing hosting cost metrics.',
        'Integrated automated CI/CD workflows utilizing GitHub Actions for rapid deployments, reducing release cycles down to minutes.'
      ],
      tech: ['Next.js', 'React.js', 'Node.js', 'MySQL', 'MongoDB', 'AWS', 'EC2', 'S3', 'GitHub Actions', 'JWT', 'SSR']
    },
    {
      role: 'Senior Programmer Analyst',
      company: 'Genxlead Solutions',
      period: 'Nov 2023 – Dec 2023',
      location: 'Chennai, India',
      summary: 'Provided fast-paced full-stack technical consulting, database migrations, and cloud solutions for rapid business milestone executions.',
      bullets: [
        'Executed client consultations to identify system bottlenecks and establish immediate full-stack feature delivery plans.',
        'Refactored legacy backend routes and frontend scripts into modern, typed TypeScript and modular REST API services.',
        'Leveraged AWS cloud configurations (including Route 53 routing tables and Amplify deployments) to decrease latency metrics.'
      ],
      tech: ['TypeScript', 'Node.js', 'JavaScript', 'AWS Amplify', 'Route 53', 'REST APIs', 'MySQL']
    },
    {
      role: 'Programmer Analyst',
      company: 'Touchmark Descience',
      period: 'Aug 2020 – Aug 2023',
      location: 'Chennai, India',
      summary: 'Delivered multiple full-stack client platforms, engineered transactional payment pipelines, and achieved critical performance optimizations.',
      bullets: [
        '3-year tenure delivering end-to-end React/Node.js web applications, ensuring high accessibility (a11y) standards and responsive scaling with Material UI and Tailwind CSS.',
        'Integrated multi-currency payment checkouts (RazorPay and PayPal) with backend webhooks for secure transactional validation and database logging.',
        'Configured multi-tier AWS deployments including Route 53 domain mappings, S3 static assets, and basic AWS WAF firewalls.',
        'Achieved a 35%+ average performance boost on core web vitals through bundle analysis, database query indexing, and caching.'
      ],
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Material UI', 'Tailwind CSS', 'AWS', 'RazorPay', 'PayPal']
    }
  ];

  const toggleAccordion = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="relative py-24 bg-zinc-950/60 overflow-hidden" aria-label="Work Experience and Career History">
      {/* Top Faded Divider */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-800/80 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute bottom-0 right-10 w-[500px] h-[300px] rounded-full bg-indigo-500/5 glow-blur" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Professional Journey & Experience
          </h2>
          <p className="text-zinc-300 text-base sm:text-lg">
            5+ years of delivering end-to-end fullstack platforms, designing scalable Node.js/Express APIs, modeling databases, and orchestrating cloud systems.
          </p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-zinc-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-12">
          {experiences.map((exp, index) => {
            const isExpanded = expandedIndex === index;
            const contentId = `exp-content-${index}`;
            const headerId = `exp-header-${index}`;

            return (
              <div key={index} className="relative group">
                {/* Timeline Dot */}
                <div
                  className={`absolute -left-[44px] md:-left-[52px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isExpanded
                    ? 'bg-indigo-500 border-indigo-400 shadow-lg shadow-indigo-500/50 scale-110'
                    : 'bg-zinc-900 border-zinc-700 group-hover:border-zinc-500'
                    }`}
                  aria-hidden="true"
                >
                  <Briefcase className={`w-3.5 h-3.5 ${isExpanded ? 'text-white' : 'text-zinc-400'}`} />
                </div>

                {/* Experience Card */}
                <div
                  className={`glass-card rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded
                    ? 'border-indigo-500/30 bg-zinc-900/60 shadow-xl shadow-indigo-500/5'
                    : 'border-zinc-800/40 hover:border-zinc-700/60 hover:bg-zinc-900/20'
                    }`}
                >
                  {/* Header Row (Accessible Toggle) */}
                  <button
                    id={headerId}
                    type="button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={isExpanded}
                    aria-controls={contentId}
                    className="w-full text-left p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {exp.role}
                        </h3>
                      </div>
                      <p className="text-sm font-semibold text-indigo-400">
                        {exp.company}
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs font-semibold text-zinc-400">
                      <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-800 shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" aria-hidden="true" />
                        {exp.location}
                      </span>
                      <span className="self-end md:self-auto p-1 text-zinc-400 group-hover:text-white bg-zinc-900/40 rounded-full border border-zinc-800">
                        {isExpanded ? <ChevronUp className="w-4 h-4" aria-hidden="true" /> : <ChevronDown className="w-4 h-4" aria-hidden="true" />}
                      </span>
                    </div>
                  </button>

                  {/* Summary / Expandable Area */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        id={contentId}
                        role="region"
                        aria-labelledby={headerId}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                      >
                        <div className="relative px-6 pb-6 pt-2 space-y-4">
                          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
                          <p className="text-sm text-zinc-300 leading-relaxed italic">
                            {exp.summary}
                          </p>

                          <ul className="space-y-2.5">
                            {exp.bullets.map((bullet, bIndex) => (
                              <li key={bIndex} className="text-sm text-zinc-300 leading-relaxed flex items-start gap-2.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-2" aria-hidden="true" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>

                          {/* Tech Stack Badges */}
                          <div className="relative pt-4">
                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden="true" />
                            <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-2">Technologies Used</span>
                            <div className="flex flex-wrap gap-2">
                              {exp.tech.map((t, tIndex) => (
                                <span
                                  key={tIndex}
                                  className="text-xs font-semibold px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-200"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
