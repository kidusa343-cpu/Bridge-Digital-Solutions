import { Link } from "wouter";
import { useGetCompany } from "@/lib/api-hooks";

export default function Footer() {
  const { data: company } = useGetCompany();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/30 pt-24 pb-12 mt-auto">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl mb-4">{company?.name || "Studio"}</h2>
            <p className="text-muted-foreground max-w-sm">
              {company?.tagline || "Elevating brands through meticulous craft and quiet confidence."}
            </p>
          </div>
          <div>
            <h3 className="text-sm tracking-widest uppercase text-foreground mb-6">Navigation</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Work</Link></li>
              <li><Link href="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm tracking-widest uppercase text-foreground mb-6">Contact</h3>
            <ul className="space-y-4 text-muted-foreground">
              {company?.email && (
                <li><a href={`mailto:${company.email}`} className="hover:text-primary transition-colors">{company.email}</a></li>
              )}
              {company?.phone && (
                <li><a href={`tel:${company.phone}`} className="hover:text-primary transition-colors">{company.phone}</a></li>
              )}
              {company?.address && (
                <li>
                  {company.address}<br />
                  {company.city}{company.country ? `, ${company.country}` : ''}
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {currentYear} {company?.name || "Studio"}. All rights reserved.</p>
         
        </div>
      </div>
    </footer>
  );
}
