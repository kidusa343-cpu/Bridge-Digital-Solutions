import { motion } from "framer-motion";
import { Link } from "wouter";
import { useGetCompany, useListProjects, useListServices } from "@/lib/api-hooks";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: company, isLoading: companyLoading } = useGetCompany();
  const { data: projects } = useListProjects({ featured: "true" } as any);
  const { data: services } = useListServices();

  const featuredProjects = projects?.slice(0, 3) || [];
  const topServices = services?.filter(s => s.active).slice(0, 4) || [];

  if (companyLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Skeleton className="w-64 h-12" />
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero.png"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30 grayscale-[20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <div className="text-sm tracking-widest uppercase text-primary mb-8">
              Software · Architecture · Social Media · Multimedia
            </div>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-tight mb-8">
              {company?.tagline || "Engineering clarity. Delivering scale."}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mb-12 font-light">
              {company?.description || "Full-service digital solutions for businesses ready to build, scale, and lead."}
            </p>
            <Link
              href="/services"
              className="inline-flex items-center space-x-3 text-sm tracking-widest uppercase border border-primary/50 text-primary px-8 py-4 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              data-testid="link-explore-services"
            >
              <span>Explore Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-sm tracking-widest uppercase text-primary mb-4">What We Do</div>
              <h2 className="font-serif text-4xl md:text-5xl">Our Services</h2>
            </div>
            <Link href="/services" className="text-primary mt-6 md:mt-0 flex items-center space-x-2 group hover:opacity-80 transition-opacity">
              <span className="text-sm uppercase tracking-widest">All Services</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {topServices.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.8 }}
                className="group border-t border-l border-border/50 p-10 hover:bg-secondary/20 transition-colors"
                data-testid={`card-service-${service.id}`}
              >
                <Link href={`/services/${service.id}`} className="block h-full">
                  <div className="text-xs font-mono text-muted-foreground/50 mb-6">0{i + 1}</div>
                  <h3 className="font-serif text-2xl mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Work */}
      <section className="py-32 bg-secondary/20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <div className="text-sm tracking-widest uppercase text-primary mb-4">Portfolio</div>
              <h2 className="font-serif text-4xl md:text-5xl">Selected Work</h2>
            </div>
            <Link href="/projects" className="text-primary mt-6 md:mt-0 flex items-center space-x-2 group hover:opacity-80 transition-opacity">
              <span className="text-sm uppercase tracking-widest">View All Projects</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-24">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
                data-testid={`card-project-${project.id}`}
              >
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Link href={`/projects/${project.id}`} className="block overflow-hidden relative group aspect-[4/3] bg-muted">
                    <img
                      src={project.coverImageUrl || '/images/proj-sw-1.png'}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>
                </div>
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="text-sm tracking-widest uppercase text-primary mb-4">{project.category}</div>
                  <h3 className="font-serif text-3xl md:text-4xl mb-6">{project.title}</h3>
                  <p className="text-muted-foreground mb-8 text-lg">{project.description}</p>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center space-x-2 text-sm uppercase tracking-widest border-b border-foreground/30 pb-1 hover:border-primary hover:text-primary transition-colors"
                  >
                    <span>View Project</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies CTA Strip */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-24 border-t border-border/50"
      >
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="text-sm tracking-widest uppercase text-primary mb-3">Proven Results</div>
            <h2 className="font-serif text-3xl md:text-4xl">See the outcomes we deliver</h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center space-x-3 text-sm tracking-widest uppercase border border-border/50 px-8 py-4 hover:border-primary hover:text-primary transition-all duration-300 flex-shrink-0"
            data-testid="link-case-studies"
          >
            <span>Read Case Studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>
    </div>
  );
}
