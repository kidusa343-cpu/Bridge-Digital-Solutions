import { motion } from "framer-motion";
import { useGetCompany, useListServices } from "@/lib/api-hooks";
import { Skeleton } from "@/components/ui/skeleton";

export default function About() {
  const { data: company, isLoading } = useGetCompany();
  const { data: services } = useListServices();

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-24"
        >
          <div className="text-sm tracking-widest uppercase text-primary mb-6">Who We Are</div>
          {isLoading ? (
            <>
              <Skeleton className="h-20 w-3/4 mb-8" />
              <Skeleton className="h-40 w-full" />
            </>
          ) : (
            <>
              <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-10">
                {company?.name ?? "Bridge Digital Solutions"}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                {company?.description}
              </p>
            </>
          )}
        </motion.div>

        {/* Mission & Vision */}
        {!isLoading && (company?.missionStatement || company?.visionStatement) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border/30 mb-24">
            {company?.missionStatement && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-background p-12"
              >
                <div className="text-xs tracking-widest uppercase text-primary mb-6">Mission</div>
                <p className="font-serif text-2xl leading-relaxed">{company.missionStatement}</p>
              </motion.div>
            )}
            {company?.visionStatement && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="bg-background p-12"
              >
                <div className="text-xs tracking-widest uppercase text-primary mb-6">Vision</div>
                <p className="font-serif text-2xl leading-relaxed">{company.visionStatement}</p>
              </motion.div>
            )}
          </div>
        )}

        {/* Stats */}
        {!isLoading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border/30 mb-24">
            {company?.foundedYear && (
              <div className="bg-background p-8">
                <div className="font-serif text-4xl mb-2">{company.foundedYear}</div>
                <div className="text-sm text-muted-foreground">Founded</div>
              </div>
            )}
            {company?.teamSize && (
              <div className="bg-background p-8">
                <div className="font-serif text-4xl mb-2">{company.teamSize}</div>
                <div className="text-sm text-muted-foreground">Team Members</div>
              </div>
            )}
            {company?.city && (
              <div className="bg-background p-8">
                <div className="font-serif text-2xl mb-2">{company.city}</div>
                <div className="text-sm text-muted-foreground">Headquartered</div>
              </div>
            )}
            <div className="bg-background p-8">
              <div className="font-serif text-4xl mb-2">4</div>
              <div className="text-sm text-muted-foreground">Core Services</div>
            </div>
          </div>
        )}

        {/* Services overview */}
        {services && services.filter(s => s.active).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-sm tracking-widest uppercase text-primary mb-10">What We Deliver</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {services.filter(s => s.active).map((service, i) => (
                <div key={service.id} className="border-t border-border/50 py-8 pr-8">
                  <div className="text-xs font-mono text-muted-foreground/50 mb-4">0{i + 1}</div>
                  <h3 className="font-serif text-xl mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Contact details block */}
        {!isLoading && (company?.email || company?.phone) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-border/50 pt-16 mt-16"
          >
            <div className="text-sm tracking-widest uppercase text-primary mb-8">Get in Touch</div>
            <div className="flex flex-col md:flex-row gap-12">
              {company?.email && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Email</div>
                  <a href={`mailto:${company.email}`} className="font-serif text-2xl hover:text-primary transition-colors">
                    {company.email}
                  </a>
                </div>
              )}
              {company?.phone && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Phone</div>
                  <a href={`tel:${company.phone}`} className="font-serif text-2xl hover:text-primary transition-colors">
                    {company.phone}
                  </a>
                </div>
              )}
              {company?.city && (
                <div>
                  <div className="text-xs text-muted-foreground mb-2">Location</div>
                  <span className="font-serif text-2xl">
                    {company.city}{company.country ? `, ${company.country}` : ""}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
