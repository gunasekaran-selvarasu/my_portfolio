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
      role: 'Senior Software Engineer (Frontend)',
      company: 'Doodleblue Innovations',
      period: 'Jun 2025 – Apr 2026',
      location: 'Chennai, India',
      summary: 'Led frontend development squads to establish standardized, performant frontend patterns and scalable component designs.',
      bullets: [
        'Headed frontend squads, mentoring developers and implementing strict TypeScript + ESLint code quality practices.',
        'Established modular React + TS enterprise web architectures, driving reusability and boosting development cycle velocity by 30%.',
        'Engineered high-performance REST API integrations with comprehensive Axios middleware, request caching, and error boundary handling.',
        'Spearheaded modern state management pipelines using Redux Toolkit to sync real-time data flows seamlessly across views.'
      ],
      tech: ['React.js', 'TypeScript', 'Redux Toolkit', 'Axios', 'Tailwind CSS', 'ESLint', 'REST APIs']
    },
    {
      role: 'Software Developer (Frontend)',
      company: 'W2S Solutions',
      period: 'Jan 2024 – May 2025',
      location: 'Chennai, India',
      summary: 'Engineered cloud-native client applications, focusing heavily on cloud configuration, DevOps integrations, and SaaS architecture.',
      bullets: [
        'Developed full-featured, cloud-native web applications for complex enterprise SaaS clients using React and Next.js.',
        'Optimized AWS cloud infrastructure setups (S3 bucket configurations, CloudFront caching layers, EC2 provisioning) reducing hosting cost metrics.',
        'Integrated automated CI/CD workflows utilizing GitHub Actions for rapid deployments, reducing release cycles down to minutes.',
        'Architected high-traffic databases and layouts, supporting multi-tenancy auth strategies and custom user permissions.'
      ],
      tech: ['React.js', 'Next.js', 'AWS', 'S3', 'CloudFront', 'EC2', 'GitHub Actions', 'CI/CD', 'TypeScript']
    },
    {
      role: 'Senior Programmer Analyst',
      company: 'Genxlead Solutions',
      period: 'Nov 2023 – Dec 2023',
      location: 'Chennai, India',
      summary: 'Provided fast-paced technical consulting and cloud solutions for rapid business milestone executions.',
      bullets: [
        'Executed client consultations to identify product bottlenecks and establish immediate feature delivery plans.',
        'Leveraged AWS cloud configurations (including Route 53 routing tables and Amplify deployments) to decrease latency metrics.',
        'Refactored legacy vanilla JS modules into modern, typed TypeScript structures to improve long-term code stability.'
      ],
      tech: ['TypeScript', 'AWS Amplify', 'Route 53', 'JavaScript', 'HTML5', 'CSS3', 'Web Performance']
    },
    {
      role: 'Programmer Analyst',
      company: 'Touchmark Descience',
      period: 'Aug 2020 – Aug 2023',
      location: 'Chennai, India',
      summary: 'Delivered multiple customer-facing applications, engineered end-to-end payment structures, and achieved critical speed optimizations.',
      bullets: [
        '3-year tenure delivering React/Next.js client applications, ensuring high accessibility (a11y) standards and responsive scaling.',
        'Configured multi-tier AWS deployments including Route 53 domain mappings, S3 static assets, and basic AWS WAF firewalls.',
        'Achieved a 35%+ average performance boost on core web vitals through bundle analysis, image optimization, and lazy loading.',
        'Integrated multi-currency payment checkouts (RazorPay and PayPal) with backend webhooks for secure transactional validation.'
      ],
      tech: ['React.js', 'Next.js', 'Tailwind CSS', 'AWS', 'RazorPay', 'PayPal', 'Route 53', 'S3', 'AWS WAF', 'Web Vitals']
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
            5+ years of driving web performance, organizing clean architectures, and deploying cloud systems.
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
