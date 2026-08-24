export function SkillsSkeleton() {
  return (
    <section id="skills" className="relative py-24 bg-zinc-950 overflow-hidden min-h-[650px]" aria-label="Loading Skills">
      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-pulse">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="h-10 w-96 max-w-full bg-zinc-800/60 rounded-xl mx-auto" />
          <div className="h-4 w-80 max-w-full bg-zinc-800/40 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass-card p-8 rounded-3xl border border-zinc-800/40 h-80 bg-zinc-900/30" />
          <div className="md:row-span-2 glass-card p-8 rounded-3xl border border-zinc-800/40 h-[500px] bg-zinc-900/30" />
          <div className="glass-card p-8 rounded-3xl border border-zinc-800/40 h-64 bg-zinc-900/30" />
          <div className="glass-card p-8 rounded-3xl border border-zinc-800/40 h-64 bg-zinc-900/30" />
        </div>
      </div>
    </section>
  );
}

export function ExperienceSkeleton() {
  return (
    <section id="experience" className="relative py-24 bg-zinc-950/60 overflow-hidden min-h-[600px]" aria-label="Loading Experience">
      <div className="max-w-4xl mx-auto px-6 relative z-10 animate-pulse">
        <div className="text-center mb-16 space-y-4">
          <div className="h-10 w-80 bg-zinc-800/60 rounded-xl mx-auto" />
          <div className="h-4 w-96 max-w-full bg-zinc-800/40 rounded mx-auto" />
        </div>
        <div className="border-l-2 border-zinc-800 ml-4 md:ml-6 pl-8 md:pl-10 space-y-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 rounded-2xl border border-zinc-800/40 space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 w-48 bg-zinc-800/70 rounded" />
                <div className="h-5 w-24 bg-zinc-800/50 rounded-full" />
              </div>
              <div className="h-4 w-32 bg-zinc-800/40 rounded" />
              <div className="h-12 w-full bg-zinc-800/30 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProjectsSkeleton() {
  return (
    <section id="projects" className="relative py-24 bg-zinc-950 overflow-hidden min-h-[750px]" aria-label="Loading Projects">
      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-pulse">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="h-10 w-96 max-w-full bg-zinc-800/60 rounded-xl mx-auto" />
          <div className="h-4 w-80 max-w-full bg-zinc-800/40 rounded mx-auto" />
        </div>
        <div className="flex justify-center mb-12">
          <div className="h-12 w-96 max-w-full bg-zinc-900/60 border border-zinc-800/80 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-card rounded-2xl border border-zinc-800/40 p-6 space-y-4 h-80">
              <div className="h-6 w-3/4 bg-zinc-800/70 rounded" />
              <div className="h-16 w-full bg-zinc-800/30 rounded" />
              <div className="h-8 w-full bg-zinc-800/20 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EducationSkeleton() {
  return (
    <section id="cloud" className="relative py-24 bg-zinc-950/60 overflow-hidden min-h-[500px]" aria-label="Loading Education">
      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-pulse">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-6">
            <div className="h-10 w-72 bg-zinc-800/60 rounded-xl" />
            <div className="space-y-4">
              <div className="glass-card p-6 rounded-2xl border border-zinc-800/40 h-36" />
              <div className="glass-card p-6 rounded-2xl border border-zinc-800/40 h-36" />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <div className="h-10 w-80 bg-zinc-800/60 rounded-xl" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="glass-card p-6 rounded-2xl border border-zinc-800/40 h-32" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ContactSkeleton() {
  return (
    <section id="contact" className="relative py-24 bg-zinc-950 overflow-hidden min-h-[600px]" aria-label="Loading Contact">
      <div className="max-w-7xl mx-auto px-6 relative z-10 animate-pulse">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="h-10 w-64 bg-zinc-800/60 rounded-xl mx-auto" />
          <div className="h-4 w-96 max-w-full bg-zinc-800/40 rounded mx-auto" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
          <div className="lg:col-span-5 space-y-4">
            <div className="glass-card p-5 rounded-2xl border border-zinc-800/40 h-20" />
            <div className="glass-card p-5 rounded-2xl border border-zinc-800/40 h-20" />
            <div className="glass-card p-5 rounded-2xl border border-zinc-800/40 h-20" />
          </div>
          <div className="lg:col-span-7">
            <div className="glass-card p-8 rounded-3xl border border-zinc-800/40 h-96" />
          </div>
        </div>
      </div>
    </section>
  );
}
