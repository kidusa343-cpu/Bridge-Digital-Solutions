import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { useGetCaseStudy, getGetCaseStudyQueryKey } from "@/lib/api-hooks";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CaseStudyDetail() {
  const { id } = useParams<{ id: string }>();
  const csId = Number(id);
  const { data: cs, isLoading } = useGetCaseStudy(csId, {
    query: { enabled: !!csId, queryKey: getGetCaseStudyQueryKey(csId) },
  });

  const metrics: Array<{ label: string; value: string }> = (() => {
    try { return JSON.parse(cs?.metrics ?? "[]"); } catch { return []; }
  })();

  const tags: string[] = (() => {
    try { return JSON.parse(cs?.tags ?? "[]"); } catch { return []; }
  })();

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <Skeleton className="h-8 w-32 mb-16" />
          <Skeleton className="h-16 w-2/3 mb-12" />
          <div className="grid grid-cols-3 gap-6 mb-16">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-24" />)}
          </div>
        </div>
      </div>
    );
  }

  if (!cs) {
    return (
      <div className="w-full pt-32 pb-24 text-center">
        <p className="text-muted-foreground">Case study not found.</p>
        <Link href="/case-studies" className="text-primary mt-4 block">Back to Case Studies</Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/case-studies" className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-16 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>All Case Studies</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16"
        >
          {cs.industry && <div className="text-sm tracking-widest uppercase text-primary mb-6">{cs.industry}</div>}
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">{cs.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{cs.summary}</p>
        </motion.div>

        {metrics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-px bg-border/30 mb-24"
          >
            {metrics.map((m, i) => (
              <div key={i} className="bg-background p-8">
                <div className="font-serif text-4xl md:text-5xl font-light mb-2">{m.value}</div>
                <div className="text-sm text-muted-foreground">{m.label}</div>
              </div>
            ))}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            {[
              { label: "The Challenge", content: cs.challenge },
              { label: "Our Approach", content: cs.solution },
              { label: "The Outcome", content: cs.outcome },
            ].map(({ label, content }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <h2 className="font-serif text-2xl mb-6 text-primary">{label}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{content}</p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-3 lg:col-start-10">
            <div className="border-t border-border/50 pt-8 space-y-6 sticky top-32">
              {cs.client && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Client</div>
                  <div className="text-sm">{cs.client}</div>
                </div>
              )}
              {cs.duration && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-1">Duration</div>
                  <div className="text-sm">{cs.duration}</div>
                </div>
              )}
              {tags.length > 0 && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-2">Tags</div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <span key={tag} className="text-xs border border-border/50 px-2 py-1 text-muted-foreground">{tag}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
