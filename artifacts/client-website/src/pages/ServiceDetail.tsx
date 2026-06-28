import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { useGetService, getGetServiceQueryKey } from "@/lib/api-hooks";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const serviceId = Number(id);
  const { data: service, isLoading } = useGetService(serviceId, {
    query: { enabled: !!serviceId, queryKey: getGetServiceQueryKey(serviceId) },
  });

  const features: string[] = (() => {
    try { return JSON.parse(service?.features ?? "[]"); } catch { return []; }
  })();

  if (isLoading) {
    return (
      <div className="w-full pt-32 pb-24">
        <div className="container mx-auto px-6 md:px-12">
          <Skeleton className="h-8 w-32 mb-16" />
          <Skeleton className="h-20 w-2/3 mb-8" />
          <Skeleton className="h-40 w-full" />
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="w-full pt-32 pb-24 text-center">
        <p className="text-muted-foreground">Service not found.</p>
        <Link href="/services" className="text-primary mt-4 block">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/services" className="inline-flex items-center space-x-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-16 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>All Services</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-sm tracking-widest uppercase text-primary mb-6">Service</div>
            <h1 className="font-serif text-5xl md:text-6xl leading-tight mb-10">{service.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-10">{service.description}</p>
            {service.content && (
              <div className="text-muted-foreground leading-relaxed text-lg">
                {service.content}
              </div>
            )}
          </motion.div>

          <motion.div
            className="lg:col-span-4 lg:col-start-9"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {features.length > 0 && (
              <div className="border border-border/50 p-8">
                <h3 className="font-serif text-xl mb-6">What's Included</h3>
                <ul className="space-y-4">
                  {features.map((feature, i) => (
                    <li key={i} className="flex items-start space-x-3 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 border-t border-border/50 pt-8">
              <p className="text-muted-foreground text-sm mb-2">Want to see this in action?</p>
              <Link href="/projects" className="text-sm text-primary hover:underline underline-offset-4">
                View our project portfolio →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
