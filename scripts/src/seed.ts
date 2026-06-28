import bcrypt from "bcrypt";
import { db, usersTable, projectsTable, caseStudiesTable, servicesTable, companyTable, settingsTable } from "@workspace/db";

async function seed() {
  console.log("Seeding database...");

  // Company
  const [existingCompany] = await db.select().from(companyTable).limit(1);
  if (!existingCompany) {
    await db.insert(companyTable).values({
      name: "Axiom Studio",
      tagline: "Where vision meets precision.",
      description: "Axiom is an independent strategy and design studio working with ambitious companies at inflection points. We help leadership teams think more clearly, decide more boldly, and communicate more powerfully.",
      email: "studio@axiom.design",
      phone: "+1 (212) 555-0174",
      address: "151 West 26th Street, Floor 4",
      city: "New York",
      country: "USA",
      foundedYear: 2016,
      teamSize: "8–12",
      linkedinUrl: "https://linkedin.com/company/axiomstudio",
      twitterUrl: "https://twitter.com/axiomstudio",
      instagramUrl: "https://instagram.com/axiomstudio",
      missionStatement: "To bring clarity to complexity — turning the most ambitious ideas into tangible realities through rigorous thinking and elegant execution.",
      visionStatement: "A world where the best ideas aren't held back by poor strategy or mediocre design.",
    });
    console.log("Company created");
  }

  // Admin user
  const [existingUser] = await db.select().from(usersTable).limit(1);
  if (!existingUser) {
    const passwordHash = await bcrypt.hash("admin123", 10);
    await db.insert(usersTable).values({
      email: "admin@axiom.design",
      name: "Studio Admin",
      passwordHash,
      role: "superadmin",
    });
    console.log("Admin user created: admin@axiom.design / admin123");
  }

  // Services
  const existingServices = await db.select().from(servicesTable);
  if (existingServices.length === 0) {
    await db.insert(servicesTable).values([
      {
        title: "Brand Strategy",
        slug: "brand-strategy",
        description: "Positioning, narrative architecture, and competitive differentiation for companies ready to own their category.",
        content: "We build brand strategies that endure. Starting with deep market and audience research, we define the strategic platform from which all brand expression flows — positioning, personality, voice, and value proposition. The result is a coherent system that gives your team the clarity to act consistently and your audience a reason to care.",
        iconName: "Target",
        features: JSON.stringify(["Positioning & differentiation", "Brand narrative architecture", "Audience research & segmentation", "Competitive landscape analysis", "Brand guidelines"]),
        sortOrder: 1,
        active: true,
      },
      {
        title: "Experience Design",
        slug: "experience-design",
        description: "Digital products and interfaces that feel effortless — because every interaction was considered.",
        content: "We design experiences that respect the intelligence of your users. From product strategy through interaction design, we craft digital interfaces that are intuitive, beautiful, and purposefully crafted for the humans who will use them every day.",
        iconName: "Layers",
        features: JSON.stringify(["Product strategy", "UX research & usability testing", "Interface design (web & mobile)", "Design systems", "Prototyping & validation"]),
        sortOrder: 2,
        active: true,
      },
      {
        title: "Communication Design",
        slug: "communication-design",
        description: "Visual systems, editorial design, and brand expression that make complex ideas beautiful and simple.",
        content: "Great communication design isn't decoration — it's translation. We turn dense strategy, complex data, and ambitious ideas into visual systems that communicate with force and clarity.",
        iconName: "Pen",
        features: JSON.stringify(["Visual identity systems", "Editorial & publication design", "Motion & animation", "Pitch and presentation design", "Environmental graphics"]),
        sortOrder: 3,
        active: true,
      },
      {
        title: "Leadership Alignment",
        slug: "leadership-alignment",
        description: "Facilitated strategy sessions and workshops that create organizational clarity and momentum.",
        content: "The most dangerous thing in a company is a leadership team that isn't aligned. We facilitate high-stakes conversations, strategy sessions, and workshops that surface disagreements, build consensus, and produce decisions that stick.",
        iconName: "Users",
        features: JSON.stringify(["Strategic offsite facilitation", "Leadership workshop design", "Stakeholder alignment", "Decision frameworks", "Vision & roadmap development"]),
        sortOrder: 4,
        active: true,
      },
    ]);
    console.log("Services created");
  }

  // Projects
  const existingProjects = await db.select().from(projectsTable);
  if (existingProjects.length === 0) {
    await db.insert(projectsTable).values([
      {
        title: "Meridian Capital Rebrand",
        slug: "meridian-capital-rebrand",
        description: "A full brand repositioning for a $4B private equity firm entering the impact investing space.",
        content: "Meridian Capital came to us at an inflection point: a 30-year-old firm with a strong track record and an identity that no longer reflected where they were going. Over six months, we rebuilt the brand from the ground up — new positioning, a refined visual identity, and a communications strategy that successfully repositioned them in a crowded space.",
        client: "Meridian Capital Partners",
        year: 2024,
        category: "Brand Strategy",
        tags: JSON.stringify(["Rebrand", "Financial Services", "Brand Strategy"]),
        status: "published",
        featured: true,
        sortOrder: 1,
      },
      {
        title: "Vela Health Platform",
        slug: "vela-health-platform",
        description: "End-to-end product design for a Series B health-tech platform serving 200K+ patients.",
        content: "Vela's clinical team had built something medically rigorous. But the patient experience felt cold and clinical. We redesigned the entire platform — from onboarding through care management — creating an experience that felt human without sacrificing the precision their clinical team required.",
        client: "Vela Health",
        year: 2024,
        category: "Experience Design",
        tags: JSON.stringify(["Product Design", "Health Tech", "UX Research"]),
        status: "published",
        featured: true,
        sortOrder: 2,
      },
      {
        title: "Forma Architecture Identity",
        slug: "forma-architecture-identity",
        description: "Visual identity and communications system for an architecture firm with a global portfolio.",
        content: "Forma's work speaks for itself. Our job was to create an identity system worthy of it — rigorous, restrained, and built to flex across every surface from construction documents to gallery invitations.",
        client: "Forma Architecture",
        year: 2023,
        category: "Communication Design",
        tags: JSON.stringify(["Identity", "Architecture", "Print"]),
        status: "published",
        featured: true,
        sortOrder: 3,
      },
      {
        title: "Parallax Ventures Launch",
        slug: "parallax-ventures-launch",
        description: "Brand strategy and launch identity for a new early-stage venture fund.",
        content: "Launching a new venture fund into an overcrowded market required a distinctive point of view. We helped Parallax articulate what makes them genuinely different — and built a brand identity that signals it immediately.",
        client: "Parallax Ventures",
        year: 2023,
        category: "Brand Strategy",
        tags: JSON.stringify(["Launch", "Venture Capital", "Brand Strategy"]),
        status: "published",
        featured: false,
        sortOrder: 4,
      },
    ]);
    console.log("Projects created");
  }

  // Case Studies
  const existingCS = await db.select().from(caseStudiesTable);
  if (existingCS.length === 0) {
    await db.insert(caseStudiesTable).values([
      {
        title: "Repositioning Meridian for Impact",
        slug: "repositioning-meridian-for-impact",
        summary: "How we helped a legacy private equity firm enter the impact investing market without losing the credibility they'd spent 30 years building.",
        challenge: "Meridian Capital had three decades of traditional private equity performance behind them. Their new leadership team had a clear conviction that impact investing was the future. The challenge: how do you signal genuine transformation without triggering skepticism from your existing LP base — and how do you enter a space where authenticity is everything?",
        solution: "We spent the first month listening. Stakeholder interviews across the firm, conversations with current and prospective LPs, and competitive analysis of how other firms had navigated similar repositioning efforts. What emerged was a nuanced positioning strategy: not 'we've changed,' but 'we've always believed this — here's the proof.' We rebuilt the brand narrative around Meridian's actual investment history, reframing past decisions through an impact lens and developing a forward-looking portfolio thesis that was both aspirational and credible.",
        outcome: "Within six months of the rebrand launch, Meridian closed their first dedicated impact fund at $340M — 13% above target. Three new institutional LPs cited the brand and communications work as a factor in their decision to invest. The founding team credited the strategy process with creating internal alignment that had previously been elusive.",
        client: "Meridian Capital Partners",
        industry: "Financial Services",
        duration: "6 months",
        tags: JSON.stringify(["Brand Strategy", "Repositioning", "Financial Services"]),
        metrics: JSON.stringify([
          { label: "Fund size vs. target", value: "+13%" },
          { label: "New institutional LPs", value: "3" },
          { label: "Internal alignment score", value: "↑ 40%" }
        ]),
        featured: true,
        sortOrder: 1,
      },
      {
        title: "Designing for Clinical Precision and Human Warmth",
        slug: "designing-for-clinical-precision-and-human-warmth",
        summary: "Redesigning a health-tech platform to be as humane as it is rigorous — and proving the two aren't mutually exclusive.",
        challenge: "Vela Health's platform was clinically excellent but emotionally cold. Patient activation rates were 40% below industry benchmarks, and qualitative feedback consistently cited the experience as 'intimidating' and 'confusing.' The clinical team was understandably protective of anything that might compromise precision.",
        solution: "We started with an immersive research phase — observational sessions with patients across three care sites, interviews with clinicians, and a systematic audit of every touchpoint in the patient journey. The insight that drove everything: patients didn't need the platform to be simpler, they needed it to respect their intelligence while making them feel supported. We redesigned the information architecture, rewrote every piece of microcopy, and built a design system that allowed warmth and clinical rigor to coexist.",
        outcome: "Patient activation rates increased 67% within 90 days of launch. Average session duration increased 34%, indicating deeper engagement with care content. NPS jumped from 28 to 71. The clinical team, initially skeptical, became the internal champions of the design system.",
        client: "Vela Health",
        industry: "Health Technology",
        duration: "4 months",
        tags: JSON.stringify(["Product Design", "Health Tech", "Design Systems"]),
        metrics: JSON.stringify([
          { label: "Patient activation rate", value: "+67%" },
          { label: "Net Promoter Score", value: "28 → 71" },
          { label: "Session duration", value: "+34%" }
        ]),
        featured: true,
        sortOrder: 2,
      },
    ]);
    console.log("Case studies created");
  }

  // Settings
  const existingSettings = await db.select().from(settingsTable);
  if (existingSettings.length === 0) {
    await db.insert(settingsTable).values([
      { key: "site_maintenance", value: "false", description: "Put the site in maintenance mode" },
      { key: "contact_form_enabled", value: "true", description: "Enable/disable the contact form" },
      { key: "analytics_id", value: "", description: "Google Analytics measurement ID" },
      { key: "og_image_url", value: "", description: "Default Open Graph image for social sharing" },
    ]);
    console.log("Settings created");
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
