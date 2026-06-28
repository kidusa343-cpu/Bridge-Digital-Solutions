import { motion } from "framer-motion";
import { useListServices } from "@/lib/api-hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { CheckCircle2, Code2, Film } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Film,
};

export default function Services() {
  const { data: services, isLoading } = useListServices();

  const active = (services ?? []).filter(s => s.active);

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <div className="text-sm tracking-widest uppercase text-primary mb-6">What We Do</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Our Services</h1>
          <p className="text-xl text-muted-foreground font-light leading-relaxed">
            Two core disciplines. One team. We build the systems that power your business and the content that grows your audience.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="space-y-24">
            <Skeleton className="h-80 w-full" />
            <Skeleton className="h-80 w-full" />
          </div>
        ) : (
          <div className="space-y-0">
            {active.map((service, i) => {
              const features: string[] = (() => {
                try { return JSON.parse(service.features ?? "[]"); } catch { return []; }
              })();
              const Icon = iconMap[service.iconName ?? ""] ?? Code2;
              const isEven = i % 2 === 0;

              return (
                <motion.section
                  key={service.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className={`border-t border-border/50 py-20 ${i > 0 ? "mt-0" : ""}`}
                  data-testid={`card-service-${service.id}`}
                  id={service.slug}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    {/* Title + description column */}
                    <div className={`lg:col-span-5 ${!isEven ? "lg:order-2" : ""}`}>
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-10 h-10 rounded-none border border-primary/30 flex items-center justify-center bg-primary/5">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-xs tracking-widest uppercase text-primary">
                          {i === 0 ? "Software" : "Media"}
                        </div>
                      </div>
                      <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">{service.title}</h2>
                      <p className="text-lg text-muted-foreground leading-relaxed mb-8">{service.description}</p>
                      {service.content && (
                        <p className="text-muted-foreground leading-relaxed text-base">{service.content}</p>
                      )}
                    </div>

                    {/* Sub-services list */}
                    <div className={`lg:col-span-6 ${!isEven ? "lg:col-start-1 lg:order-1" : "lg:col-start-7"}`}>
                      <div className="bg-secondary/20 border border-border/40 p-8 lg:p-10">
                        <div className="text-xs tracking-widest uppercase text-muted-foreground mb-8">
                          {features.length} Capabilities
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                          {features.map((feature, fi) => (
                            <li key={fi} className="flex items-start space-x-3">
                              <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-muted-foreground leading-snug">{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Cover image preview */}
                        {service.coverImageUrl && (
                          <div className="mt-8 aspect-[16/9] overflow-hidden">
                            <img
                              src={service.coverImageUrl}
                              alt={service.title}
                              className="w-full h-full object-cover opacity-70"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.section>
              );
            })}
            <div className="border-t border-border/50" />
          </div>
        )}
      </div>
    </div>
  );
}
