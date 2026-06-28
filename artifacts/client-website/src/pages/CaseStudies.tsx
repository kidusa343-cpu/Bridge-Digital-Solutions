import { motion } from "framer-motion";
import { Link } from "wouter";
import { useListCaseStudies } from "@/lib/api-hooks";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function CaseStudies() {
  const { data: caseStudies, isLoading } = useListCaseStudies();
  const featured = (caseStudies ?? []).filter(cs => cs.featured);
  const rest = (caseStudies ?? []).filter(cs => !cs.featured);

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <div className="text-sm tracking-widest uppercase text-primary mb-6">Case Studies</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Proof of Work</h1>
          <p className="text-xl text-muted-foreground font-light">
            The outcomes we help our clients achieve — in their own numbers.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-12">
            {[1, 2].map(i => <Skeleton key={i} className="h-64 w-full" />)}
          </div>
        ) : (
          <>
            {featured.map((cs, i) => {
              const metrics: Array<{ label: string; value: string }> = (() => {
                try { return JSON.parse(cs.metrics ?? "[]"); } catch { return []; }
              })();
              return (
                <motion.div
                  key={cs.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.9 }}
                  className="mb-24"
                  data-testid={`card-case-study-${cs.id}`}
                >
                  <Link href={`/case-studies/${cs.id}`} className="group block">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 border-t border-border/50 pt-12">
                      <div className="lg:col-span-7">
                        {cs.industry && <div className="text-sm tracking-widest uppercase text-primary mb-4">{cs.industry}</div>}
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight mb-6 group-hover:text-primary transition-colors duration-300">{cs.title}</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{cs.summary}</p>
                        <div className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest">
                          <span>Read Case Study</span>
                          <ArrowRight className="w-4 h-4 -translate-x-1 group-hover:translate-x-0 transition-transform duration-300" />
                        </div>
                      </div>
                      {metrics.length > 0 && (
                        <div className="lg:col-span-4 lg:col-start-9">
                          <div className="grid grid-cols-1 gap-6">
                            {metrics.map((m, mi) => (
                              <div key={mi} className="border-l-2 border-primary pl-4">
                                <div className="font-serif text-3xl font-light mb-1">{m.value}</div>
                                <div className="text-sm text-muted-foreground">{m.label}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              );
            })}

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border/50 pt-16">
                {rest.map((cs, i) => (
                  <motion.div
                    key={cs.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.7 }}
                    data-testid={`card-case-study-${cs.id}`}
                  >
                    <Link href={`/case-studies/${cs.id}`} className="group block">
                      {cs.industry && <div className="text-xs tracking-widest uppercase text-primary mb-3">{cs.industry}</div>}
                      <h3 className="font-serif text-2xl mb-4 group-hover:text-primary transition-colors">{cs.title}</h3>
                      <p className="text-muted-foreground line-clamp-3">{cs.summary}</p>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
