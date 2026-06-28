import { motion } from "framer-motion";
import { useGetCompany } from "@/lib/api-hooks";
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Contact() {
  const { data: company, isLoading } = useGetCompany();

  return (
    <div className="w-full pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-24"
        >
          <div className="text-sm tracking-widest uppercase text-primary mb-6">Contact</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight mb-8">Let's Talk</h1>
          <p className="text-xl text-muted-foreground font-light">
            We're selective about the projects we take on. If you think we'd be a good fit, we'd love to hear about what you're building.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {isLoading ? (
            <div className="space-y-8">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-12"
            >
              {company?.email && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Email</div>
                  <a
                    href={`mailto:${company.email}`}
                    data-testid="link-contact-email"
                    className="font-serif text-2xl md:text-3xl hover:text-primary transition-colors inline-flex items-center space-x-3 group"
                  >
                    <Mail className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>{company.email}</span>
                  </a>
                </div>
              )}
              {company?.phone && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Phone</div>
                  <a
                    href={`tel:${company.phone}`}
                    data-testid="link-contact-phone"
                    className="font-serif text-2xl md:text-3xl hover:text-primary transition-colors inline-flex items-center space-x-3 group"
                  >
                    <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>{company.phone}</span>
                  </a>
                </div>
              )}
              {(company?.address || company?.city) && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-3">Location</div>
                  <div className="font-serif text-xl md:text-2xl inline-flex items-start space-x-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                    <div>
                      {company?.address && <div>{company.address}</div>}
                      {company?.city && <div>{company.city}{company?.country ? `, ${company.country}` : ""}</div>}
                    </div>
                  </div>
                </div>
              )}

              {(company?.linkedinUrl || company?.twitterUrl || company?.instagramUrl) && (
                <div>
                  <div className="text-xs tracking-widest uppercase text-muted-foreground mb-4">Follow Along</div>
                  <div className="flex space-x-6">
                    {company?.linkedinUrl && (
                      <a href={company.linkedinUrl} target="_blank" rel="noopener noreferrer" data-testid="link-linkedin" className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {company?.twitterUrl && (
                      <a href={company.twitterUrl} target="_blank" rel="noopener noreferrer" data-testid="link-twitter" className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {company?.instagramUrl && (
                      <a href={company.instagramUrl} target="_blank" rel="noopener noreferrer" data-testid="link-instagram" className="text-muted-foreground hover:text-primary transition-colors">
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border-t border-border/50 pt-12 lg:border-t-0 lg:pt-0 lg:border-l lg:pl-24"
          >
            <h2 className="font-serif text-2xl mb-6">How We Work</h2>
            <div className="space-y-8">
              {[
                { step: "01", title: "Initial Conversation", desc: "We start with a discovery call to understand your situation, goals, and whether we're the right fit." },
                { step: "02", title: "Proposal", desc: "If there's alignment, we put together a tailored scope, timeline, and investment." },
                { step: "03", title: "Deep Engagement", desc: "We work closely with your team — no passing off to juniors, no templated output." },
                { step: "04", title: "Delivery & Beyond", desc: "We deliver work that lasts, and remain available for questions after the engagement ends." },
              ].map(item => (
                <div key={item.step} className="flex space-x-6">
                  <div className="text-sm font-mono text-muted-foreground/50 w-8 flex-shrink-0 pt-0.5">{item.step}</div>
                  <div>
                    <div className="font-medium mb-1">{item.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
