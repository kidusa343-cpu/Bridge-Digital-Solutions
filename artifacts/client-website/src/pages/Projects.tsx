import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { useListProjects, getListProjectsQueryKey } from "@/lib/api-hooks";
import { ArrowRight, Play } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const CATEGORIES = ["All", "Software Development", "Promotion & Media"];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const queryCategory = activeCategory === "All" ? undefined : activeCategory;
  const { data: projects, isLoading } = useListProjects(
    queryCategory ? { category: queryCategory } : undefined,
    { query: { queryKey: getListProjectsQueryKey(queryCategory ? { category: queryCategory } : undefined) } }
  );

  const displayed = projects ?? [];

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-16"
        >
          <div className="text-sm tracking-widest uppercase text-primary mb-6">Portfolio</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-6">Our Work</h1>
          <p className="text-xl text-muted-foreground font-light">
            Software systems and media campaigns built for real results.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 mb-16">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              className={`text-sm tracking-widest uppercase px-6 py-2.5 border transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border/50 text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-72 w-full" />)}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20"
            >
              {displayed.map((project, i) => {
                const hasVideo = !!(project as any).videoUrl;
                const isMedia = project.category === "Promotion & Media";

                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.7 }}
                    data-testid={`card-project-${project.id}`}
                  >
                    <Link href={`/projects/${project.id}`} className="group block">
                      {/* Thumbnail */}
                      <div className="overflow-hidden aspect-[16/10] bg-muted mb-5 relative">
                        <img
                          src={project.coverImageUrl ?? "/images/proj-sw-1.png"}
                          alt={project.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-500" />
                        {/* Category badge */}
                        <div className={`absolute top-4 left-4 text-xs tracking-widest uppercase px-3 py-1 ${
                          isMedia ? "bg-primary/90 text-primary-foreground" : "bg-background/80 text-foreground"
                        } backdrop-blur-sm`}>
                          {isMedia ? "Promotion & Media" : "Software"}
                        </div>
                        {/* Video play indicator */}
                        {hasVideo && (
                          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                          </div>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-xs tracking-widest uppercase text-primary">{project.client}</div>
                            {project.year && <div className="text-xs text-muted-foreground">{project.year}</div>}
                          </div>
                          <h2 className="font-serif text-2xl md:text-3xl group-hover:text-primary transition-colors duration-300 leading-tight mb-3">
                            {project.title}
                          </h2>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">{project.description}</p>
                        </div>
                        <ArrowRight className="w-5 h-5 flex-shrink-0 mt-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}

        {!isLoading && displayed.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">No projects in this category yet.</div>
        )}
      </div>
    </div>
  );
}
