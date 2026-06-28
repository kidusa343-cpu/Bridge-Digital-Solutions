import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { useGetProject, getGetProjectQueryKey } from "@/lib/api-hooks";
import { ArrowLeft, Play, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const { data: project, isLoading } = useGetProject(projectId, {
    query: { enabled: !!projectId, queryKey: getGetProjectQueryKey(projectId) },
  });

  const tags: string[] = (() => {
    try { return JSON.parse(project?.tags ?? "[]"); } catch { return []; }
  })();

  const imageUrls: string[] = (() => {
    try { return JSON.parse(project?.imageUrls ?? "[]"); } catch { return []; }
  })();

  const videoUrl = (project as any)?.videoUrl as string | undefined;
  const isMedia = project?.category === "Promotion & Media";
  const shouldPreserveVideoAspect = ["aksan-glass", "gift-real-estate", "new-life-dental-clinic"].includes(
    (project?.slug ?? "").toLowerCase().replace(/\s+/g, "-")
  );

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <Skeleton className="h-8 w-32 mb-16" />
          <Skeleton className="h-[55vh] w-full mb-12" />
          <Skeleton className="h-16 w-2/3 mb-6" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="w-full pt-32 pb-24 text-center">
        <p className="text-muted-foreground">Project not found.</p>
        <Link href="/projects" className="text-primary mt-4 block">Back to Projects</Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Back link */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/projects" className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-12 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>All Projects</span>
          </Link>
        </motion.div>

        {/* Hero section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-4 mb-5">
            {project.category && (
              <span className={`text-xs tracking-widest uppercase px-3 py-1 ${
                isMedia ? "bg-primary/20 text-primary border border-primary/30" : "border border-border/50 text-muted-foreground"
              }`}>{project.category}</span>
            )}
            {project.year && <span className="text-sm text-muted-foreground">{project.year}</span>}
          </div>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl leading-tight mb-5">{project.title}</h1>
          {project.client && (
            <p className="text-muted-foreground text-lg">Client: <span className="text-foreground">{project.client}</span></p>
          )}
        </motion.div>

        {/* Primary visual — video or image */}
        {videoUrl && isMedia ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className={`w-full aspect-[16/9] mb-16 bg-black relative group ${shouldPreserveVideoAspect ? "overflow-visible" : "overflow-hidden"}`}
          >
            {!videoPlaying ? (
              <>
                <img
                  src={project.coverImageUrl ?? "/images/proj-sw-1.png"}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => setVideoPlaying(true)}
                    className="w-20 h-20 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/25 transition-all duration-300 group-hover:scale-105"
                    data-testid="button-play-video"
                  >
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 text-white/60 text-xs tracking-widest uppercase">
                  Campaign Video
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black">
                <video
                  src={videoUrl}
                  className={`w-full h-full ${shouldPreserveVideoAspect ? "object-contain" : "object-cover"}`}
                  controls
                  autoPlay
                  muted
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15 }}
            className="w-full aspect-[16/9] overflow-hidden mb-16 bg-muted"
          >
            <img
              src={project.coverImageUrl ?? "/images/proj-sw-1.png"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">{project.description}</p>
            {project.content && (
              <div className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line space-y-4">
                {project.content}
              </div>
            )}

            {/* Additional images for media projects */}
            {isMedia && imageUrls.length > 1 && (
              <div className="mt-12 grid grid-cols-2 gap-4">
                {imageUrls.slice(1).map((url, idx) => (
                  <div key={idx} className="aspect-[4/3] overflow-hidden bg-muted">
                    <img src={url} alt={`${project.title} — ${idx + 2}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}

            {/* Video embed for media projects (below content if not played above) */}
            {videoUrl && isMedia && !videoPlaying && (
              <div className="mt-12">
                <h3 className="font-serif text-2xl mb-6">Campaign Video</h3>
                <div className="aspect-[16/9] overflow-hidden bg-black relative group cursor-pointer" onClick={() => setVideoPlaying(true)}>
                  <img src={project.coverImageUrl ?? ""} alt="" className="w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/25 transition-all">
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-3 lg:col-start-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="border-t border-border/50 pt-8 space-y-8 sticky top-32">
              {project.client && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Client</div>
                  <div className="text-sm font-medium">{project.client}</div>
                </div>
              )}
              {project.year && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Year</div>
                  <div className="text-sm">{project.year}</div>
                </div>
              )}
              {project.category && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Category</div>
                  <div className="text-sm">{project.category}</div>
                </div>
              )}
              {tags.length > 0 && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Technologies</div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="text-xs border border-border/50 px-2 py-1 text-muted-foreground hover:border-primary/40 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div className="pt-4 border-t border-border/50">
                <Link
                  href="/projects"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Back to all projects</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
